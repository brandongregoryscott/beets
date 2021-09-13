import { Routes } from "routes";
import { Sitemap } from "sitemap";
import { RouteConfig } from "react-router-config";

const getRouteBySitemap = (
    key: keyof typeof Sitemap
): RouteConfig | undefined =>
    Routes.find((route) => route.path === Sitemap[key]);

export { getRouteBySitemap };
