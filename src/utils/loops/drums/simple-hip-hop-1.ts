import { DrumType } from "enums/drum-type";
import { Loop } from "tone";
import * as Tone from "tone";
import { randomInt, randomFloat } from "utils/core-utils";
import { SamplifiedNostalgia } from "utils/sample-packs/samplified-nostalgia";

let _loaded = false;

const simpleHipHop1 = () => {
    if (_loaded) {
        return;
    }

    const { closedHiHat, openHiHat, kick, snare } =
        SamplifiedNostalgia.getPlayers({
            [DrumType.ClosedHiHat]: 4,
            [DrumType.Kick]: 4,
            [DrumType.Snare]: 3,
        });

    Tone.Transport.bpm.value = randomInt(75, 85);
    Tone.Transport.swing = randomFloat(0.25, 0.3);

    new Loop((time) => closedHiHat.start(time), "8n").start();
    new Loop((time) => openHiHat.start(time), "1m").start("0:7");
    new Loop((time) => kick.start(time), "1m").start();
    new Loop((time) => kick.start(time), "1m").start("0:5");
    new Loop((time) => snare.start(time), "2n").start("4n");

    _loaded = true;
};

export { simpleHipHop1 };
