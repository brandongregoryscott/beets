import { RouteDefinition } from "interfaces/route-definition";
import { RouteMap } from "interfaces/route-map";
import { compact } from "lodash";
import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { renderRoutes } from "utils/route-utils";

interface NestedRoutesProps {
    route?: RouteDefinition;
    routes?: RouteMap;
}

const NestedRoutes: React.FC<NestedRoutesProps> = (
    props: NestedRoutesProps
) => {
    const { route, routes } = props;
    const redirects = compact(
        route?.redirects?.map((redirect, index) => (
            <Redirect key={index} {...redirect} />
        ))
    );

    return (
        <Switch>
            {redirects}
            {renderRoutes(routes ?? route?.routes)}
        </Switch>
    );
};

export { NestedRoutes };
