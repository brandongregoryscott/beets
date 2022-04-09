import { ErrorAlert } from "components/error-alert";
import { Flex } from "components/flex";
import { Form } from "components/forms/form";
import { ErrorMessages } from "constants/error-messages";
import {
    Alert,
    Button,
    Heading,
    majorScale,
    TextInputField,
} from "evergreen-ui";
import { isEmpty } from "lodash";
import { useCallback } from "react";
import { useResetPassword } from "utils/hooks/supabase/use-reset-password";
import { useInput } from "utils/hooks/use-input";
import { useResetPasswordRoute } from "utils/hooks/use-reset-password-route";

interface ResetPasswordFormProps {}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (
    props: ResetPasswordFormProps
) => {
    const { error_description } = useResetPasswordRoute();

    const {
        value: email,
        onChange: handleEmailChange,
        ...emailValidation
    } = useInput({ isRequired: true });
    const {
        isLoading,
        isSuccess,
        error,
        mutate: resetPassword,
    } = useResetPassword();

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();

            if (isEmpty(email)) {
                return;
            }

            resetPassword(email!);
        },
        [email, resetPassword]
    );

    return (
        <Flex.Column alignItems="center" maxWidth={majorScale(60)}>
            <Heading marginBottom={majorScale(2)} size={800}>
                Reset your password
            </Heading>
            <Form onSubmit={handleSubmit} width={majorScale(30)}>
                <TextInputField
                    {...emailValidation}
                    label="Email"
                    onChange={handleEmailChange}
                    value={email}
                />
                <Button
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    width="100%">
                    Reset Password
                </Button>
            </Form>
            {error != null && !isNotFoundError(error) && (
                <ErrorAlert error={error} />
            )}
            {(isSuccess || isNotFoundError(error)) && (
                <Alert
                    intent="success"
                    marginTop={majorScale(2)}
                    title="Password recovery started">
                    If you have an account registered under this email address,
                    you'll receive a link to reset your password.
                </Alert>
            )}
        </Flex.Column>
    );
};

const isNotFoundError = (error: Error | null) =>
    error != null && error.message === ErrorMessages.USER_NOT_FOUND;

export { ResetPasswordForm };
