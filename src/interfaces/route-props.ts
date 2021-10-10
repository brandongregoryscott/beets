import { RouteDefinition } from "interfaces/route-definition";
import { RouteChildrenProps } from "react-router";

interface RouteProps extends RouteChildrenProps<any> {
    route: RouteDefinition;
}

export type { RouteProps };
