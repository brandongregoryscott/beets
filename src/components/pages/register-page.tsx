import { LoginOrRegister } from "components/login-or-register";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";

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
            <LoginOrRegister initialShowRegister={true} />
        </Pane>
    );
};

export { RegisterPage };
