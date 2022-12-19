import { TrackRecord } from "models/track-record";
import type { List } from "immutable";
import type { SetStateAction } from "react";
import { useCallback } from "react";
import { isFunction } from "lodash";
import { intersectionWith } from "utils/collection-utils";
import { useAtom } from "jotai";
import { CurrentTracksAtom, InitialTracksAtom } from "atoms/tracks-atom";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { CurrentWorkstationStateAtom } from "atoms/workstation-atom";
import { CurrentTrackSectionsAtom } from "atoms/track-sections-atom";
import { CurrentTrackSectionStepsAtom } from "atoms/track-section-steps-atom";

interface UseTracksStateResult {
    add: (track?: TrackRecord) => void;
    get: (id: string) => TrackRecord | undefined;
    initialState: List<TrackRecord>;
    remove: (track: TrackRecord) => void;
    setState: (update: SetStateAction<List<TrackRecord>>) => void;
    state: List<TrackRecord>;
    update: (id: string, update: SetStateAction<TrackRecord>) => void;
}

const useTracksState = (): UseTracksStateResult => {
    const workstationState = useAtomValue(CurrentWorkstationStateAtom);
    const setTrackSections = useUpdateAtom(CurrentTrackSectionsAtom);
    const setTrackSectionSteps = useUpdateAtom(CurrentTrackSectionStepsAtom);
    const initialState = useAtomValue(InitialTracksAtom);
    const [state, setState] = useAtom(CurrentTracksAtom);

    const add = useCallback(
        (track?: TrackRecord) =>
            setState((prev) =>
                prev.push(
                    track ??
                        new TrackRecord({
                            index: prev.count(),
                            project_id: workstationState.project.id,
                        })
                )
            ),
        [setState, workstationState.project.id]
    );

    const get = useCallback(
        (id: string) => state.find((track) => track.id === id),
        [state]
    );

    const remove = useCallback(
        (track: TrackRecord) =>
            setState((prev) => {
                const updatedTracks = prev.filter(
                    (existingTrack) => existingTrack.id !== track.id
                );

                setTrackSections((prev) => {
                    const updatedTrackSections = prev.filter(
                        (trackSections) => trackSections.track_id !== track.id
                    );

                    setTrackSectionSteps((prevTrackSectionSteps) =>
                        intersectionWith(
                            prevTrackSectionSteps,
                            updatedTrackSections,
                            (trackSectionStep, trackSection) =>
                                trackSectionStep.track_section_id ===
                                trackSection.id
                        )
                    );

                    return updatedTrackSections;
                });

                return updatedTracks;
            }),
        [setState, setTrackSectionSteps, setTrackSections]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackRecord>) =>
            setState((prev) => {
                const index = prev.findIndex((track) => track.id === id);

                if (index < 0) {
                    return prev;
                }

                const value = isFunction(update)
                    ? update(prev.get(index)!)
                    : update;

                return prev.set(index, value);
            }),
        [setState]
    );

    return {
        add,
        get,
        initialState,
        remove,
        state,
        setState,
        update,
    };
};

export { useTracksState };
