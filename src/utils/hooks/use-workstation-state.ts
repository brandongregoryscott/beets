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
    addTrack: (track?: TrackRecord) => void;
    initialState: WorkstationStateRecord;
    isDirty: boolean;
    getTrack: (id: string) => TrackRecord | undefined;
    removeTrack: (track: TrackRecord) => void;
    state: WorkstationStateRecord;
    setState: (update: SetStateAction<WorkstationStateRecord>) => void;
    setCurrentState: (update: SetStateAction<WorkstationStateRecord>) => void;
    setCurrentProject: (update: SetStateAction<ProjectRecord>) => void;
    setInitialProject: (update: SetStateAction<ProjectRecord>) => void;
    setProject: (updatedProject: SetStateAction<ProjectRecord>) => void;
    updateTrack: (id: string, update: Partial<Track>) => void;
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

    const addTrack = useCallback(
        (track?: TrackRecord) =>
            setCurrentState((prev) =>
                prev.merge({
                    tracks: prev.tracks.push(track ?? new TrackRecord()),
                })
            ),
        [setCurrentState]
    );

    const getTrack = useCallback(
        (id: string) => state.tracks.find((track) => track.id === id),
        [state.tracks]
    );

    const removeTrack = useCallback(
        (track: TrackRecord) =>
            setCurrentState((prev) =>
                prev.merge({
                    tracks: prev.tracks.filter(
                        (existingTrack) => existingTrack.id !== track.id
                    ),
                })
            ),
        [setCurrentState]
    );

    const updateTrack = useCallback(
        (id: string, update: Partial<Track>) =>
            setCurrentState((prev) => {
                const index = prev.tracks.findIndex((track) => track.id === id);

                if (index < 0) {
                    return prev;
                }

                const value = _.isFunction(update)
                    ? update(prev.tracks.get(index))
                    : update;

                return prev.merge({ tracks: prev.tracks.set(index, value) });
            }),
        [setCurrentState]
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
        addTrack,
        getTrack,
        initialState,
        isDirty,
        removeTrack,
        state,
        setCurrentState,
        setCurrentProject,
        setInitialProject,
        setState,
        setProject,
        updateTrack,
    };
};

export { useWorkstationState };
