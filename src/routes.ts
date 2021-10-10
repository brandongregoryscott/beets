import { ApplicationLayout } from "components/layouts/application-layout";
import { LibraryPage } from "components/pages/library-page";
import { LoginPage } from "components/pages/login-page";
import { LogoutPage } from "components/pages/logout-page";
import { RegisterPage } from "components/pages/register-page";
import { WorkstationPage } from "components/pages/workstation-page";
import { HomeIcon, LogInIcon, LogOutIcon, MusicIcon } from "evergreen-ui";
import { RouteDefinition } from "interfaces/route-definition";
import { Sitemap } from "sitemap";

const LibraryPageRoute: RouteDefinition = {
    component: LibraryPage,
    exact: true,
    icon: MusicIcon,
    name: "Library",
    path: Sitemap.library,
};

const LoginPageRoute: RouteDefinition = {
    component: LoginPage,
    exact: true,
    icon: LogInIcon,
    name: "Login",
    path: Sitemap.login,
};

const LogoutPageRoute: RouteDefinition = {
    component: LogoutPage,
    exact: true,
    icon: LogOutIcon,
    name: "Logout",
    path: Sitemap.logout,
};

const RegisterPageRoute: RouteDefinition = {
    component: RegisterPage,
    exact: true,
    name: "Register",
    path: Sitemap.register,
};

const WorkstationPageRoute: RouteDefinition = {
    component: WorkstationPage,
    exact: true,
    icon: HomeIcon,
    name: "Workstation",
    path: Sitemap.home,
};

const Routes: RouteDefinition[] = [
    {
        component: ApplicationLayout,
        exact: false,
        name: "Layout",
        path: Sitemap.home,
        routes: [
            LibraryPageRoute,
            LoginPageRoute,
            LogoutPageRoute,
            RegisterPageRoute,
            WorkstationPageRoute,
        ],
    },
];

export {
    LibraryPageRoute,
    LoginPageRoute,
    LogoutPageRoute,
    RegisterPageRoute,
    Routes,
    WorkstationPageRoute,
};
