import { List } from "immutable";
import { SetStateAction, useCallback, useMemo } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import _ from "lodash";
import { TrackSectionRecord } from "models/track-section-record";

interface UseTrackSectionsStateOptions {
    trackId: string;
}

interface UseTrackSectionsStateResult {
    add: (trackSection?: TrackSectionRecord) => void;
    get: (id: string) => TrackSectionRecord | undefined;
    initialState: List<TrackSectionRecord>;
    remove: (trackSection: TrackSectionRecord) => void;
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
            setCurrentState((prev) =>
                prev.merge({
                    trackSections: prev.trackSections.push(
                        trackSection?.merge({ track_id: trackId }) ??
                            new TrackSectionRecord({ track_id: trackId })
                    ),
                })
            ),
        [setCurrentState, trackId]
    );

    const get = useCallback(
        (id: string) =>
            workstationState.trackSections.find(
                (trackSection) => trackSection.id === id
            ),
        [workstationState.trackSections]
    );

    const remove = useCallback(
        (trackSection: TrackSectionRecord) =>
            setCurrentState((prev) => {
                const updated = prev.trackSections.filter(
                    (existingTrackSection) =>
                        existingTrackSection.id !== trackSection.id
                );

                return prev.merge({ trackSections: updated });
            }),
        [setCurrentState]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackSectionRecord>) =>
            setCurrentState((prev) => {
                const index = prev.trackSections.findIndex(
                    (trackSection) => trackSection.id === id
                );

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

    const initialState = useMemo(
        () =>
            initialWorkstationState.trackSections.filter(
                (trackSection) => trackSection.track_id === trackId
            ),
        [initialWorkstationState.trackSections, trackId]
    );

    const state = useMemo(
        () =>
            workstationState.trackSections.filter(
                (trackSection) => trackSection.track_id === trackId
            ),
        [workstationState.trackSections, trackId]
    );

    return {
        add,
        get,
        initialState,
        remove,
        state,
        update,
    };
};

export { useTrackSectionsState };
