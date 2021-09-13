import { LoginOrRegister } from "components/login-or-register";
import { majorScale, Pane } from "evergreen-ui";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    return (
        <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={`calc(100% - ${majorScale(12)}px)`}>
            <LoginOrRegister initialShowRegister={false} />
        </Pane>
    );
};

export { LoginPage };
