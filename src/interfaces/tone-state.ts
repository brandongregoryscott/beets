import type { Subdivision } from "tone/build/esm/core/type/Units";

interface ToneState {
    endIndex?: number;
    isPlaying?: boolean;
    isRecording?: boolean;
    mute?: boolean;
    startIndex?: number;
    subdivision?: Subdivision;
}

export type { ToneState };
