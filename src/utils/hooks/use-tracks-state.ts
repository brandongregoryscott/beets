import { TrackRecord } from "models/track-record";
import { List } from "immutable";
import { SetStateAction, useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import _ from "lodash";
import { intersectionWith } from "utils/collection-utils";

interface UseTracksStateResult {
    add: (track?: TrackRecord) => void;
    get: (id: string) => TrackRecord | undefined;
    initialState: List<TrackRecord>;
    remove: (track: TrackRecord) => void;
    state: List<TrackRecord>;
    update: (id: string, update: SetStateAction<TrackRecord>) => void;
}

const useTracksState = (): UseTracksStateResult => {
    const { state, initialState, setCurrentState } = useWorkstationState();

    const add = useCallback(
        (track?: TrackRecord) =>
            setCurrentState((prev) =>
                prev.merge({
                    tracks: prev.tracks.push(track ?? new TrackRecord()),
                })
            ),
        [setCurrentState]
    );

    const get = useCallback(
        (id: string) => state.tracks.find((track) => track.id === id),
        [state.tracks]
    );

    const remove = useCallback(
        (track: TrackRecord) =>
            setCurrentState((prev) => {
                const updatedTracks = prev.tracks.filter(
                    (existingTrack) => existingTrack.id !== track.id
                );
                const updatedTrackSections = prev.trackSections.filter(
                    (trackSections) => trackSections.track_id !== track.id
                );
                const updatedTrackSectionSteps = intersectionWith(
                    prev.trackSectionSteps,
                    updatedTrackSections,
                    (trackSectionStep, trackSection) =>
                        trackSectionStep.track_section_id === trackSection.id
                );
                return prev.merge({
                    tracks: updatedTracks,
                    trackSections: updatedTrackSections,
                    trackSectionSteps: updatedTrackSectionSteps,
                });
            }),
        [setCurrentState]
    );

    const update = useCallback(
        (id: string, update: SetStateAction<TrackRecord>) =>
            setCurrentState((prev) => {
                const index = prev.tracks.findIndex((track) => track.id === id);

                if (index < 0) {
                    return prev;
                }

                const value = _.isFunction(update)
                    ? update(prev.tracks.get(index)!)
                    : update;

                return prev.merge({ tracks: prev.tracks.set(index, value) });
            }),
        [setCurrentState]
    );

    return {
        add,
        get,
        initialState: initialState.tracks,
        remove,
        state: state.tracks,
        update,
    };
};

export { useTracksState };
