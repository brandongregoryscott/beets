import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";
import * as Tone from "tone";

/**
 * Schedules a callback using the Tone.Draw class to sync up the current note index with the UI
 */
const useToneDraw = () => {
    const setCurrentIndex = useUpdateAtom(CurrentIndexAtom);
    useEffect(() => {
        Tone.Transport.scheduleRepeat((time: number) => {
            Tone.Draw.schedule(() => {
                if (Tone.Transport.state !== "started") {
                    return;
                }

                setCurrentIndex((prev) => prev + 1);
            }, time);
        }, "8n");
    }, [setCurrentIndex]);
};

export { useToneDraw };
