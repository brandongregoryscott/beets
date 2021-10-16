import {
    renderRoutes as reactRouterRenderRoutes,
    RouteConfig,
} from "react-router-config";
import { RouteMap } from "interfaces/route-map";

const renderRoutes = (routes?: RouteMap): JSX.Element | null => {
    if (routes == null) {
        return null;
    }

    const flattenedRoutes = Object.keys(routes).map((key) => routes[key]);
    return reactRouterRenderRoutes(flattenedRoutes as RouteConfig[]);
};

export { renderRoutes };
