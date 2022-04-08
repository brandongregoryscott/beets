import { ErrorMessages } from "constants/error-messages";
import {
    TextInputField,
    majorScale,
    Button,
    Alert,
    Link,
    Heading,
} from "evergreen-ui";
import _ from "lodash";
import { useInput } from "rooks";
import { useBoolean } from "utils/hooks/use-boolean";
import { useLogin } from "utils/hooks/supabase/use-login";
import { useRegister } from "utils/hooks/supabase/use-register";
import { Form } from "components/forms/form";
import { useCallback, useMemo } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { Flex } from "components/flex";

interface LoginOrRegisterFormProps {
    initialShowRegister: boolean;
}

const marginBottom = majorScale(3);

const LoginOrRegisterForm: React.FC<LoginOrRegisterFormProps> = (
    props: LoginOrRegisterFormProps
) => {
    const { initialShowRegister } = props;
    const { value: showRegister, toggle: toggleShowRegister } =
        useBoolean(initialShowRegister);
    const { value: email, onChange: handleEmailChange } = useInput("");
    const { value: password, onChange: handlePasswordChange } = useInput("");
    const { value: emailIsInvalid, setValue: setEmailIsInvalid } =
        useBoolean(false);
    const { value: passwordIsInvalid, setValue: setPasswordIsInvalid } =
        useBoolean(false);
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
    } = useLogin();

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

        setEmailIsInvalid(emailIsInvalid);
        setPasswordIsInvalid(passwordIsInvalid);

        return isValid;
    }, [email, password, setEmailIsInvalid, setPasswordIsInvalid]);

    const handleLogin = useCallback(() => {
        if (!validate()) {
            return;
        }

        login({ email, password });
    }, [email, login, password, validate]);

    const handleRegister = useCallback(() => {
        if (!validate()) {
            return;
        }

        register({ email, password });
    }, [email, password, register, validate]);

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
                    disabled={showRegister ? isRegisterLoading : isLoginLoading}
                    label="Email"
                    onChange={handleEmailChange}
                    validationMessage={
                        emailIsInvalid
                            ? ErrorMessages.REQUIRED_FIELD
                            : undefined
                    }
                    value={email}
                />
                <TextInputField
                    disabled={showRegister ? isRegisterLoading : isLoginLoading}
                    label="Password"
                    onChange={handlePasswordChange}
                    type="password"
                    validationMessage={
                        passwordIsInvalid
                            ? ErrorMessages.REQUIRED_FIELD
                            : undefined
                    }
                    value={password}
                />
                <Button
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
            </Form>
            {renderError && <Alert intent="danger">{error?.message}</Alert>}
            {isRegisterSuccess && showRegister && (
                <Alert intent="success" title="Account successfully created.">
                    Check your email for a confirmation link to sign in.
                </Alert>
            )}
        </Flex.Column>
    );
};

export { LoginOrRegisterForm };
