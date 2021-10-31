import { immutableAtomWithStorage } from "utils/atoms/immutable-atom-with-storage";
import { WorkstationStateRecord } from "models/workstation-state-record";

const WorkstationStateAtom = immutableAtomWithStorage<WorkstationStateRecord>(
    "workstationState",
    new WorkstationStateRecord(),
    WorkstationStateRecord
);

export { WorkstationStateAtom };
