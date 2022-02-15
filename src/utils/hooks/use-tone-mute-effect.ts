import { useEffect } from "react";
import * as Tone from "tone";

const useToneMuteEffect = (mute?: boolean): void =>
    useEffect(() => {
        if (mute == null) {
            return;
        }

        Tone.Destination.mute = mute;
    }, [mute]);

export { useToneMuteEffect };
