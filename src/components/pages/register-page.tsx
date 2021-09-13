import { LoginOrRegister } from "components/login-or-register";

interface RegisterPageProps {}

const RegisterPage: React.FC<RegisterPageProps> = (
    props: RegisterPageProps
) => {
    return <LoginOrRegister initialShowRegister={true} />;
};

export { RegisterPage };
