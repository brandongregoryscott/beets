import "./app.css";
import { TrackList } from "components/track-list";
import { ThemeProvider, defaultTheme, Pane, majorScale } from "evergreen-ui";
import { Song } from "components/song";

function App() {
    return (
        <div className="App">
            <ThemeProvider value={defaultTheme}>
                <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
                    <Song>
                        <TrackList />
                    </Song>
                </Pane>
            </ThemeProvider>
        </div>
    );
}

export default App;
