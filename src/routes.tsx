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
import { UsagePage } from "components/pages/usage-page";
import { HelpResource } from "enums/help-resource";

export interface RouteMap extends GenericRouteMap {
    root: RouteDefinition & {
        routes: {
            help: RouteDefinition & {
                routes: {
                    usage: RouteDefinition;
                };
            };
            library: RouteDefinition & {
                routes: {
                    files: RouteDefinition;
                    instruments: RouteDefinition;
                };
            };
            login: RouteDefinition;
            logout: RouteDefinition;
            register: RouteDefinition;
            workstation: RouteDefinition & {
                routes: {
                    workstation: RouteDefinition;
                };
            };
        };
    };
}

const Routes: RouteMap = {
    root: {
        component: <ApplicationLayout />,
        name: "ApplicationLayout",
        path: Sitemap.home,
        routes: {
            help: {
                component: <HelpLayout />,
                icon: HelpIcon,
                name: "Help",
                path: Sitemap.help.home,
                redirects: [{ to: Sitemap.help.usage }],
                routes: {
                    usage: {
                        component: <UsagePage />,
                        name: HelpResource.Usage,
                        path: Sitemap.help.usage,
                    },
                },
            },
            library: {
                component: <LibraryLayout />,
                icon: MusicIcon,
                name: "Library",
                path: Sitemap.library.home,
                redirects: [
                    {
                        to: Sitemap.library.files,
                    },
                ],
                routes: {
                    files: {
                        component: <FilesPage />,
                        name: "Files",
                        path: Sitemap.library.files,
                    },
                    instruments: {
                        component: <InstrumentsPage />,
                        name: "Instruments",
                        path: Sitemap.library.instruments,
                    },
                },
            },
            login: {
                component: <LoginPage />,
                icon: LogInIcon,
                name: "Login",
                path: Sitemap.login,
            },
            logout: {
                component: <LogoutPage />,
                icon: LogOutIcon,
                name: "Logout",
                path: Sitemap.logout,
            },
            register: {
                component: <RegisterPage />,
                name: "Register",
                path: Sitemap.register,
            },
            workstation: {
                component: <WorkstationLayout />,
                icon: HomeIcon,
                name: "WorkstationLayout",
                path: Sitemap.home,
                routes: {
                    workstation: {
                        component: <WorkstationPage />,
                        name: "Workstation",
                        path: Sitemap.home,
                    },
                },
            },
        },
    },
};

export { Routes };
