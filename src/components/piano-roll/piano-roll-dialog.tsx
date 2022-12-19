import { PianoRoll } from "components/piano-roll/piano-roll";
import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import type { List } from "immutable";
import type { FileRecord } from "models/file-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { useCallback, useState } from "react";
import type { InstrumentRecord } from "models/instrument-record";
import type { TrackRecord } from "models/track-record";
import { useBoolean } from "hooks/use-boolean";

interface PianoRollDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    file?: FileRecord;
    instrument?: InstrumentRecord;
    onChange: (trackSectionSteps: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const PianoRollDialog: React.FC<PianoRollDialogProps> = (
    props: PianoRollDialogProps
) => {
    const {
        instrument,
        file,
        onChange,
        onStepCountChange,
        onCloseComplete,
        track,
        trackSectionSteps: initialValue,
        trackSection,
    } = props;
    const { value: isFullscreen, toggle: handleFullscreenClick } = useBoolean();
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
            allowFullscreen={true}
            onCloseComplete={onCloseComplete}
            onConfirm={handleConfirm}
            onFullscreenClick={handleFullscreenClick}
            title="Piano Roll">
            <PianoRoll
                centerControls={isFullscreen}
                file={file}
                instrument={instrument}
                onChange={setTrackSectionSteps}
                onStepCountChange={setStepCount}
                stepCount={stepCount}
                track={track}
                trackSection={trackSection}
                trackSectionSteps={trackSectionSteps}
            />
        </Dialog>
    );
};

export { PianoRollDialog };
