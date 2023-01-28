import { useEffect } from "react";
import * as Tone from "tone";

const useTonePlayingEffect = (isPlaying?: boolean): void => {
    useEffect(() => {
        if (isPlaying === true) {
            Tone.Transport.start();
            return;
        }

        Tone.Transport.stop();
    }, [isPlaying]);
};

export { useTonePlayingEffect };
