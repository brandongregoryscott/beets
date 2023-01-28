import {
    TextInputField,
    majorScale,
    Button,
    Alert,
    Link,
    Heading,
} from "evergreen-ui";
import { useBoolean } from "hooks/use-boolean";
import { useLogin } from "hooks/supabase/use-login";
import { useRegister } from "hooks/supabase/use-register";
import { Form } from "components/forms/form";
import type { FormEvent, MouseEvent } from "react";
import { useCallback, useMemo } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { Flex } from "components/flex";
import type { SupabaseUser } from "types/supabase-user";
import { UserRecord } from "models/user-record";
import { useCreateOrUpdateUser } from "generated/hooks/domain/users/use-create-or-update-user";
import { useGlobalState } from "hooks/use-global-state";
import { useRouter } from "hooks/use-router";
import { Link as ReactRouterLink } from "react-router-dom";
import { Sitemap } from "sitemap";
import { ErrorAlert } from "components/error-alert";
import { absolutePath } from "utils/route-utils";
import { useInput } from "hooks/use-input";

interface LoginOrRegisterFormProps {
    initialShowRegister: boolean;
}

const marginBottom = majorScale(3);

const LoginOrRegisterForm: React.FC<LoginOrRegisterFormProps> = (
    props: LoginOrRegisterFormProps
) => {
    const { initialShowRegister } = props;
    const { setGlobalState } = useGlobalState();
    const { navigate } = useRouter();
    const { value: showRegister, toggle: toggleShowRegister } =
        useBoolean(initialShowRegister);
    const {
        value: email,
        onChange: handleEmailChange,
        validation: emailValidation,
    } = useInput({
        isRequired: true,
    });
    const {
        value: password,
        onChange: handlePasswordChange,
        validation: passwordValidation,
    } = useInput({
        isRequired: true,
    });
    const { mutate: createOrUpdateUser } = useCreateOrUpdateUser({
        onConflict: "id",
    });
    const {
        mutate: register,
        reset: resetRegister,
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        error: registerError,
    } = useRegister();
    const {
        mutate: login,
        reset: resetLogin,
        isLoading: isLoginLoading,
        error: loginError,
    } = useLogin({
        onSuccess: (supabaseUser: SupabaseUser) => {
            const user = UserRecord.fromSupabaseUser(supabaseUser);
            createOrUpdateUser(user);
            setGlobalState((prev) => prev.setUser(supabaseUser));
            navigate(Sitemap.root.root);
        },
    });

    const error = loginError ?? registerError;

    const renderError =
        (showRegister && registerError != null) ||
        (!showRegister && loginError != null);
    const buttonText = showRegister ? "Register" : "Login";
    const toggleLinkText = showRegister
        ? "Already have an account? Login here"
        : "Need an account? Register here";

    const validate = useCallback((): boolean => {
        const emailIsInvalid = isNilOrEmpty(email);
        const passwordIsInvalid = isNilOrEmpty(password);
        const isValid = !emailIsInvalid && !passwordIsInvalid;
        return isValid;
    }, [email, password]);

    const handleLogin = useCallback(
        (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            if (!validate()) {
                return;
            }

            login({ email: email!, password: password! });
        },
        [email, login, password, validate]
    );

    const handleRegister = useCallback(
        (event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();

            if (!validate()) {
                return;
            }

            register({ email: email!, password: password! });
        },
        [email, password, register, validate]
    );

    const handleSubmit = useMemo(
        () => (showRegister ? handleRegister : handleLogin),
        [handleLogin, handleRegister, showRegister]
    );

    const toggleAndReset = useCallback(() => {
        toggleShowRegister();
        resetLogin();
        resetRegister();
    }, [resetLogin, resetRegister, toggleShowRegister]);

    return (
        <Flex.Column alignItems="center" maxWidth={majorScale(60)}>
            <Heading marginBottom={majorScale(2)} size={800}>
                {showRegister ? "Register" : "Login"}
            </Heading>
            <Form
                display="flex"
                flexDirection="column"
                onSubmit={handleSubmit}
                width={majorScale(30)}>
                <TextInputField
                    {...emailValidation}
                    disabled={showRegister ? isRegisterLoading : isLoginLoading}
                    label="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                <TextInputField
                    {...passwordValidation}
                    disabled={showRegister ? isRegisterLoading : isLoginLoading}
                    label="Password"
                    onChange={handlePasswordChange}
                    type="password"
                    value={password}
                />
                <Button
                    appearance="primary"
                    isLoading={
                        showRegister ? isRegisterLoading : isLoginLoading
                    }
                    marginBottom={marginBottom}
                    onClick={handleSubmit}>
                    {buttonText}
                </Button>
                <Link marginBottom={marginBottom} onClick={toggleAndReset}>
                    {toggleLinkText}
                </Link>
                <Link
                    is={ReactRouterLink}
                    marginBottom={marginBottom}
                    to={absolutePath(Sitemap.resetPassword)}>
                    Forgot your password?
                </Link>
            </Form>
            {renderError && <ErrorAlert error={error} />}
            {isRegisterSuccess && showRegister && (
                <Alert intent="success" title="Account successfully created.">
                    Check your email for a confirmation link to sign in.
                </Alert>
            )}
        </Flex.Column>
    );
};

export { LoginOrRegisterForm };
