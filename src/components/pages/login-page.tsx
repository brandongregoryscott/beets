import { LoginOrRegister } from "components/login-or-register";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
    return <LoginOrRegister initialShowRegister={false} />;
};

export { LoginPage };
