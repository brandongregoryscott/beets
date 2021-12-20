import { List } from "immutable";
import { SetStateAction, useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import _ from "lodash";
import { TrackSectionStepRecord } from "models/track-section-step-record";

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
    const { state, initialState, setCurrentState } = useWorkstationState();

    const setState = useCallback(
        (update: SetStateAction<List<TrackSectionStepRecord>>) => {
            setCurrentState((prev) => {
                const value = _.isFunction(update)
                    ? update(prev.trackSectionSteps)
                    : update;

                const merged = prev.trackSectionSteps
                    .filter(
                        (trackSectionStep) =>
                            trackSectionStep.track_section_id !== trackSectionId
                    )
                    .concat(value);

                return prev.merge({
                    trackSectionSteps: merged,
                });
            });
        },
        [setCurrentState, trackSectionId]
    );

    return {
        initialState: filterByTrackSectionId(
            trackSectionId,
            initialState.trackSectionSteps
        ),
        setState,
        state: filterByTrackSectionId(trackSectionId, state.trackSectionSteps),
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
