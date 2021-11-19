import { Sequencer } from "components/sequencer/sequencer";
import { Dialog } from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";

interface SequencerDialogProps {
    files: List<FileRecord>;
    onClose: () => void;
    onStepChange: (trackSectionSteps: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    trackSectionSteps: List<TrackSectionStepRecord>;
    trackSection: TrackSectionRecord;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const {
        onStepChange,
        onStepCountChange,
        onClose,
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

    const handleConfirm = () => {
        onStepChange(
            trackSectionSteps.filter(
                (trackSectionStep) => trackSectionStep.index <= stepCount
            )
        );
        onStepCountChange(stepCount);
        onClose();
    };

    return (
        <Dialog
            confirmLabel="Save"
            isShown={true}
            onCloseComplete={onClose}
            onConfirm={handleConfirm}
            title="Sequencer">
            <Sequencer
                files={files}
                onStepChange={handleStepChange}
                onStepCountChange={setStepCount}
                steps={trackSectionSteps}
                stepCount={stepCount}
                trackSection={trackSection}
            />
        </Dialog>
    );
};

export { SequencerDialog };
