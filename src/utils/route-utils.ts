import type { RouteMap } from "interfaces/route-map";
import type { RouteDefinition } from "interfaces/route-definition";
import type { RouteMatch, RouteObject } from "react-router";
// eslint-disable-next-line no-restricted-imports
import { generatePath as reactRouterGeneratePath } from "react-router";
import { matchRoutes as reactRouterMatchRoutes } from "react-router";
import { flatMap, isEmpty } from "lodash";
import type { HelpResource } from "enums/help-resource";
import { Sitemap } from "sitemap";

const absolutePath = (path?: string) => (isEmpty(path) ? "/" : `/${path}`);

const flattenRoutes = (routes?: RouteMap): RouteDefinition[] => {
    if (routes == null) {
        return [];
    }

    return Object.keys(routes).map((key) => routes[key]);
};

const joinPaths = (...paths: string[]): string =>
    paths.map(toPathCase).join("/");

const matchRoutes = (
    routes: RouteDefinition[],
    location: Partial<Location> | string
): RouteMatch[] | null => {
    const routeObjects = flatMap(routes, toRouteObject);
    return reactRouterMatchRoutes(routeObjects, location);
};

/**
 * Returns a path with parameterized values replaced, i.e. /users/:id, { id: 42 } -> /users/42
 */
const generatePath = (
    path: string,
    params?: Record<string, string | undefined>
): string => reactRouterGeneratePath(path, params);

const generateHelpPath = (resource: HelpResource) =>
    generatePath(Sitemap.help.resource, { resource: toPathCase(resource) });

const toPathCase = (path: string) => path.replace(/ /g, "-").toLowerCase();

const toRouteObject = (route: RouteDefinition): RouteObject => {
    const { path, element, children: childRouteDefinitions } = route ?? {};
    const children = flattenRoutes(childRouteDefinitions).map(toRouteObject);

    return {
        path,
        element,
        children,
    };
};

export {
    absolutePath,
    flattenRoutes,
    generateHelpPath,
    generatePath,
    joinPaths,
    matchRoutes,
    toPathCase,
    toRouteObject,
};
