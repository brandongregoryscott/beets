import React from "react";
import "./app.css";
import * as Tone from "tone";

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

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const handlePlay = async () => {
    const hiHat = new Tone.Player(
        `${process.env.PUBLIC_URL}/samples/samplified-nostalgia/hi-hats/closed/1.wav`
    ).toDestination();
    await Tone.loaded();
    const hiHatLoop = new Tone.Loop((time) => {
        hiHat.start(time);
    }, "4n").start(0);

    Tone.Transport.start();
};

const handleStop = () => {
    Tone.Transport.stop();
};

// #endregion Private Functions

export default App;
