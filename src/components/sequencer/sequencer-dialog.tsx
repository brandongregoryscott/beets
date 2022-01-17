import { Sequencer } from "components/sequencer/sequencer";
import { Dialog, DialogProps } from "components/dialog";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";

interface SequencerDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    files: List<FileRecord>;
    onStepChange: (trackSectionSteps: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const {
        onStepChange,
        onStepCountChange,
        onCloseComplete,
        files,
        trackSectionSteps: initialValue,
        trackSection,
    } = props;
    const [trackSectionSteps, setTrackSectionSteps] =
        useState<List<TrackSectionStepRecord>>(initialValue);
    const [stepCount, setStepCount] = useState<number>(trackSection.step_count);

    const handleStepChange = useCallback(
        (index, trackSectionSteps) =>
            setTrackSectionSteps((prev) =>
                prev
                    .filter(
                        (existingTrackSectionStep) =>
                            existingTrackSectionStep.index !== index
                    )
                    .concat(trackSectionSteps)
            ),
        [setTrackSectionSteps]
    );

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
            title="Sequencer">
            <Sequencer
                files={files}
                onStepChange={handleStepChange}
                onStepCountChange={setStepCount}
                stepCount={stepCount}
                trackSection={trackSection}
                trackSectionSteps={trackSectionSteps}
            />
        </Dialog>
    );
};

export { SequencerDialog };
