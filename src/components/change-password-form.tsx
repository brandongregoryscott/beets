import { ErrorAlert } from "components/error-alert";
import { Flex } from "components/flex";
import { Form } from "components/forms/form";
import { ErrorMessages } from "constants/error-messages";
import {
    Button,
    Heading,
    majorScale,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { isEmpty } from "lodash";
import { ChangeEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { Sitemap } from "sitemap";
import { useChangePassword } from "utils/hooks/supabase/use-change-password";
import { useInput } from "utils/hooks/use-input";
import { ResetPasswordQueryParams } from "utils/hooks/use-reset-password-route";

interface ChangePasswordFormProps
    extends Pick<ResetPasswordQueryParams, "access_token"> {}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (
    props: ChangePasswordFormProps
) => {
    const { access_token } = props;
    const navigate = useNavigate();
    const {
        value: password,
        onChange: onPasswordChange,
        validation: passwordValidation,
    } = useInput({ isRequired: true });

    const {
        value: passwordConfirmation,
        onChange: onPasswordConfirmationChange,
        setValidation: setPasswordConfirmationValidation,
        validation: passwordConfirmationValidation,
    } = useInput({ isRequired: true });

    const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleChangePasswordSuccess = useCallback(() => {
        toaster.success("Password successfully updated!");
        navigate(Sitemap.home);
    }, [navigate]);

    const {
        isLoading,
        error,
        mutate: changePassword,
    } = useChangePassword({
        onSuccess: handleChangePasswordSuccess,
    });

    const updateValidation = useCallback(
        (password?: string, passwordConfirmation?: string) => {
            const passwordsAreEmpty =
                isEmpty(password) || isEmpty(passwordConfirmation);
            const passwordsMatch = password === passwordConfirmation;

            if (validationTimeoutRef.current != null) {
                clearTimeout(validationTimeoutRef.current);
            }

            if (passwordsAreEmpty || passwordsMatch) {
                return;
            }

            validationTimeoutRef.current = setTimeout(() => {
                setPasswordConfirmationValidation({
                    isInvalid: true,
                    validationMessage: ErrorMessages.PASSWORDS_DO_NOT_MATCH,
                });
            }, 300);
        },
        [setPasswordConfirmationValidation]
    );

    const handlePasswordChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value: password } = event.target;
            onPasswordChange(event);
            updateValidation(password, passwordConfirmation);
        },
        [onPasswordChange, passwordConfirmation, updateValidation]
    );

    const handlePasswordConfirmationChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { value: passwordConfirmation } = event.target;
            onPasswordConfirmationChange(event);
            updateValidation(password, passwordConfirmation);
        },
        [onPasswordConfirmationChange, password, updateValidation]
    );

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();

            const isInvalid =
                isEmpty(password) ||
                isEmpty(passwordConfirmation) ||
                password !== passwordConfirmation;

            if (isInvalid) {
                return;
            }

            changePassword({ access_token, password });
        },
        [access_token, changePassword, password, passwordConfirmation]
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
                        passwordValidation?.isInvalid === true ||
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
