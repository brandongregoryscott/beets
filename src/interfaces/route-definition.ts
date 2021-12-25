import { RedirectDefinition } from "interfaces/redirect-definition";
import { RouteMap } from "interfaces/route-map";
import React from "react";
import { RouteConfig } from "react-router-config";

interface RouteDefinition
    extends Omit<RouteConfig, "component" | "path" | "routes"> {
    component?: React.FC<any>;
    exact?: boolean;
    icon?: React.FC<any>;
    name: string;
    path: string;
    redirects?: RedirectDefinition[];
    routes?: RouteMap;
}

export type { RouteDefinition };
