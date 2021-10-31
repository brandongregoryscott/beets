import { SetStateAction, useAtom } from "jotai";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { WorkstationStateAtom } from "utils/atoms/workstation-state-atom";

interface UseWorkstationStateResult {
    state: WorkstationStateRecord;
    setState: (
        update: SetStateAction<WorkstationStateRecord>
    ) => void | Promise<void>;
}

const useWorkstationState = (): UseWorkstationStateResult => {
    const [state, setState] = useAtom(WorkstationStateAtom);

    return { state, setState };
};

export { useWorkstationState };
