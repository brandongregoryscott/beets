import { useCallback } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

const useTrackState = (id: string) => {
    const { getTrack, removeTrack, updateTrack } = useWorkstationState();
    const track = getTrack(id)!;

    const remove = useCallback(() => removeTrack(track), [removeTrack, track]);

    const setName = useCallback(
        (name: string) => updateTrack(track.merge({ name })),
        [track, updateTrack]
    );

    const toggleMute = useCallback(
        () => updateTrack(track.merge({ mute: !track.mute })),
        [track, updateTrack]
    );

    const toggleSolo = useCallback(
        () => updateTrack(track.merge({ solo: !track.solo })),
        [track, updateTrack]
    );

    return {
        ...track.toPOJO(),
        remove,
        setName,
        toggleMute,
        toggleSolo,
    };
};

export { useTrackState };
