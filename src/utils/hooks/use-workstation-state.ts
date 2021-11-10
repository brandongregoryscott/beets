import { Track } from "generated/interfaces/track";
import { SetStateAction, useAtom } from "jotai";
import { ProjectRecord } from "models/project-record";
import { TrackRecord } from "models/track-record";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useCallback } from "react";
import { WorkstationStateAtom } from "utils/atoms/workstation-state-atom";
import { getUpdatedState } from "utils/core-utils";

interface UseWorkstationStateResult {
    addTrack: (track?: TrackRecord) => void | Promise<void>;
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
    updateTrack: (id: string, update: Partial<Track>) => void | Promise<void>;
}

const useWorkstationState = (): UseWorkstationStateResult => {
    const [state, setState] = useAtom(WorkstationStateAtom);

    const setCurrentProject = useCallback(
        (updatedProject: SetStateAction<ProjectRecord>) =>
            setState((prev: WorkstationStateRecord) =>
                prev.merge({
                    currentProject: getUpdatedState(
                        prev.currentProject,
                        updatedProject
                    ),
                })
            ),
        [setState]
    );

    const addTrack = useCallback(
        (track?: TrackRecord) =>
            setCurrentProject((prev) => prev.addTrack(track)),
        [setCurrentProject]
    );

    const getTrack = useCallback(
        (id: string) => state.currentProject.getTrack(id),
        [state.currentProject]
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

    const isPersisted = state.currentProject.isPersisted();
    const isProjectDirty = !state.initialProject.equals(state.currentProject);
    const isTrackListDirty = !state.initialProject
        .getTracks()
        .equals(state.currentProject.getTracks());

    const isDirty = isPersisted && (isProjectDirty || isTrackListDirty);

    return {
        addTrack,
        getTrack,
        isDirty,
        removeTrack,
        state,
        setState,
        setCurrentProject,
        updateTrack,
    };
};

export { useWorkstationState };
