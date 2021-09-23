import { TrackRecord } from "models/track-record";
import { useCallback, useMemo } from "react";
import { useTracksAtom } from "utils/hooks/use-tracks-atom";

const useTrackAtom = (id: string) => {
    const { findById, removeById, updateById } = useTracksAtom();
    const track = findById(id);

    const remove = useCallback(() => {
        removeById(id);
    }, [id, removeById]);

    const update = useMemo(() => updateById(id), [id, updateById]);

    const setName = useCallback(
        (name: string) => update((prev) => prev.with({ name })),
        [update]
    );

    const toggleMute = useCallback(() => {
        update((prev: TrackRecord) => prev.with({ mute: !prev.mute }));
    }, [update]);

    const toggleSolo = useCallback(() => {
        update((prev: TrackRecord) => prev.with({ solo: !prev.solo }));
    }, [update]);

    return { ...track, remove, update, setName, toggleMute, toggleSolo };
};

export { useTrackAtom };
