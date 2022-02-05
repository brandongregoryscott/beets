import { ReactronicaState } from "interfaces/reactronica-state";
import { atom } from "jotai";

const initialReactronicaState: ReactronicaState = {
    index: undefined,
    isPlaying: false,
    isMuted: false,
    notes: [],
    startIndex: undefined,
};
const ReactronicaStateAtom = atom<ReactronicaState>(initialReactronicaState);

export { initialReactronicaState, ReactronicaStateAtom };
