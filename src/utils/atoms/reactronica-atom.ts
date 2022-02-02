import { ReactronicaState } from "interfaces/reactronica-state";
import { atom } from "jotai";

const initialReactronicaState: ReactronicaState = {
    index: undefined,
    isPlaying: false,
    isMuted: false,
    notes: [],
};
const ReactronicaStateAtom = atom<ReactronicaState>(initialReactronicaState);

export { initialReactronicaState, ReactronicaStateAtom };
