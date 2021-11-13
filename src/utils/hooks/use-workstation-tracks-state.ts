import { TrackRecord } from "models/track-record";
import { List } from "immutable";
import { SetStateAction, useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import _ from "lodash";

interface UseWorkstationTracksStateResult {
    add: (track?: TrackRecord) => void;
    get: (id: string) => TrackRecord | undefined;
    initialState: List<TrackRecord>;
    remove: (track: TrackRecord) => void;
    state: List<TrackRecord>;
    update: (id: string, update: SetStateAction<TrackRecord>) => void;
}

const useWorkstationTracksState = (): UseWorkstationTracksStateResult => {
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
            setCurrentState((prev) =>
                prev.merge({
                    tracks: prev.tracks.filter(
                        (existingTrack) => existingTrack.id !== track.id
                    ),
                })
            ),
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

export { useWorkstationTracksState };