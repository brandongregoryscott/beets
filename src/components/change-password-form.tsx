import { ErrorAlert } from "components/error-alert";
import { Flex } from "components/flex";
import { Form } from "components/forms/form";
import { ErrorMessages } from "constants/error-messages";
import { Button, Heading, majorScale, TextInputField } from "evergreen-ui";
import { isEmpty } from "lodash";
import { ChangeEvent, useCallback } from "react";
import { useChangePassword } from "utils/hooks/supabase/use-change-password";
import { useInput } from "utils/hooks/use-input";
import { ResetPasswordQueryParams } from "utils/hooks/use-reset-password-route";

interface ChangePasswordFormProps
    extends Pick<ResetPasswordQueryParams, "access_token"> {}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (
    props: ChangePasswordFormProps
) => {
    const { access_token } = props;
    const {
        value: password,
        onChange: handlePasswordChange,
        ...passwordValidation
    } = useInput({ isRequired: true });

    const {
        value: passwordConfirmation,
        onChange: onPasswordConfirmationChange,
        setValidation: setPasswordConfirmationValidation,
        ...passwordConfirmationValidation
    } = useInput({ isRequired: true });

    const { isLoading, error, mutate: changePassword } = useChangePassword();

    const handlePasswordConfirmationChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            onPasswordConfirmationChange(event);
            const passwordsDoNotMatch =
                password != null &&
                password.length < value.length &&
                value !== password;

            if (!passwordsDoNotMatch) {
                return;
            }

            setPasswordConfirmationValidation({
                isInvalid: true,
                validationMessage: ErrorMessages.PASSWORDS_DO_NOT_MATCH,
            });
        },
        [
            onPasswordConfirmationChange,
            password,
            setPasswordConfirmationValidation,
        ]
    );

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();

            const isInvalid =
                isEmpty(password) ||
                isEmpty(passwordConfirmation) ||
                passwordValidation.isInvalid ||
                passwordConfirmationValidation.isInvalid;

            if (isInvalid) {
                return;
            }

            changePassword({ access_token, password });
        },
        [
            access_token,
            changePassword,
            password,
            passwordConfirmation,
            passwordConfirmationValidation.isInvalid,
            passwordValidation.isInvalid,
        ]
    );

    return (
        <Flex.Column alignItems="center" maxWidth={majorScale(60)}>
            <Heading marginBottom={majorScale(2)} size={800}>
                Change your password
            </Heading>
            <Form onSubmit={handleSubmit} width={majorScale(30)}>
                <TextInputField
                    {...passwordValidation}
                    label="Password"
                    onChange={handlePasswordChange}
                    type="password"
                    value={password}
                />
                <TextInputField
                    {...passwordConfirmationValidation}
                    label="Confirm Password"
                    onChange={handlePasswordConfirmationChange}
                    type="password"
                    value={passwordConfirmation}
                />
                <Button
                    disabled={
                        passwordValidation?.isInvalid ||
                        passwordConfirmationValidation.isInvalid
                    }
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    width="100%">
                    Change Password
                </Button>
            </Form>
            {error != null && <ErrorAlert error={error} />}
        </Flex.Column>
    );
};

export { ChangePasswordForm };
