import { NestedRoutes } from "components/nested-routes";
import { Pane } from "evergreen-ui";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "routes";
import { useSubscribeToAuthStatus } from "utils/hooks/supabase/use-subscribe-to-auth-status";

const App: React.FC = () => {
    useSubscribeToAuthStatus();
    return (
        <Pane height="100vh" overflowY="hidden">
            <BrowserRouter>
                <NestedRoutes routes={Routes} />
            </BrowserRouter>
        </Pane>
    );
};

export default App;
