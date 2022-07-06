import { LoginOrRegisterForm } from "components/login-or-register-form";
import { Pane } from "evergreen-ui";
import type { RouteProps } from "interfaces/route-props";

interface LoginPageProps extends RouteProps {}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    return (
        <Pane
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width="100%">
            <LoginOrRegisterForm initialShowRegister={false} />
        </Pane>
    );
};

export { LoginPage };
