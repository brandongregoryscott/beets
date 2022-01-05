import { List } from "immutable";
import { SetStateAction, useCallback, useMemo } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import _ from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { rebaseIndexes } from "utils/collection-utils";

interface UseTrackSectionsStateOptions {
    trackId: string;
}

interface UseTrackSectionsStateResult {
    add: (trackSection?: TrackSectionRecord) => void;
    get: (id: string) => TrackSectionRecord | undefined;
    initialState: List<TrackSectionRecord>;
    remove: (trackSection: TrackSectionRecord) => void;
    setState: (update: SetStateAction<List<TrackSectionRecord>>) => void;
    state: List<TrackSectionRecord>;
    update: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
}

const useTrackSectionsState = (
    options: UseTrackSectionsStateOptions
): UseTrackSectionsStateResult => {
    const { trackId } = options;
    const {
        state: workstationState,
        initialState: initialWorkstationState,
        setCurrentState,
    } = useWorkstationState();

    const add = useCallback(
        (trackSection?: TrackSectionRecord) =>
            setCurrentState((prev) => {
                const updatedTrackSections = prev.trackSections.push(
                    trackSection?.merge({ track_id: trackId }) ??
                        new TrackSectionRecord({ track_id: trackId })
                );

                return prev.merge({
                    trackSections: rebaseIndexes(
                        updatedTrackSections,
                        filterByTrackId(trackId)
                    ),
                });
            }),
        [setCurrentState, trackId]
    );

    const get = useCallback(
        (id: string) => workstationState.trackSections.find(filterById(id)),
        [workstationState.trackSections]
    );

    const remove = useCallback(
        (trackSection: TrackSectionRecord) =>
            setCurrentState((prev) => {
                const updatedTrackSections = rebaseIndexes(
                    prev.trackSections.filter(
                        (existingTrackSection) =>
                            existingTrackSection.id !== trackSection.id
                    ),
                    filterByTrackId(trackId)
                );

                // Additionally remove any TrackSectionSteps
                const updatedTrackSectionSteps = prev.trackSectionSteps.filter(
                    (trackSectionStep) =>
                        trackSectionStep.track_section_id !== trackSection.id
                );

                return prev.merge({
                    trackSections: updatedTrackSections,
                    trackSectionSteps: updatedTrackSectionSteps,
                });
            }),
        [setCurrentState, trackId]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackSectionRecord>) =>
            setCurrentState((prev) => {
                const index = prev.trackSections.findIndex(filterById(id));

                if (index < 0) {
                    return prev;
                }

                const value = _.isFunction(update)
                    ? update(prev.trackSections.get(index)!)
                    : update;

                return prev.merge({
                    trackSections: prev.trackSections.set(index, value),
                });
            }),
        [setCurrentState]
    );

    const setState = useCallback(
        (update: SetStateAction<List<TrackSectionRecord>>) => {
            setCurrentState((prev) => {
                const trackSectionsByTrack = prev.trackSections.filter(
                    filterByTrackId(trackId)
                );

                const value = _.isFunction(update)
                    ? update(trackSectionsByTrack)
                    : update;

                const mergedTrackSections = prev.trackSections
                    .filterNot(filterByTrackId(trackId))
                    .concat(value);

                return prev.merge({ trackSections: mergedTrackSections });
            });
        },
        [setCurrentState, trackId]
    );

    const initialState = useMemo(
        () =>
            initialWorkstationState.trackSections.filter(
                filterByTrackId(trackId)
            ),
        [initialWorkstationState.trackSections, trackId]
    );

    const state = useMemo(
        () => workstationState.trackSections.filter(filterByTrackId(trackId)),
        [trackId, workstationState.trackSections]
    );

    return {
        add,
        get,
        initialState,
        remove,
        setState,
        state,
        update,
    };
};

const filterById = (id: string) => (value: TrackSectionRecord) =>
    value.id === id;

const filterByTrackId = (trackId: string) => (value: TrackSectionRecord) =>
    value.track_id === trackId;

export { useTrackSectionsState };
