import { RouteMap } from "interfaces/route-map";
import { RouteDefinition } from "interfaces/route-definition";
import {
    RouteMatch,
    RouteObject,
    matchRoutes as reactRouterMatchRoutes,
} from "react-router";
import { flatMap } from "lodash";

const flattenRoutes = (routes?: RouteMap): RouteDefinition[] => {
    if (routes == null) {
        return [];
    }

    return Object.keys(routes).map((key) => routes[key]);
};

const joinPaths = (...paths: string[]): string => paths.join("/");

const matchRoutes = (
    routes: RouteDefinition[],
    location: Partial<Location> | string
): RouteMatch[] | null => {
    const routeObjects = flatMap(routes, toRouteObject);
    return reactRouterMatchRoutes(routeObjects, location);
};

const toRouteObject = (route: RouteDefinition): RouteObject => {
    const { path, element, children: childRouteDefinitions } = route ?? {};
    const children = flattenRoutes(childRouteDefinitions).map(toRouteObject);

    return {
        path,
        element,
        children,
    };
};

export { flattenRoutes, joinPaths, matchRoutes, toRouteObject };
