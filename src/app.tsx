import React from "react";
import "./app.css";
import * as Tone from "tone";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={handlePlay}>Play</button>
            </header>
        </div>
    );
}

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const handlePlay = () => {
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
};

// #endregion Private Functions

export default App;
