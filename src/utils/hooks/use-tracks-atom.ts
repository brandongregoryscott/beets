import { Track } from "interfaces/track";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { TracksAtom } from "utils/atoms/tracks-atom";
import { newTrack } from "utils/new-track";

const useTracksAtom = () => {
    const [tracks, setTracks] = useAtom(TracksAtom);

    const add = useCallback(() => {
        setTracks((prev) => [...prev, newTrack()]);
    }, [setTracks]);

    const findById = useCallback(
        (id: string) => tracks.find((track) => track.id === id),
        [tracks]
    );

    const removeById = useCallback(
        (id: string) => {
            setTracks((prev) => prev.filter((track) => track.id !== id));
        },
        [setTracks]
    );

    const updateById = useCallback(
        (id: string) => (updateCallback: (prev: Track) => Track) => {
            const track = findById(id);
            if (track == null) {
                return;
            }

            setTracks((prev: Array<Track>) => {
                const index = prev.findIndex((track) => track.id === id);
                const updatedTracks = prev.filter((track) => track.id !== id);
                updatedTracks.splice(index, 0, updateCallback(track));

                return updatedTracks;
            });
        },
        [findById, setTracks]
    );

    return { add, findById, removeById, setTracks, updateById, tracks };
};

export { useTracksAtom };
