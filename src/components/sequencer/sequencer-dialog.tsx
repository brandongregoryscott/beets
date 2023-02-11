import { Sequencer } from "components/sequencer/sequencer";
import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import type { List } from "immutable";
import type { FileRecord } from "models/file-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";
import type { TrackRecord } from "models/track-record";

interface SequencerDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    files: List<FileRecord>;
    onStepChange: (trackSectionSteps: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    track: TrackRecord;
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
        track,
        trackSectionSteps: initialValue,
        trackSection,
    } = props;
    const [trackSectionSteps, setTrackSectionSteps] =
        useState<List<TrackSectionStepRecord>>(initialValue);
    const [stepCount, setStepCount] = useState<number>(trackSection.step_count);

    const handleStepChange = useCallback(
        (index: number, trackSectionSteps: List<TrackSectionStepRecord>) =>
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
            onCloseComplete={onCloseComplete}
            onConfirm={handleConfirm}
            title="Sequencer">
            <Sequencer
                files={files}
                onStepChange={handleStepChange}
                onStepCountChange={setStepCount}
                stepCount={stepCount}
                track={track}
                trackSection={trackSection}
                trackSectionSteps={trackSectionSteps}
            />
        </Dialog>
    );
};

export { SequencerDialog };
