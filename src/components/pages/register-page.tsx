import { LoginOrRegister } from "components/login-or-register";
import { majorScale, Pane } from "evergreen-ui";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (
    props: RegisterPageProps
) => {
    return (
        <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={`calc(100% - ${majorScale(12)}px)`}>
            <LoginOrRegister initialShowRegister={true} />
        </Pane>
    );
};

export { RegisterPage };
