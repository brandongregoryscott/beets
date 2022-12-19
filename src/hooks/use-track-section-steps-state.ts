import type { List } from "immutable";
import type { SetStateAction } from "react";
import { useCallback, useMemo } from "react";
import { isFunction } from "lodash";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { useAtom } from "jotai";
import {
    CurrentTrackSectionStepsAtom,
    InitialTrackSectionStepsAtom,
} from "atoms/track-section-steps-atom";
import { useAtomValue } from "jotai/utils";

interface UseTrackSectionStepsStateOptions {
    trackSectionId: string;
}

interface UseTrackSectionStepsStateResult {
    initialState: List<TrackSectionStepRecord>;
    setState: (update: SetStateAction<List<TrackSectionStepRecord>>) => void;
    state: List<TrackSectionStepRecord>;
}

const useTrackSectionStepsState = (
    options: UseTrackSectionStepsStateOptions
): UseTrackSectionStepsStateResult => {
    const { trackSectionId } = options;
    const _initialState = useAtomValue(InitialTrackSectionStepsAtom);
    const [_state, _setState] = useAtom(CurrentTrackSectionStepsAtom);

    const setState = useCallback(
        (update: SetStateAction<List<TrackSectionStepRecord>>) => {
            _setState((prev) => {
                const value = isFunction(update) ? update(prev) : update;

                const merged = prev
                    .filter(
                        (trackSectionStep) =>
                            trackSectionStep.track_section_id !== trackSectionId
                    )
                    .concat(value);

                return merged;
            });
        },
        [_setState, trackSectionId]
    );

    const initialState = useMemo(
        () => filterByTrackSectionId(trackSectionId, _initialState),
        [trackSectionId, _initialState]
    );

    const state = useMemo(
        () => filterByTrackSectionId(trackSectionId, _state),
        [trackSectionId, _state]
    );

    return {
        initialState,
        setState,
        state,
    };
};

const filterByTrackSectionId = (
    trackSectionId: string,
    trackSectionSteps: List<TrackSectionStepRecord>
): List<TrackSectionStepRecord> =>
    trackSectionSteps.filter(
        (trackSectionStep) =>
            trackSectionStep.track_section_id === trackSectionId
    );

export { useTrackSectionStepsState };
