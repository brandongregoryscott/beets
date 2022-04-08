import { Flex } from "components/flex";
import { ResetPasswordForm } from "components/reset-password-form";
import { RouteProps } from "interfaces/route-props";

interface ResetPasswordPageProps extends RouteProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (
    props: ResetPasswordPageProps
) => {
    return (
        <Flex.Column alignItems="center" justifyContent="center" width="100%">
            <ResetPasswordForm />
        </Flex.Column>
    );
};

export { ResetPasswordPage };
