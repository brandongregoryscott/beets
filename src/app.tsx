import "./app.css";
import { Pane, majorScale } from "evergreen-ui";
import { Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Routes } from "routes";
import { NavigationTabs } from "components/navigation-tabs";
import { useSubscribeToAuthStatus } from "utils/hooks/use-subscribe-to-auth-status";

const App: React.FC = () => {
    useSubscribeToAuthStatus();
    return (
        <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
            <Pane marginBottom={majorScale(2)}>
                <NavigationTabs />
            </Pane>
            <Switch>{renderRoutes(Routes)}</Switch>
        </Pane>
    );
};

export default App;
