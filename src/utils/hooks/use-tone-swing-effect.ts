import { useEffect } from "react";
import * as Tone from "tone";

const useToneSwingEffect = (swing?: number): void =>
    useEffect(() => {
        if (swing == null) {
            return;
        }

        Tone.Transport.swing = swing / 100;
    }, [swing]);

export { useToneSwingEffect };
