import { ErrorMessages } from "constants/error-messages";
import {
    Pane,
    TextInputField,
    majorScale,
    Button,
    Alert,
    Link,
} from "evergreen-ui";
import _ from "lodash";
import { useInput } from "rooks";
import { useBoolean } from "utils/hooks/use-boolean";
import { useLogin } from "utils/hooks/use-login";
import { useRegister } from "utils/hooks/use-register";

interface LoginOrRegisterProps {
    initialShowRegister: boolean;
}

const marginBottom = majorScale(3);

const LoginOrRegister: React.FC<LoginOrRegisterProps> = (
    props: LoginOrRegisterProps
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
        isLoading: isRegisterLoading,
        isSuccess: isRegisterSuccess,
        error: registerError,
    } = useRegister();
    const {
        mutate: login,
        isLoading: isLoginLoading,
        isSuccess: isLoginSuccess,
        error: loginError,
    } = useLogin();

    const error = loginError ?? registerError;

    const buttonText = showRegister ? "Register" : "Login";
    const toggleLinkText = showRegister
        ? "Already have an account? Login here"
        : "Need an account? Register here";

    const isNilOrEmpty = (value?: string): boolean =>
        _.isNil(value) || _.trim(value).length < 1;

    const validate = (): boolean => {
        const emailIsInvalid = isNilOrEmpty(email);
        const passwordIsInvalid = isNilOrEmpty(password);
        const isValid = !emailIsInvalid && !passwordIsInvalid;

        setEmailIsInvalid(emailIsInvalid);
        setPasswordIsInvalid(passwordIsInvalid);

        return isValid;
    };

    const handleLogin = () => {
        if (!validate()) {
            return;
        }

        login({ email, password });
    };

    const handleRegister = () => {
        if (!validate()) {
            return;
        }

        register({ email, password });
    };

    const handleSubmit = showRegister ? handleRegister : handleLogin;

    return (
        <Pane display="flex" flexDirection="column" maxWidth={majorScale(30)}>
            <TextInputField
                disabled={showRegister ? isRegisterLoading : isLoginLoading}
                label="Email"
                value={email}
                validationMessage={
                    emailIsInvalid ? ErrorMessages.REQUIRED_FIELD : undefined
                }
                onChange={handleEmailChange}
            />
            <TextInputField
                disabled={showRegister ? isRegisterLoading : isLoginLoading}
                label="Password"
                type="password"
                value={password}
                validationMessage={
                    passwordIsInvalid ? ErrorMessages.REQUIRED_FIELD : undefined
                }
                onChange={handlePasswordChange}
            />
            <Button
                isLoading={showRegister ? isRegisterLoading : isLoginLoading}
                marginBottom={marginBottom}
                onClick={handleSubmit}>
                {buttonText}
            </Button>
            <Link marginBottom={marginBottom} onClick={toggleShowRegister}>
                {toggleLinkText}
            </Link>
            {error != null && <Alert intent="danger">{error.message}</Alert>}
            {isLoginSuccess && (
                <Alert intent="success">Login successful!</Alert>
            )}
            {isRegisterSuccess && (
                <Alert intent="success">
                    Account successfully created. Check your email for a
                    confirmation link to sign in.
                </Alert>
            )}
        </Pane>
    );
};

export { LoginOrRegister };
