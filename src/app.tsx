import { NestedRoutes } from "components/nested-routes";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "routes";
import { useCurrentUser } from "hooks/use-current-user";
import { useGlobalState } from "hooks/use-global-state";
import Snowfall from "react-snowfall";

const App: React.FC = () => {
    const queryClient = useQueryClient();
    const { user } = useCurrentUser();
    const { globalState } = useGlobalState();
    useEffect(() => queryClient.clear(), [queryClient, user]);

    return (
        <BrowserRouter>
            <NestedRoutes routes={Routes} />
            {globalState.enableHolidayMode && <Snowfall />}
        </BrowserRouter>
    );
};

export { App };
