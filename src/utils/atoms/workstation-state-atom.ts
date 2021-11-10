import { WorkstationStateRecord } from "models/workstation-state-record";
import { atom } from "jotai";

const WorkstationStateAtom = atom<WorkstationStateRecord>(
    new WorkstationStateRecord()
);

export { WorkstationStateAtom };
