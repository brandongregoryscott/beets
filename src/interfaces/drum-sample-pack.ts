import { DrumType } from "enums/drum-type";
import { SamplePack } from "interfaces/sample-pack";

interface DrumSamplePack extends SamplePack {
    count: Record<DrumType, number>;
}

export type { DrumSamplePack };
