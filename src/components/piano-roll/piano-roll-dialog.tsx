import { PianoRoll } from "components/piano-roll/piano-roll";
import { Dialog, DialogProps } from "evergreen-ui";
import { List } from "immutable";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";

interface PianoRollDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    onStepChange: (trackSectionSteps: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const PianoRollDialog: React.FC<PianoRollDialogProps> = (
    props: PianoRollDialogProps
) => {
    const {
        onStepChange,
        onStepCountChange,
        onCloseComplete,
        trackSectionSteps: initialValue,
        trackSection,
    } = props;
    const [trackSectionSteps, setTrackSectionSteps] =
        useState<List<TrackSectionStepRecord>>(initialValue);
    console.log("trackSectionSteps", trackSectionSteps);
    const [stepCount, setStepCount] = useState<number>(trackSection.step_count);

    console.log("stepCount", stepCount);
    const handleConfirm = useCallback(() => {
        onStepChange(
            trackSectionSteps.filter(
                (trackSectionStep) => trackSectionStep.index <= stepCount
            )
        );
        onStepCountChange(stepCount);
        onCloseComplete?.();
    }, [
        onCloseComplete,
        onStepChange,
        onStepCountChange,
        stepCount,
        trackSectionSteps,
    ]);

    return (
        <Dialog
            isShown={true}
            onCloseComplete={onCloseComplete}
            onConfirm={handleConfirm}
            title="Piano Roll">
            <PianoRoll
                onChange={setTrackSectionSteps}
                onStepCountChange={setStepCount}
                stepCount={stepCount}
                trackSectionSteps={trackSectionSteps}
                trackSection={trackSection}
            />
        </Dialog>
    );
};

export { PianoRollDialog };
