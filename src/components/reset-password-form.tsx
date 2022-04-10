import { ErrorAlert } from "components/error-alert";
import { Flex } from "components/flex";
import { Form } from "components/forms/form";
import {
    Alert,
    Button,
    Heading,
    majorScale,
    TextInputField,
} from "evergreen-ui";
import { isEmpty } from "lodash";
import { useCallback } from "react";
import { isNotFoundError } from "utils/error-utils";
import { useRequestPasswordReset } from "utils/hooks/supabase/use-request-password-reset";
import { useInput } from "utils/hooks/use-input";

interface ResetPasswordFormProps {}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (
    props: ResetPasswordFormProps
) => {
    const {
        value: email,
        onChange: handleEmailChange,
        ...emailValidation
    } = useInput({ isRequired: true });
    const {
        isLoading,
        isSuccess,
        error,
        mutate: requestPasswordReset,
    } = useRequestPasswordReset();

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();

            if (isEmpty(email)) {
                return;
            }

            requestPasswordReset(email!);
        },
        [email, requestPasswordReset]
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

export { ResetPasswordForm };
