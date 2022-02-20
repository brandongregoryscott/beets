import { useEffect } from "react";
import * as Tone from "tone";

const useToneBpmEffect = (bpm?: number): void =>
    useEffect(() => {
        if (bpm == null) {
            return;
        }

        Tone.Transport.bpm.value = bpm;
    }, [bpm]);

export { useToneBpmEffect };
