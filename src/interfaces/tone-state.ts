import { ToneTrack } from "interfaces/tone-track";
import { Subdivision } from "tone/build/esm/core/type/Units";

interface ToneState {
    isPlaying?: boolean;
    mute?: boolean;
    subdivision?: Subdivision;
    tracks?: ToneTrack[];
}

export type { ToneState };
