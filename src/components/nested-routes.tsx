import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { flattenRoutes } from "utils/route-utils";
import { RouteMap } from "interfaces/route-map";

interface NestedRoutesProps {
    routes?: RouteMap;
}

const NestedRoutes: React.FC<NestedRoutesProps> = (
    props: NestedRoutesProps
) => {
    const { routes } = props;
    return <Routes>{renderRoutes(routes)}</Routes>;
};

const renderRoutes = (routes?: RouteMap): JSX.Element[] =>
    flattenRoutes(routes).map((route, index) => (
        <Route element={route.component} key={index} path={route.path}>
            {route.redirects?.map((redirect, index) => (
                <Route
                    element={<Navigate {...redirect} />}
                    index={true}
                    key={index}
                />
            ))}
            {renderRoutes(route.routes)}
        </Route>
    ));

export { NestedRoutes };
