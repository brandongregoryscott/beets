import { Routes } from "routes";
import { Sitemap } from "sitemap";
import { RouteDefinition } from "interfaces/route-definition";

const getRouteBySitemap = (
    key: keyof typeof Sitemap
): RouteDefinition | undefined =>
    Routes.find((route) => route.path === Sitemap[key]);

export { getRouteBySitemap };
