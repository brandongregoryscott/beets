import { RouteDefinition } from "interfaces/route-definition";
import { RouteMap } from "interfaces/route-map";
import { compact } from "lodash";
import React, { useMemo } from "react";
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
    const redirects = useMemo(
        () =>
            compact(
                route?.redirects?.map((redirect) => <Redirect {...redirect} />)
            ),
        [route]
    );

    return (
        <React.Fragment>
            {redirects}
            <Switch>{renderRoutes(routes ?? route?.routes)}</Switch>
        </React.Fragment>
    );
};

export { NestedRoutes };
