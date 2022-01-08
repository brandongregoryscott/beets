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
    setState: (update: SetStateAction<List<TrackRecord>>) => void;
    state: List<TrackRecord>;
    update: (id: string, update: SetStateAction<TrackRecord>) => void;
}

const useTracksState = (): UseTracksStateResult => {
    const { state, initialState, setCurrentState } = useWorkstationState();

    const add = useCallback(
        (track?: TrackRecord) =>
            setCurrentState((prev) =>
                prev.merge({
                    tracks: prev.tracks.push(
                        track ??
                            new TrackRecord({
                                index: prev.tracks.count(),
                                project_id: state.project.id,
                            })
                    ),
                })
            ),
        [setCurrentState, state.project.id]
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

    const setState = useCallback(
        (update: SetStateAction<List<TrackRecord>>) => {
            setCurrentState((prev) => {
                const value = _.isFunction(update)
                    ? update(prev.tracks)
                    : update;

                return prev.merge({ tracks: value });
            });
        },
        [setCurrentState]
    );

    return {
        add,
        get,
        initialState: initialState.tracks,
        remove,
        state: state.tracks,
        setState,
        update,
    };
};

export { useTracksState };
