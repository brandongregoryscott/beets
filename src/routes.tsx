import { FilesPage } from "components/pages/files-page";
import { ApplicationLayout } from "components/layouts/application-layout";
import { WorkstationLayout } from "components/layouts/workstation-layout";
import { LibraryLayout } from "components/layouts/library-layout";
import { LoginPage } from "components/pages/login-page";
import { LogoutPage } from "components/pages/logout-page";
import { RegisterPage } from "components/pages/register-page";
import { WorkstationPage } from "components/pages/workstation-page";
import {
    HelpIcon,
    HomeIcon,
    LogInIcon,
    LogOutIcon,
    MusicIcon,
} from "evergreen-ui";
import { Sitemap } from "sitemap";
import { RouteDefinition } from "interfaces/route-definition";
import { RouteMap as GenericRouteMap } from "interfaces/route-map";
import { InstrumentsPage } from "components/pages/instruments-page";
import { HelpLayout } from "components/layouts/help-layout";
import { HelpResource } from "enums/help-resource";
import { ResetPasswordPage } from "./components/pages/reset-password-page";
import { NotFoundPage } from "components/pages/not-found-page";
import { HelpPage } from "components/pages/help-page";

export interface RouteMap extends GenericRouteMap {
    root: RouteDefinition & {
        children: {
            help: RouteDefinition & {
                children: {
                    contributing: RouteDefinition;
                    howTo: RouteDefinition;
                    overview: RouteDefinition;
                };
            };
            library: RouteDefinition & {
                children: {
                    files: RouteDefinition;
                    instruments: RouteDefinition;
                };
            };
            login: RouteDefinition;
            logout: RouteDefinition;
            register: RouteDefinition;
            workstation: RouteDefinition & {
                children: {
                    workstation: RouteDefinition;
                };
            };
        };
    };
}

const Routes: RouteMap = {
    root: {
        element: <ApplicationLayout />,
        name: "ApplicationLayout",
        path: Sitemap.home,
        children: {
            help: {
                element: <HelpLayout />,
                icon: HelpIcon,
                name: "Help",
                path: Sitemap.help.home,
                redirects: [{ to: Sitemap.help.overview }],
                children: {
                    contributing: {
                        element: (
                            <HelpPage resource={HelpResource.Contributing} />
                        ),
                        name: HelpResource.Contributing,
                        path: Sitemap.help.contributing,
                    },
                    overview: {
                        element: <HelpPage resource={HelpResource.Overview} />,
                        name: HelpResource.Overview,
                        path: Sitemap.help.overview,
                    },
                    howTo: {
                        element: <HelpPage resource={HelpResource.HowTo} />,
                        name: HelpResource.HowTo,
                        path: Sitemap.help.howTo,
                    },
                },
            },
            library: {
                element: <LibraryLayout />,
                icon: MusicIcon,
                name: "Library",
                path: Sitemap.library.home,
                redirects: [
                    {
                        to: Sitemap.library.files,
                    },
                ],
                children: {
                    files: {
                        element: <FilesPage />,
                        name: "Files",
                        path: Sitemap.library.files,
                    },
                    instruments: {
                        element: <InstrumentsPage />,
                        name: "Instruments",
                        path: Sitemap.library.instruments,
                    },
                },
            },
            login: {
                element: <LoginPage />,
                icon: LogInIcon,
                name: "Login",
                path: Sitemap.login,
            },
            logout: {
                element: <LogoutPage />,
                icon: LogOutIcon,
                name: "Logout",
                path: Sitemap.logout,
            },
            register: {
                element: <RegisterPage />,
                name: "Register",
                path: Sitemap.register,
            },
            resetPassword: {
                element: <ResetPasswordPage />,
                name: "Reset Password",
                path: Sitemap.resetPassword,
            },
            workstation: {
                element: <WorkstationLayout />,
                icon: HomeIcon,
                name: "WorkstationLayout",
                path: Sitemap.home,
                children: {
                    workstation: {
                        element: <WorkstationPage />,
                        name: "Workstation",
                        path: Sitemap.home,
                    },
                },
            },
            notFound: {
                element: <NotFoundPage />,
                name: "Not Found",
                path: "*",
            },
        },
    },
};

export { Routes };
