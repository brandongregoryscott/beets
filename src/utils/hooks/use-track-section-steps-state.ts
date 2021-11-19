import { List } from "immutable";
import { SetStateAction, useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import _ from "lodash";
import { TrackSectionStepRecord } from "models/track-section-step-record";

interface UseTrackSectionStepsStateOptions {
    trackSectionId: string;
}

interface UseTrackSectionStepsStateResult {
    add: (
        trackSectionId: string,
        trackSectionStep?: TrackSectionStepRecord
    ) => void;
    get: (id: string) => TrackSectionStepRecord | undefined;
    initialState: List<TrackSectionStepRecord>;
    remove: (trackSection: TrackSectionStepRecord) => void;
    state: List<TrackSectionStepRecord>;
    setState: (update: SetStateAction<List<TrackSectionStepRecord>>) => void;
    update: (
        id: string,
        update: SetStateAction<TrackSectionStepRecord>
    ) => void;
}

const useTrackSectionStepsState = (
    options: UseTrackSectionStepsStateOptions
): UseTrackSectionStepsStateResult => {
    const { trackSectionId } = options;
    const { state, initialState, setCurrentState } = useWorkstationState();

    const add = useCallback(
        (trackSectionId: string, trackSectionStep?: TrackSectionStepRecord) =>
            setCurrentState((prev) =>
                prev.merge({
                    trackSectionSteps: prev.trackSectionSteps.push(
                        trackSectionStep?.merge({
                            track_section_id: trackSectionId,
                        }) ??
                            new TrackSectionStepRecord({
                                track_section_id: trackSectionId,
                            })
                    ),
                })
            ),
        [setCurrentState]
    );

    const get = useCallback(
        (id: string) =>
            state.trackSectionSteps.find(
                (trackSectionStep) => trackSectionStep.id === id
            ),
        [state.trackSectionSteps]
    );

    const remove = useCallback(
        (trackSection: TrackSectionStepRecord) =>
            setCurrentState((prev) =>
                prev.merge({
                    trackSections: prev.trackSections.filter(
                        (existingTrackSection) =>
                            existingTrackSection.id !== trackSection.id
                    ),
                })
            ),
        [setCurrentState]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackSectionStepRecord>) =>
            setCurrentState((prev) => {
                const index = prev.trackSectionSteps.findIndex(
                    (trackSection) => trackSection.id === id
                );

                if (index < 0) {
                    return prev;
                }

                const value = _.isFunction(update)
                    ? update(prev.trackSectionSteps.get(index)!)
                    : update;

                return prev.merge({
                    trackSectionSteps: prev.trackSectionSteps.set(index, value),
                });
            }),
        [setCurrentState]
    );

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
        add,
        get,
        initialState: filterByTrackSectionId(
            trackSectionId,
            initialState.trackSectionSteps
        ),
        remove,
        setState,
        state: filterByTrackSectionId(trackSectionId, state.trackSectionSteps),
        update,
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
