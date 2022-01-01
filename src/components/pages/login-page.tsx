import { LoginOrRegister } from "components/login-or-register";
import { majorScale, Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";

interface LoginPageProps extends RouteProps {}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    return (
        <Pane
            alignItems="center"
            display="flex"
            flexDirection="column"
            height={`calc(100% - ${majorScale(12)}px)`}
            justifyContent="center">
            <LoginOrRegister initialShowRegister={false} />
        </Pane>
    );
};

export { LoginPage };
