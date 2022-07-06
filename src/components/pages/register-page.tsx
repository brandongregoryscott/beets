import { LoginOrRegisterForm } from "components/login-or-register-form";
import { Pane } from "evergreen-ui";
import type { RouteProps } from "interfaces/route-props";

interface RegisterPageProps extends RouteProps {}

const RegisterPage: React.FC<RegisterPageProps> = (
    props: RegisterPageProps
) => {
    return (
        <Pane
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width="100%">
            <LoginOrRegisterForm initialShowRegister={true} />
        </Pane>
    );
};

export { RegisterPage };
