import { DiffableState } from "enums/diffable-state";
import { SetStateAction, useAtom } from "jotai";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCallback } from "react";
import { WorkstationStateAtomFamily } from "utils/atoms/workstation-state-atom-family";

interface UseWorkstationStateResult {
    /**
     * **Initial** state value (at time of load, last save, etc.)
     */
    initialState: WorkstationStateRecord;
    /**
     * Returns true if the current state does not equal the initial state
     */
    isDirty: boolean;
    /**
     * Sets the **current** state only
     */
    setCurrentState: (update: SetStateAction<WorkstationStateRecord>) => void;
    /**
     * Sets the **initial** state only
     */
    setInitialState: (update: SetStateAction<WorkstationStateRecord>) => void;
    /**
     * Sets the **initial** and **current** state
     */
    setState: (update: SetStateAction<WorkstationStateRecord>) => void;
    /**
     * **Current** state value
     */
    state: WorkstationStateRecord;
}

const useWorkstationState = (): UseWorkstationStateResult => {
    const [initialState, setInitialState] = useAtom(
        WorkstationStateAtomFamily(DiffableState.Initial)
    );
    const [state, setCurrentState] = useAtom(
        WorkstationStateAtomFamily(DiffableState.Current)
    );

    console.log("state.tracks", state.tracks);
    console.log("state.trackSections", state.trackSections);

    const setState = useCallback(
        (updatedWorkstationState: SetStateAction<WorkstationStateRecord>) => {
            setInitialState(updatedWorkstationState);
            setCurrentState(updatedWorkstationState);
        },
        [setCurrentState, setInitialState]
    );

    const isDirty = !state.equals(initialState);

    return {
        initialState,
        isDirty,
        setCurrentState,
        setInitialState,
        setState,
        state,
    };
};

export { useWorkstationState };
