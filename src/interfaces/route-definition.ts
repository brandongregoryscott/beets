import { RedirectDefinition } from "interfaces/redirect-definition";
import { RouteMap } from "interfaces/route-map";
import React from "react";

interface RouteDefinition {
    component?: JSX.Element;
    icon?: React.FC<any>;
    name: string;
    path: string;
    redirects?: RedirectDefinition[];
    routes?: RouteMap;
}

export type { RouteDefinition };
