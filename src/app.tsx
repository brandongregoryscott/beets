import "./app.css";
import { Pane, majorScale } from "evergreen-ui";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Routes } from "routes";
import { NavigationTabs } from "components/navigation-tabs";
import { useSubscribeToAuthStatus } from "utils/hooks/supabase/use-subscribe-to-auth-status";

const App: React.FC = () => {
    useSubscribeToAuthStatus();
    return (
        <Pane height="100vh" overflowY="hidden">
            <Pane marginY={majorScale(2)} marginX={majorScale(2)}>
                <NavigationTabs />
            </Pane>
            <Switch>{renderRoutes(Routes)}</Switch>
        </Pane>
    );
};

export default App;
