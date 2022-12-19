import type { SetStateAction } from "jotai";
import { useAtom } from "jotai";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCallback } from "react";
import {
    CurrentWorkstationStateAtom,
    InitialWorkstationStateAtom,
} from "atoms/workstation-atom";

interface UseWorkstationStateResult {
    /**
     * Sets both state values to a new WorkstationStateRecord instance
     */
    clearState: () => void;
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
        InitialWorkstationStateAtom
    );
    const [state, setCurrentState] = useAtom(CurrentWorkstationStateAtom);

    const clearState = useCallback(() => {
        const state = new WorkstationStateRecord();
        setInitialState(state);
        setCurrentState(state);
    }, [setCurrentState, setInitialState]);

    const setState = useCallback(
        (updatedWorkstationState: SetStateAction<WorkstationStateRecord>) => {
            setInitialState(updatedWorkstationState);
            setCurrentState(updatedWorkstationState);
        },
        [setCurrentState, setInitialState]
    );

    const isDirty = !state.equals(initialState);

    return {
        clearState,
        initialState,
        isDirty,
        setCurrentState,
        setInitialState,
        setState,
        state,
    };
};

export { useWorkstationState };
