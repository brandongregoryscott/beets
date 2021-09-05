import { useAtom } from "jotai";
import { useCallback } from "react";
import { TracksAtom } from "utils/atoms/tracks-atom";
import { newTrack } from "utils/new-track";

const useTracksAtom = () => {
    const [tracks, setTracks] = useAtom(TracksAtom);

    const add = useCallback(() => {
        setTracks((prev) => [...prev, newTrack()]);
    }, [setTracks]);

    const removeById = useCallback(
        (id: string) => {
            setTracks((prev) => prev.filter((track) => track.id !== id));
        },
        [setTracks]
    );

    return { add, removeById, tracks };
};

export { useTracksAtom };
