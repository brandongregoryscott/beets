import { Alert, Button, majorScale, Pane, TextInputField } from "evergreen-ui";
import _ from "lodash";
import { useInput } from "rooks";
import { useBoolean } from "utils/hooks/use-boolean";
import { useSignup } from "utils/hooks/use-signup";

interface RegisterPageProps {}

const ERROR_FIELD_IS_REQUIRED = "This field is required.";

const RegisterPage: React.FC<RegisterPageProps> = (
    props: RegisterPageProps
) => {
    const { value: email, onChange: handleEmailChange } = useInput("");
    const { value: password, onChange: handlePasswordChange } = useInput("");
    const { value: emailIsInvalid, setValue: setEmailIsInvalid } =
        useBoolean(false);
    const { value: passwordIsInvalid, setValue: setPasswordIsInvalid } =
        useBoolean(false);
    const { mutate: signUp, isLoading, isSuccess, error } = useSignup();

    const isNilOrEmpty = (value?: string): boolean =>
        _.isNil(value) || _.trim(value).length < 1;

    const validate = () => {
        const emailIsInvalid = isNilOrEmpty(email);
        const passwordIsInvalid = isNilOrEmpty(password);
        const isValid = !emailIsInvalid && !passwordIsInvalid;

        setEmailIsInvalid(emailIsInvalid);
        setPasswordIsInvalid(passwordIsInvalid);

        if (!isValid) {
            return;
        }

        signUp({ email, password });
    };

    return (
        <Pane display="flex" flexDirection="column" maxWidth={majorScale(30)}>
            <TextInputField
                disabled={isLoading}
                label="Email"
                value={email}
                validationMessage={
                    emailIsInvalid ? ERROR_FIELD_IS_REQUIRED : undefined
                }
                onChange={handleEmailChange}
            />
            <TextInputField
                disabled={isLoading}
                label="Password"
                type="password"
                value={password}
                validationMessage={
                    passwordIsInvalid ? ERROR_FIELD_IS_REQUIRED : undefined
                }
                onChange={handlePasswordChange}
            />
            <Button isLoading={isLoading} onClick={validate}>
                Register
            </Button>
            {error != null && (
                <Alert intent="danger" marginTop={majorScale(1)}>
                    {error.message}
                </Alert>
            )}
            {isSuccess && (
                <Alert intent="success" marginTop={majorScale(1)}>
                    Account successfully created. Check your email for a
                    confirmation link to sign in.
                </Alert>
            )}
        </Pane>
    );
};

export { RegisterPage };
