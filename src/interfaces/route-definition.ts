import { RedirectDefinition } from "interfaces/redirect-definition";
import { RouteMap } from "interfaces/route-map";
import React from "react";

interface RouteDefinition {
    children?: RouteMap;
    element: JSX.Element;
    icon?: React.FC<any>;
    name: string;
    path: string;
    redirects?: RedirectDefinition[];
}

export type { RouteDefinition };
