import { useUpdateAtom } from "jotai/utils";
import { useEffect, useMemo } from "react";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";
import * as Tone from "tone";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

/**
 * Schedules a callback using the Tone.Draw class to sync up the current note index with the UI
 */
const useToneDraw = () => {
    const setCurrentIndex = useUpdateAtom(CurrentIndexAtom);
    const { state: workstationState } = useWorkstationState();
    const totalStepCount = useMemo(
        () => workstationState.getStepCount(),
        [workstationState]
    );

    useEffect(() => {
        Tone.Transport.scheduleRepeat((time: number) => {
            Tone.Draw.schedule(() => {
                if (Tone.Transport.state !== "started") {
                    return;
                }

                setCurrentIndex((prev) => {
                    const updatedIndex = prev + 1;

                    if (updatedIndex === totalStepCount) {
                        return 0;
                    }

                    return updatedIndex;
                });
            }, time);
        }, "8n");
    }, [setCurrentIndex, totalStepCount]);
};

export { useToneDraw };
