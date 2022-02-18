import { ToneState } from "interfaces/tone-state";
import { atom } from "jotai";
import { Map } from "immutable";
import { ToneTrack } from "interfaces/tone-track";

const ToneStateAtom = atom<ToneState>({
    endIndex: undefined,
    isPlaying: false,
    mute: false,
    startIndex: undefined,
    subdivision: "8n",
    tracks: Map<string, ToneTrack>(),
});

export { ToneStateAtom };
