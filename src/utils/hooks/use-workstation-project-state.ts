import _ from "lodash";
import { ProjectRecord } from "models/project-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { SetStateAction, useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface UseWorkstationProjectStateResult {
    /**
     * **Initial** state value (at time of load, last save, etc.)
     */
    initialState: ProjectRecord;
    /**
     * Sets the **current** state only
     */
    setCurrentState: (update: SetStateAction<ProjectRecord>) => void;
    /**
     * Sets the **initial** and **current** state
     */
    setState: (update: SetStateAction<ProjectRecord>) => void;
    /**
     * Sets the **initial** state only
     */
    setInitialState: (update: SetStateAction<ProjectRecord>) => void;
    /**
     * **Current** state value
     */
    state: ProjectRecord;
}

const useWorkstationProjectState = (): UseWorkstationProjectStateResult => {
    const {
        state: workstationState,
        initialState: initialWorkstationState,
        setInitialState: setInitialWorkstationState,
        setCurrentState: setCurrentWorkstationState,
    } = useWorkstationState();
    const { project: state } = workstationState;
    const { project: initialState } = initialWorkstationState;

    const _setProject = useCallback(
        (
            setWorkstationState: (
                update: (prev: WorkstationStateRecord) => WorkstationStateRecord
            ) => void,
            updatedProject: SetStateAction<ProjectRecord>
        ) =>
            setWorkstationState((prev: WorkstationStateRecord) =>
                prev.merge({
                    project: _.isFunction(updatedProject)
                        ? updatedProject(prev.project)
                        : updatedProject,
                })
            ),
        []
    );

    const setInitialState = useCallback(
        (update: SetStateAction<ProjectRecord>) =>
            _setProject(setInitialWorkstationState, update),
        [_setProject, setInitialWorkstationState]
    );

    const setCurrentState = useCallback(
        (update: SetStateAction<ProjectRecord>) =>
            _setProject(setCurrentWorkstationState, update),
        [_setProject, setCurrentWorkstationState]
    );

    const setState = useCallback(
        (updatedProject: SetStateAction<ProjectRecord>) => {
            setCurrentState(updatedProject);
            setInitialState(updatedProject);
        },
        [setCurrentState, setInitialState]
    );

    return {
        initialState,
        setCurrentState,
        setInitialState,
        setState,
        state,
    };
};

export { useWorkstationProjectState };
