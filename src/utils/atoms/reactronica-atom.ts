import { ReactronicaState } from "interfaces/reactronica-state";
import { atom } from "jotai";

const ReactronicaStateAtom = atom<ReactronicaState | undefined>(undefined);

export { ReactronicaStateAtom };
