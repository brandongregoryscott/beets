import "./app.css";
import { TrackList } from "components/track-list";
import { ThemeConsumer, ThemeProvider, defaultTheme } from "evergreen-ui";

function App() {
    return (
        <div className="App">
            <ThemeProvider value={defaultTheme}>
                <TrackList />
            </ThemeProvider>
        </div>
    );
}

export default App;
