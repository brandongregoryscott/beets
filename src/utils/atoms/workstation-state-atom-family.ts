import { WorkstationStateRecord } from "models/workstation-state-record";
import { atom, SetStateAction } from "jotai";
import { atomFamily } from "jotai/utils";
import { DiffableState } from "enums/diffable-state";

interface WorkstationStateAtom {
    initialValue: WorkstationStateRecord;
    state: DiffableState;
}

const WorkstationStateAtomFamily = atomFamily<
    WorkstationStateAtom,
    WorkstationStateRecord,
    SetStateAction<WorkstationStateRecord>
>(
    (params: WorkstationStateAtom) =>
        atom<WorkstationStateRecord>(params.initialValue),
    (a, b) => a.state === b.state
);

export { WorkstationStateAtomFamily };
