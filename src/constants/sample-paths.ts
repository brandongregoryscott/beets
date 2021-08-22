import { DrumType } from "enums/drum-type";

const SamplePaths: Record<DrumType, string> = {
    [DrumType.ClosedHiHat]: "hi-hats/closed",
    [DrumType.Kick]: "kicks",
    [DrumType.OpenHiHat]: "hi-hats/open",
    [DrumType.Shaker]: "shakers",
    [DrumType.Snare]: "snares",
};

export { SamplePaths };
