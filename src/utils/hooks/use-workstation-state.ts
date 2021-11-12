import { DiffableState } from "enums/diffable-state";
import { Track } from "generated/interfaces/track";
import { SetStateAction, useAtom } from "jotai";
import _ from "lodash";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCallback } from "react";
import { WorkstationStateAtomFamily } from "utils/atoms/workstation-state-atom-family";

interface UseWorkstationStateResult {
    addTrack: (track?: TrackRecord) => void | Promise<void>;
    initialState: WorkstationStateRecord;
    isDirty: boolean;
    getTrack: (id: string) => TrackRecord | undefined;
    removeTrack: (track: TrackRecord) => void | Promise<void>;
    state: WorkstationStateRecord;
    setState: (
        update: SetStateAction<WorkstationStateRecord>
    ) => void | Promise<void>;
    setCurrentProject: (
        updatedProject: SetStateAction<ProjectRecord>
    ) => void | Promise<void>;
    setInitialProject: (
        updatedProject: SetStateAction<ProjectRecord>
    ) => void | Promise<void>;
    setProject: (updatedProject: SetStateAction<ProjectRecord>) => void;
    updateTrack: (id: string, update: Partial<Track>) => void | Promise<void>;
}

const useWorkstationState = (): UseWorkstationStateResult => {
    const [initialState, setInitialState] = useAtom(
        WorkstationStateAtomFamily(DiffableState.Initial)
    );
    const [state, setState] = useAtom(
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
            _setProject(setState, updatedProject),
        [_setProject, setState]
    );

    const addTrack = useCallback(
        (track?: TrackRecord) =>
            setCurrentProject((prev) => prev.addTrack(track)),
        [setCurrentProject]
    );

    const getTrack = useCallback(
        (id: string) => state.project.getTrack(id),
        [state.project]
    );

    const removeTrack = useCallback(
        (track: TrackRecord) =>
            setCurrentProject((prev) => prev.removeTrack(track)),
        [setCurrentProject]
    );

    const updateTrack = useCallback(
        (id: string, update: Partial<Track>) =>
            setCurrentProject((prev) => prev.updateTrack(id, update)),
        [setCurrentProject]
    );

    const setProject = useCallback(
        (updatedProject: SetStateAction<ProjectRecord>) => {
            setCurrentProject(updatedProject);
            setInitialProject(updatedProject);
        },
        [setCurrentProject, setInitialProject]
    );

    const isPersisted = state.project.isPersisted();
    const isProjectDirty = !initialState.project.equals(state.project);
    const isTrackListDirty = !initialState.project
        .getTracks()
        .equals(state.project.getTracks());

    const isDirty = isPersisted && (isProjectDirty || isTrackListDirty);

    return {
        addTrack,
        getTrack,
        initialState,
        isDirty,
        removeTrack,
        state,
        setState,
        setCurrentProject,
        setInitialProject,
        setProject,
        updateTrack,
    };
};

export { useWorkstationState };
