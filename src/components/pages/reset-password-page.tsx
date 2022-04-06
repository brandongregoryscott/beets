import { Flex } from "components/flex";
import { ResetPasswordForm } from "components/reset-password-form";
import { Heading, majorScale } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";

interface ResetPasswordPageProps extends RouteProps {}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (
    props: ResetPasswordPageProps
) => {
    return (
        <Flex.Column alignItems="center" justifyContent="center" width="100%">
            <Heading marginBottom={majorScale(2)} size={800}>
                Reset your password
            </Heading>
            <ResetPasswordForm />
        </Flex.Column>
    );
};

export { ResetPasswordPage };
