import { useEffect } from "react";
import * as Tone from "tone";

const useToneVolumeEffect = (volume?: number): void =>
    useEffect(() => {
        if (volume == null) {
            return;
        }

        Tone.Destination.volume.value = volume;
    }, [volume]);

export { useToneVolumeEffect };
