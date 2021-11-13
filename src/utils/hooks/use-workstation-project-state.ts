import _ from "lodash";
import { ProjectRecord } from "models/project-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { SetStateAction, useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface UseWorkstationProjectStateResult {
    initialState: ProjectRecord;
    setCurrentProject: (update: SetStateAction<ProjectRecord>) => void;
    setProject: (updatedProject: SetStateAction<ProjectRecord>) => void;
    setInitialProject: (update: SetStateAction<ProjectRecord>) => void;
    state: ProjectRecord;
}

const useWorkstationProjectState = (): UseWorkstationProjectStateResult => {
    const { state, initialState, setInitialState, setCurrentState } =
        useWorkstationState();

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

    return {
        initialState: initialState.project,
        setCurrentProject,
        setInitialProject,
        setProject,
        state: state.project,
    };
};

export { useWorkstationProjectState };
