import { FileRecord } from "models/file-record";
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

    const addFile = useCallback(
        (file: FileRecord) => update((prev) => prev.addFile(file)),
        [update]
    );

    const setName = useCallback(
        (name: string) => update((prev) => prev.merge({ name })),
        [update]
    );

    const removeFile = useCallback(
        (file: FileRecord) => update((prev) => prev.removeFile(file)),
        [update]
    );

    const toggleMute = useCallback(() => {
        update((prev: TrackRecord) => prev.merge({ mute: !prev.mute }));
    }, [update]);

    const toggleSolo = useCallback(() => {
        update((prev: TrackRecord) => prev.merge({ solo: !prev.solo }));
    }, [update]);

    return {
        ...track!.toPOJO(),
        addFile,
        remove,
        removeFile,
        update,
        setName,
        toggleMute,
        toggleSolo,
    };
};

export { useTrackAtom };
