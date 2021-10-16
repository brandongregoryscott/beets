import { Pane } from "evergreen-ui";
import { Switch } from "react-router-dom";
import { Routes } from "routes";
import { useSubscribeToAuthStatus } from "utils/hooks/supabase/use-subscribe-to-auth-status";
import { renderRoutes } from "utils/route-utils";

const App: React.FC = () => {
    useSubscribeToAuthStatus();
    return (
        <Pane height="100vh" overflowY="hidden">
            <Switch>{renderRoutes(Routes)}</Switch>
        </Pane>
    );
};

export default App;
