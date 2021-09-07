import "./app.css";
import {
    ThemeProvider,
    defaultTheme,
    Pane,
    majorScale,
    Tab,
} from "evergreen-ui";
import { BrowserRouter, Switch, NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Routes } from "routes";
import { Sitemap } from "sitemap";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider value={defaultTheme}>
                <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
                    <Pane marginBottom={majorScale(2)}>
                        <Tab is={NavLink} to={Sitemap.home} exact={true}>
                            Workstation
                        </Tab>
                        <Tab is={NavLink} to={Sitemap.library} exact={true}>
                            Library
                        </Tab>
                    </Pane>
                    <Switch>{renderRoutes(Routes)}</Switch>
                </Pane>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
