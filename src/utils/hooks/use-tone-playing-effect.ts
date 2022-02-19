import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import * as Tone from "tone";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";

const useTonePlayingEffect = (isPlaying?: boolean): void => {
    const setCurrentIndex = useUpdateAtom(CurrentIndexAtom);

    useEffect(() => {
        if (isPlaying) {
            Tone.Transport.start();
            return;
        }

        Tone.Transport.stop();
        setCurrentIndex(-1);
    }, [isPlaying, setCurrentIndex]);
};

export { useTonePlayingEffect };
