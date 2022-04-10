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
import { ChangeEvent, useCallback } from "react";
import { isNotFoundError } from "utils/error-utils";
import { useInput } from "utils/hooks/use-input";

interface ChangePasswordFormProps {}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (
    props: ChangePasswordFormProps
) => {
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

    const isLoading = false;
    const isSuccess = false;
    const error = null;

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault();
    }, []);

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
        </Flex.Column>
    );
};

export { ChangePasswordForm };
