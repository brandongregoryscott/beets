import { useResetAtom } from "jotai/utils";
import { useEffect } from "react";
import * as Tone from "tone";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";

const useTonePlayingEffect = (isPlaying?: boolean): void => {
    const resetCurrentIndex = useResetAtom(CurrentIndexAtom);

    useEffect(() => {
        if (isPlaying) {
            Tone.Transport.start();
            return;
        }

        Tone.Transport.stop();
        resetCurrentIndex();
    }, [isPlaying, resetCurrentIndex]);
};

export { useTonePlayingEffect };
