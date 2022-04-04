import React from "react";
import { Route, Routes } from "react-router";
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
            {renderRoutes(route?.routes)}
        </Route>
    ));

export { NestedRoutes };
