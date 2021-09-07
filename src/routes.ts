import { Library } from "components/library";
import { Workstation } from "components/workstation";
import { RouteConfig } from "react-router-config";
import { Sitemap } from "sitemap";

const Routes: RouteConfig[] = [
    {
        component: Workstation,
        path: Sitemap.home,
        exact: true,
    },
    {
        component: Library,
        path: Sitemap.library,
        exact: true,
    },
];

export { Routes };
