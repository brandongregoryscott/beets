import { RouteMap } from "interfaces/route-map";
import React from "react";
import { RouteConfig } from "react-router-config";

interface RouteDefinition
    extends Omit<RouteConfig, "component" | "path" | "routes"> {
    component?: React.FC<any>;
    icon?: React.FC<any>;
    name: string;
    path: string;
    routes?: RouteMap;
}

export type { RouteDefinition };
