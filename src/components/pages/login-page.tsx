import { LoginOrRegisterForm } from "components/login-or-register-form";
import { Pane } from "evergreen-ui";

const LoginPage: React.FC = () => {
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
