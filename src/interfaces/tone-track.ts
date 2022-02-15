import { ToneStep } from "interfaces/tone-step";
import Tone from "tone";

interface ToneTrack {
    instrument?: Tone.Sampler;
    mute?: boolean;
    pan?: number;
    solo?: boolean;
    steps?: Array<ToneStep | null>;
    volume?: number;
}

export type { ToneTrack };
