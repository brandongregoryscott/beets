import { ChangePasswordForm } from "components/change-password-form";
import { Flex } from "components/flex";
import { ResetPasswordForm } from "components/reset-password-form";
import { ErrorIcon, majorScale } from "evergreen-ui";
import { isEmpty } from "lodash";
import { isUserNotFoundError } from "utils/error-utils";
import { useResetPasswordRoute } from "hooks/use-reset-password-route";
import { useTheme } from "hooks/use-theme";
import { EmptyState } from "components/empty-state";

const RECOVERY_TYPE = "recovery";

const ResetPasswordPage: React.FC = () => {
    const { intents } = useTheme();
    const { access_token, error_description, clear, type } =
        useResetPasswordRoute();
    const showPasswordChangeForm =
        !isEmpty(access_token) && type === RECOVERY_TYPE;
    const showExpiredToken = isUserNotFoundError(error_description);
    const showResetPasswordForm = !showPasswordChangeForm && !showExpiredToken;

    return (
        <Flex.Column alignItems="center" justifyContent="center" width="100%">
            {showPasswordChangeForm && (
                <ChangePasswordForm access_token={access_token} />
            )}
            {showExpiredToken && (
                <Flex.Column alignItems="center" padding={majorScale(4)}>
                    <EmptyState
                        description="The token is invalid or has expired. Request a new token to finish resetting your password."
                        icon={<ErrorIcon />}
                        iconBgColor={intents.danger.background}
                        iconColor={intents.danger.icon}
                        primaryCta={
                            <EmptyState.PrimaryButton onClick={clear}>
                                Reset Password
                            </EmptyState.PrimaryButton>
                        }
                        title="Invalid Token"
                    />
                </Flex.Column>
            )}
            {showResetPasswordForm && <ResetPasswordForm />}
        </Flex.Column>
    );
};

export { ResetPasswordPage };
