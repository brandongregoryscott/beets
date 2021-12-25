import { LoginOrRegister } from "components/login-or-register";
import { majorScale, Pane } from "evergreen-ui";
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
            height={`calc(100% - ${majorScale(12)}px)`}
            justifyContent="center">
            <LoginOrRegister initialShowRegister={true} />
        </Pane>
    );
};

export { RegisterPage };
