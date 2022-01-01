import {
    renderRoutes as reactRouterRenderRoutes,
    RouteConfig,
} from "react-router-config";
import { RouteMap } from "interfaces/route-map";
import { RouteDefinition } from "interfaces/route-definition";

const renderRoutes = (routes?: RouteMap): JSX.Element | null =>
    reactRouterRenderRoutes(flattenRoutes(routes) as RouteConfig[]);

const flattenRoutes = (routes?: RouteMap): RouteDefinition[] => {
    if (routes == null) {
        return [];
    }

    return Object.keys(routes).map((key) => routes[key]);
};

export { flattenRoutes, renderRoutes };
