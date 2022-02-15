import { ToneState } from "interfaces/tone-state";
import { atom } from "jotai";

const ToneStateAtom = atom<ToneState>({
    isPlaying: false,
    mute: false,
    tracks: [],
    subdivision: "8n",
});

export { ToneStateAtom };
