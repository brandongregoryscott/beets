import React from "react";
import { RouteConfig } from "react-router-config";

interface RouteDefinition extends RouteConfig {
    component?: React.FC<any>;
    icon?: React.FC<any>;
    name: string;
    path: string;
}

export type { RouteDefinition };
