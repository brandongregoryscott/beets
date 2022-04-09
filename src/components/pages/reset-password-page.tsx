import { ChangePasswordForm } from "components/change-password-form";
import { Flex } from "components/flex";
import { ResetPasswordForm } from "components/reset-password-form";
import { EmptyState, ErrorIcon } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { isEmpty } from "lodash";
import { isNotFoundError } from "utils/error-utils";
import { useResetPasswordRoute } from "utils/hooks/use-reset-password-route";
import { useTheme } from "utils/hooks/use-theme";

interface ResetPasswordPageProps extends RouteProps {}

const RECOVERY_TYPE = "recovery";

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (
    props: ResetPasswordPageProps
) => {
    const { intents } = useTheme();
    const { access_token, error_description, clear, type } =
        useResetPasswordRoute();
    const showPasswordChangeForm =
        !isEmpty(access_token) && type === RECOVERY_TYPE;
    const showExpiredToken = isNotFoundError(error_description);
    const showResetPasswordForm = !showPasswordChangeForm && !showExpiredToken;

    return (
        <Flex.Column alignItems="center" justifyContent="center" width="100%">
            {showPasswordChangeForm && <ChangePasswordForm />}
            {showExpiredToken && (
                <Flex.Column alignItems="center">
                    <EmptyState
                        background="dark"
                        description="The token is invalid or has expired. Request a new token to finish resetting your password."
                        icon={<ErrorIcon color={intents.danger.icon} />}
                        iconBgColor={intents.danger.background}
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
