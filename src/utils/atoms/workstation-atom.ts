import { WorkstationStateRecord } from "models/workstation-state-record";
import { atom } from "jotai";

const initialValue = new WorkstationStateRecord();

const CurrentWorkstationStateAtom = atom<WorkstationStateRecord>(initialValue);
const InitialWorkstationStateAtom = atom<WorkstationStateRecord>(initialValue);

export { CurrentWorkstationStateAtom, InitialWorkstationStateAtom };
