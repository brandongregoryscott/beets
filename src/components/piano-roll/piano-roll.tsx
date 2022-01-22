import { PianoSteps } from "components/piano-roll/piano-steps";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import { majorScale, Pane } from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useMemo } from "react";
import { toInstrumentMap } from "utils/file-utils";
import { toInstrumentStepTypes } from "utils/track-section-step-utils";
import { Instrument, Track, Song } from "@brandongregoryscott/reactronica";
import { useBoolean } from "utils/hooks/use-boolean";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { PlayButton } from "components/workstation/play-button";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";

interface PianoRollProps {
    file?: FileRecord;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const PianoRoll: React.FC<PianoRollProps> = (props: PianoRollProps) => {
    const {
        file,
        onChange,
        onStepCountChange,
        stepCount,
        trackSection,
        trackSectionSteps,
    } = props;
    const {
        state: reactronicaState,
        onStepPlay,
        onPlayToggle,
    } = useReactronicaState({
        useAtomState: false,
    });
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();
    const { value: isLoading, setFalse: handleLoaded } = useBoolean(true);
    const { state: workstationState } = useWorkstationState();
    const { bpm, swing, volume } = workstationState.project;
    const samples = useMemo(() => toInstrumentMap(file), [file]);
    const steps = useMemo(
        () => toInstrumentStepTypes(List.of(trackSection), trackSectionSteps),
        [trackSection, trackSectionSteps]
    );

    return (
        <React.Fragment>
            <Pane marginBottom={majorScale(1)}>
                <PlayButton
                    isLoading={isLoading}
                    isPlaying={isPlaying}
                    marginRight={majorScale(1)}
                    onClick={onPlayToggle}
                    toggleIsPlaying={toggleIsPlaying}
                />
                <StepCountSelectMenu
                    onChange={onStepCountChange}
                    stepCount={stepCount}
                />
            </Pane>
            <Pane
                display="flex"
                flexDirection="column"
                flexGrow={1}
                width="100%">
                <PianoSteps
                    file={file}
                    isPlaying={isPlaying}
                    onChange={onChange}
                    playingIndex={reactronicaState?.index}
                    stepCount={stepCount}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                />
            </Pane>
            <Song
                bpm={bpm}
                isPlaying={isPlaying}
                swing={swing / 100}
                volume={volume}>
                <Track onStepPlay={onStepPlay} steps={steps} subdivision="8n">
                    <Instrument
                        onLoad={handleLoaded}
                        samples={samples}
                        type="sampler"
                    />
                </Track>
            </Song>
        </React.Fragment>
    );
};

export { PianoRoll };
