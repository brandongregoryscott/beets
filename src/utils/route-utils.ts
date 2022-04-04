import { RouteMap } from "interfaces/route-map";
import { RouteDefinition } from "interfaces/route-definition";

const flattenRoutes = (routes?: RouteMap): RouteDefinition[] => {
    if (routes == null) {
        return [];
    }

    return Object.keys(routes).map((key) => routes[key]);
};

export { flattenRoutes };
