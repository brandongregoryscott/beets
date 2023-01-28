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
import type { RouteDefinition } from "interfaces/route-definition";
import type { RouteMap as GenericRouteMap } from "interfaces/route-map";
import { InstrumentsPage } from "components/pages/instruments-page";
import { HelpLayout } from "components/layouts/help-layout";
import { HelpResource } from "enums/help-resource";
import { ResetPasswordPage } from "./components/pages/reset-password-page";
import { NotFoundPage } from "components/pages/not-found-page";
import { HelpPage } from "components/pages/help-page";
import { generateHelpPath } from "utils/route-utils";

interface RouteMap extends GenericRouteMap {
    root: RouteDefinition & {
        children: {
            help: RouteDefinition & {
                children: {
                    resource: RouteDefinition;
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
                    newProject: RouteDefinition;
                    project: RouteDefinition;
                };
            };
        };
    };
}

const Routes: RouteMap = {
    root: {
        element: <ApplicationLayout />,
        name: "ApplicationLayout",
        path: Sitemap.root.root,
        children: {
            help: {
                element: <HelpLayout />,
                icon: HelpIcon,
                name: "Help",
                path: Sitemap.help.root,
                redirects: [
                    {
                        to: generateHelpPath(HelpResource.Overview),
                    },
                ],
                children: {
                    resource: {
                        element: <HelpPage />,
                        name: "Help",
                        path: Sitemap.help.resource,
                    },
                },
            },
            library: {
                element: <LibraryLayout />,
                icon: MusicIcon,
                name: "Library",
                path: Sitemap.library.root,
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
                path: Sitemap.root.root,
                children: {
                    newProject: {
                        element: <WorkstationPage />,
                        name: "New Project - Workstation",
                        path: Sitemap.root.newProject,
                    },
                    project: {
                        element: <WorkstationPage />,
                        name: "Project - Workstation",
                        path: Sitemap.root.project,
                    },
                },
                redirects: [
                    {
                        to: Sitemap.root.newProject,
                    },
                ],
            },
            notFound: {
                element: <NotFoundPage />,
                name: "Not Found",
                path: "*",
            },
        },
    },
};

export type { RouteMap };
export { Routes };
