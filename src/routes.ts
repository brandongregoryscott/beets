import { ApplicationLayout } from "components/layouts/application-layout";
import { WorkstationLayout } from "components/layouts/workstation-layout";
import { LibraryPage } from "components/pages/library-page";
import { LoginPage } from "components/pages/login-page";
import { LogoutPage } from "components/pages/logout-page";
import { RegisterPage } from "components/pages/register-page";
import { WorkstationPage } from "components/pages/workstation-page";
import { HomeIcon, LogInIcon, LogOutIcon, MusicIcon } from "evergreen-ui";
import { Sitemap } from "sitemap";

const Routes = {
    root: {
        component: ApplicationLayout,
        exact: false,
        name: "ApplicationLayout",
        path: Sitemap.home,
        routes: {
            workstation: {
                component: WorkstationLayout,
                exact: false,
                icon: HomeIcon,
                name: "WorkstationLayout",
                path: Sitemap.home,
                routes: {
                    workstation: {
                        component: WorkstationPage,
                        exact: true,
                        name: "Workstation",
                        path: Sitemap.home,
                    },
                },
            },
            library: {
                component: LibraryPage,
                exact: true,
                icon: MusicIcon,
                name: "Library",
                path: Sitemap.library,
            },
            login: {
                component: LoginPage,
                exact: true,
                icon: LogInIcon,
                name: "Login",
                path: Sitemap.login,
            },
            logout: {
                component: LogoutPage,
                exact: true,
                icon: LogOutIcon,
                name: "Logout",
                path: Sitemap.logout,
            },
            register: {
                component: RegisterPage,
                exact: true,
                name: "Register",
                path: Sitemap.register,
            },
        },
    },
};

export { Routes };
