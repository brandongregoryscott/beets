import { PianoRoll } from "components/piano-roll/piano-roll";
import { Dialog, DialogProps } from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";

interface PianoRollDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    file?: FileRecord;
    onChange: (trackSectionSteps: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const PianoRollDialog: React.FC<PianoRollDialogProps> = (
    props: PianoRollDialogProps
) => {
    const {
        file,
        onChange,
        onStepCountChange,
        onCloseComplete,
        trackSectionSteps: initialValue,
        trackSection,
    } = props;
    const [trackSectionSteps, setTrackSectionSteps] =
        useState<List<TrackSectionStepRecord>>(initialValue);
    const [stepCount, setStepCount] = useState<number>(trackSection.step_count);

    const handleConfirm = useCallback(() => {
        onChange(
            trackSectionSteps.filter(
                (trackSectionStep) => trackSectionStep.index <= stepCount
            )
        );
        onStepCountChange(stepCount);
        onCloseComplete?.();
    }, [
        onChange,
        onCloseComplete,
        onStepCountChange,
        stepCount,
        trackSectionSteps,
    ]);

    return (
        <Dialog
            isShown={true}
            onCloseComplete={onCloseComplete}
            onConfirm={handleConfirm}
            title="Piano Roll"
        >
            <PianoRoll
                file={file}
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
