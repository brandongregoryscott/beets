import type { List } from "immutable";
import type { SetStateAction } from "react";
import { useCallback, useMemo } from "react";
import { isFunction } from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { rebaseIndexes } from "utils/collection-utils";
import { useAtom } from "jotai";
import {
    CurrentTrackSectionsAtom,
    InitialTrackSectionsAtom,
} from "utils/atoms/track-sections-atom";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { CurrentTrackSectionStepsAtom } from "utils/atoms/track-section-steps-atom";

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
    const setTrackSectionSteps = useUpdateAtom(CurrentTrackSectionStepsAtom);
    const _initialState = useAtomValue(InitialTrackSectionsAtom);
    const [_state, _setState] = useAtom(CurrentTrackSectionsAtom);

    const add = useCallback(
        (trackSection?: TrackSectionRecord) =>
            _setState((prev) => {
                const updatedTrackSections = prev.push(
                    trackSection?.merge({ track_id: trackId }) ??
                        new TrackSectionRecord({ track_id: trackId })
                );

                return rebaseIndexes(
                    updatedTrackSections,
                    filterByTrackId(trackId)
                );
            }),
        [_setState, trackId]
    );

    const get = useCallback(
        (id: string) => _state.find(filterById(id)),
        [_state]
    );

    const remove = useCallback(
        (trackSection: TrackSectionRecord) => {
            _setState((prev) =>
                rebaseIndexes(
                    prev.filter(
                        (existingTrackSection) =>
                            existingTrackSection.id !== trackSection.id
                    ),
                    filterByTrackId(trackId)
                )
            );

            // Additionally remove any TrackSectionSteps
            setTrackSectionSteps((prevTrackSectionSteps) =>
                prevTrackSectionSteps.filter(
                    (trackSectionStep) =>
                        trackSectionStep.track_section_id !== trackSection.id
                )
            );
        },
        [_setState, setTrackSectionSteps, trackId]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackSectionRecord>) =>
            _setState((prev) => {
                const index = prev.findIndex(filterById(id));

                if (index < 0) {
                    return prev;
                }

                const value = isFunction(update)
                    ? update(prev.get(index)!)
                    : update;

                return prev.set(index, value);
            }),
        [_setState]
    );

    const setState = useCallback(
        (update: SetStateAction<List<TrackSectionRecord>>) => {
            _setState((prev) => {
                const trackSectionsByTrack = prev.filter(
                    filterByTrackId(trackId)
                );

                const value = isFunction(update)
                    ? update(trackSectionsByTrack)
                    : update;

                const mergedTrackSections = prev
                    .filterNot(filterByTrackId(trackId))
                    .concat(value);

                return mergedTrackSections;
            });
        },
        [_setState, trackId]
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
