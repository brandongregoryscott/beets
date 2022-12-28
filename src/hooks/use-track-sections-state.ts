import { List } from "immutable";
import type { SetStateAction } from "react";
import { useCallback, useMemo } from "react";
import { isFunction } from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
    CurrentTrackSectionsAtom,
    InitialTrackSectionsAtom,
} from "atoms/track-sections-atom";
import { CurrentTrackSectionStepsAtom } from "atoms/track-section-steps-atom";
import { rebaseIndexes } from "utils/collection-utils";

interface UseTrackSectionsStateOptions {
    trackId: string;
}

interface UseTrackSectionsStateResult {
    add: (trackSection?: TrackSectionRecord) => void;
    get: (id: string) => TrackSectionRecord | undefined;
    initialState: List<TrackSectionRecord>;
    insert: (index: number) => void;
    remove: (trackSection: TrackSectionRecord) => void;
    setState: (update: SetStateAction<List<TrackSectionRecord>>) => void;
    state: List<TrackSectionRecord>;
    update: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
}

const useTrackSectionsState = (
    options: UseTrackSectionsStateOptions
): UseTrackSectionsStateResult => {
    const { trackId } = options;
    const setTrackSectionSteps = useSetAtom(CurrentTrackSectionStepsAtom);
    const _initialState = useAtomValue(InitialTrackSectionsAtom);
    const [_state, _setState] = useAtom(CurrentTrackSectionsAtom);

    const setState = useCallback(
        (update: SetStateAction<List<TrackSectionRecord>>) => {
            _setState((prev) => {
                const trackSectionsByTrack = prev.filter(
                    filterByTrackId(trackId)
                );

                const value = rebaseIndexes(
                    isFunction(update) ? update(trackSectionsByTrack) : update
                );

                const mergedTrackSections = prev
                    .filterNot(filterByTrackId(trackId))
                    .concat(value);

                return mergedTrackSections;
            });
        },
        [_setState, trackId]
    );

    const add = useCallback(
        (trackSection?: TrackSectionRecord) =>
            setState((prev) =>
                prev.push(
                    trackSection?.merge({ track_id: trackId }) ??
                        new TrackSectionRecord({ track_id: trackId })
                )
            ),
        [setState, trackId]
    );

    const insert = useCallback(
        (index: number) =>
            setState((prev) =>
                prev.insert(
                    index,
                    new TrackSectionRecord({ track_id: trackId })
                )
            ),
        [setState, trackId]
    );

    const get = useCallback(
        (id: string) => _state.find(filterById(id)),
        [_state]
    );

    const remove = useCallback(
        (trackSection: TrackSectionRecord) => {
            setState((prev) => {
                const updated = prev.filter(
                    (existingTrackSection) =>
                        existingTrackSection.id !== trackSection.id
                );

                // Ensure there's always one TrackSection
                if (updated.isEmpty()) {
                    return List.of<TrackSectionRecord>(
                        new TrackSectionRecord({ track_id: trackId })
                    );
                }

                return updated;
            });

            // Additionally remove any TrackSectionSteps
            setTrackSectionSteps((prevTrackSectionSteps) =>
                prevTrackSectionSteps.filter(
                    (trackSectionStep) =>
                        trackSectionStep.track_section_id !== trackSection.id
                )
            );
        },
        [setState, setTrackSectionSteps, trackId]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackSectionRecord>) =>
            setState((prev) => {
                const index = prev.findIndex(filterById(id));

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

    const initialState = useMemo(
        () => _initialState.filter(filterByTrackId(trackId)),
        [_initialState, trackId]
    );

    const state = useMemo(
        () => _state.filter(filterByTrackId(trackId)),
        [trackId, _state]
    );

    return {
        add,
        get,
        insert,
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
