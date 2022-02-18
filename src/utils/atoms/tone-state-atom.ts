import { ToneState } from "interfaces/tone-state";
import { atom } from "jotai";

const ToneStateAtom = atom<ToneState>({
    endIndex: undefined,
    isPlaying: false,
    mute: false,
    startIndex: undefined,
    subdivision: "8n",
});

export { ToneStateAtom };
