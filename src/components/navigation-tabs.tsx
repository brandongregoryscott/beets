import { Pane, Tab } from "evergreen-ui";
import { Fragment } from "react";
import { RouteConfig } from "react-router-config";
import { NavLink } from "react-router-dom";
import { Routes } from "routes";
import { Sitemap } from "sitemap";
import { isNilOrEmpty } from "utils/core-utils";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useLogout } from "utils/hooks/use-logout";
import { getRouteBySitemap } from "utils/route-utils";

interface NavigationTabsProps {}

const AUTHENTICATION_ROUTE_PATHS = [Sitemap.login, Sitemap.register];

const NavigationTabs: React.FC<NavigationTabsProps> = (
    props: NavigationTabsProps
) => {
    const { globalState } = useGlobalState();
    const { mutate: logout } = useLogout();
    const isNotAuthenticationRoute = (route: RouteConfig) =>
        isNilOrEmpty(route.path) ||
        !AUTHENTICATION_ROUTE_PATHS.includes(route.path as string);

    const loginRoute = getRouteBySitemap("login");
    const registerRoute = getRouteBySitemap("register");

    return (
        <Pane display="flex" flexDirection="row">
            {Routes.filter(isNotAuthenticationRoute).map((route) => (
                <Tab
                    exact={true}
                    is={NavLink}
                    key={route.path as string}
                    to={route.path as string}>
                    {route.name}
                </Tab>
            ))}

            <Pane
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                flexGrow={1}>
                {!globalState.isAuthenticated() && (
                    <Fragment>
                        <Tab exact={true} is={NavLink} to={Sitemap.login}>
                            {loginRoute?.name}
                        </Tab>
                        <Tab exact={true} is={NavLink} to={Sitemap.register}>
                            {registerRoute?.name}
                        </Tab>
                    </Fragment>
                )}
                {globalState.isAuthenticated() && (
                    <Fragment>
                        <Tab onSelect={logout}>Log out</Tab>
                    </Fragment>
                )}
            </Pane>
        </Pane>
    );
};

export { NavigationTabs };
