import React, { useEffect, useRef } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { flattenRoutes } from "utils/route-utils";
import type { RouteMap } from "interfaces/route-map";
import { trackPage } from "utils/analytics-utils";

interface NestedRoutesProps {
    routes?: RouteMap;
}

const NestedRoutes: React.FC<NestedRoutesProps> = (
    props: NestedRoutesProps
) => {
    const { routes } = props;
    const { pathname } = useLocation();
    const pathnameRef = useRef<string>(pathname);
    useEffect(() => {
        if (pathnameRef.current === pathname) {
            return;
        }

        pathnameRef.current = pathname;
        trackPage();
    }, [pathname]);
    return <Routes>{renderRoutes(routes)}</Routes>;
};

const renderRoutes = (routes?: RouteMap): JSX.Element[] =>
    flattenRoutes(routes).map((route, index) => (
        <Route element={route.element} key={index} path={route.path}>
            {route.redirects?.map((redirect, index) => (
                <Route
                    element={<Navigate {...redirect} />}
                    index={true}
                    key={index}
                />
            ))}
            {renderRoutes(route.children)}
        </Route>
    ));

export { NestedRoutes };
