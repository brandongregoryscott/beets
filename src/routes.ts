import { LibraryPage } from "components/pages/library-page";
import { LoginPage } from "components/pages/login-page";
import { RegisterPage } from "components/pages/register-page";
import { WorkstationPage } from "components/pages/workstation-page";
import { RouteConfig } from "react-router-config";
import { Sitemap } from "sitemap";

const Routes: RouteConfig[] = [
    {
        component: WorkstationPage,
        exact: true,
        name: "Workstation",
        path: Sitemap.home,
    },
    {
        component: LibraryPage,
        exact: true,
        name: "Library",
        path: Sitemap.library,
    },
    {
        component: LoginPage,
        exact: true,
        name: "Login",
        path: Sitemap.login,
    },
    {
        component: RegisterPage,
        exact: true,
        name: "Register",
        path: Sitemap.register,
    },
];

export { Routes };
