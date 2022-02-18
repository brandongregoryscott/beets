import { ToneTrack } from "interfaces/tone-track";
import { Subdivision } from "tone/build/esm/core/type/Units";
import { Map } from "immutable";

interface ToneState {
    endIndex?: number;
    isPlaying?: boolean;
    mute?: boolean;
    startIndex?: number;
    subdivision?: Subdivision;
    tracks: Map<string, ToneTrack>;
}

export type { ToneState };
