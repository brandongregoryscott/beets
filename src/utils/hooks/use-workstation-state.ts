import { DiffableState } from "enums/diffable-state";
import { SetStateAction, useAtom } from "jotai";
import _ from "lodash";
import { ProjectRecord } from "models/project-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCallback } from "react";
import { WorkstationStateAtomFamily } from "utils/atoms/workstation-state-atom-family";

interface UseWorkstationStateResult {
    initialState: WorkstationStateRecord;
    isDirty: boolean;
    setCurrentProject: (update: SetStateAction<ProjectRecord>) => void;
    setCurrentState: (update: SetStateAction<WorkstationStateRecord>) => void;
    setInitialProject: (update: SetStateAction<ProjectRecord>) => void;
    setProject: (updatedProject: SetStateAction<ProjectRecord>) => void;
    setState: (update: SetStateAction<WorkstationStateRecord>) => void;
    state: WorkstationStateRecord;
}

const useWorkstationState = (): UseWorkstationStateResult => {
    const [initialState, setInitialState] = useAtom(
        WorkstationStateAtomFamily(DiffableState.Initial)
    );
    const [state, setCurrentState] = useAtom(
        WorkstationStateAtomFamily(DiffableState.Current)
    );

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

    const setInitialProject = useCallback(
        (updatedProject: SetStateAction<ProjectRecord>) =>
            _setProject(setInitialState, updatedProject),
        [_setProject, setInitialState]
    );

    const setCurrentProject = useCallback(
        (updatedProject: SetStateAction<ProjectRecord>) =>
            _setProject(setCurrentState, updatedProject),
        [_setProject, setCurrentState]
    );

    const setProject = useCallback(
        (updatedProject: SetStateAction<ProjectRecord>) => {
            setCurrentProject(updatedProject);
            setInitialProject(updatedProject);
        },
        [setCurrentProject, setInitialProject]
    );

    const setState = useCallback(
        (updatedWorkstationState: SetStateAction<WorkstationStateRecord>) => {
            setInitialState(updatedWorkstationState);
            setCurrentState(updatedWorkstationState);
        },
        [setCurrentState, setInitialState]
    );

    const isPersisted = state.project.isPersisted();
    const isProjectDirty = !initialState.project.equals(state.project);
    const isTrackListDirty = !initialState.tracks.equals(state.tracks);

    const isDirty = isPersisted && (isProjectDirty || isTrackListDirty);

    return {
        initialState,
        isDirty,
        setCurrentProject,
        setCurrentState,
        setInitialProject,
        setProject,
        setState,
        state,
    };
};

export { useWorkstationState };
