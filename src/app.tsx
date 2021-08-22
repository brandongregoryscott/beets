import "./app.css";
import * as Tone from "tone";
import { simpleHipHop1 } from "utils/loops/drums/simple-hip-hop-1";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handlePlay}>Play</button>
                <button onClick={handleStop}>Stop</button>
            </header>
        </div>
    );
}

const handlePlay = async () => {
    simpleHipHop1();
    await Tone.start();
    Tone.Transport.start();
};

const handleStop = () => {
    Tone.Transport.stop();
};

export default App;
