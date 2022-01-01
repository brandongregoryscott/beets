import { NestedRoutes } from "components/nested-routes";
import { Pane } from "evergreen-ui";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "routes";
import { useCurrentUser } from "utils/hooks/use-current-user";

const App: React.FC = () => {
    const queryClient = useQueryClient();
    const { user } = useCurrentUser();
    useEffect(() => queryClient.clear(), [queryClient, user]);

    return (
        <Pane height="100vh" overflowY="hidden">
            <BrowserRouter>
                <NestedRoutes routes={Routes} />
            </BrowserRouter>
        </Pane>
    );
};

export default App;
