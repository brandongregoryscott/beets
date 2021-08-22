import { DrumType } from "enums/drum-type";
import { FileExtension } from "enums/file-extension";
import { DrumSamplePack } from "models/drum-sample-pack";

const SamplifiedNostalgia = new DrumSamplePack({
    count: {
        [DrumType.ClosedHiHat]: 4,
        [DrumType.Kick]: 4,
        [DrumType.OpenHiHat]: 4,
        [DrumType.Shaker]: 4,
        [DrumType.Snare]: 4,
    },
    fileExtension: FileExtension.WAV,
    name: "samplified-nostalgia",
});

export { SamplifiedNostalgia };
