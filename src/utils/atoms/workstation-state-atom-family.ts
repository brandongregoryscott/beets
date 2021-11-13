import { WorkstationStateRecord } from "models/workstation-state-record";
import { atom, SetStateAction } from "jotai";
import { atomFamily } from "jotai/utils";
import { DiffableState } from "enums/diffable-state";

const WorkstationStateAtomFamily = atomFamily<
    DiffableState,
    WorkstationStateRecord,
    SetStateAction<WorkstationStateRecord>
>((_state: DiffableState) =>
    atom<WorkstationStateRecord>(new WorkstationStateRecord())
);

export { WorkstationStateAtomFamily };
