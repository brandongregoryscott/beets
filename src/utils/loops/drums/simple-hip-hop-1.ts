import { DrumType } from "enums/drum-type";
import { Loop } from "tone";
import * as Tone from "tone";
import { CoreUtils } from "utils/core-utils";
import { SamplifiedNostalgia } from "utils/sample-packs/samplified-nostalgia";

let _loaded = false;

const simpleHipHop1 = () => {
    if (_loaded) {
        return;
    }

    const closedHat = SamplifiedNostalgia.getPlayer(DrumType.ClosedHiHat, 4);
    const openHat = SamplifiedNostalgia.getPlayer(DrumType.OpenHiHat);
    const kick = SamplifiedNostalgia.getPlayer(DrumType.Kick, 4);
    const snare = SamplifiedNostalgia.getPlayer(DrumType.Snare, 3);

    Tone.Transport.bpm.value = CoreUtils.randomInt(75, 85);
    Tone.Transport.swing = CoreUtils.randomFloat(0.25, 0.3);

    new Loop((time) => closedHat.start(time), "8n").start();
    new Loop((time) => openHat.start(time), "1m").start("0:7");
    new Loop((time) => kick.start(time), "1m").start();
    new Loop((time) => kick.start(time), "1m").start("0:5");
    new Loop((time) => snare.start(time), "2n").start("4n");

    _loaded = true;
};

export { simpleHipHop1 };
