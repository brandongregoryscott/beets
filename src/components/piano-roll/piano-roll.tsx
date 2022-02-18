import { PianoSteps } from "components/piano-roll/piano-steps";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import {
    CaretDownIcon,
    CaretUpIcon,
    IconButton,
    majorScale,
    Pane,
} from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useCallback, useMemo, useState } from "react";
import { toInstrumentMap } from "utils/file-utils";
import { toInstrumentStepTypes } from "utils/track-section-step-utils";
import { useBoolean } from "utils/hooks/use-boolean";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { PlayButton } from "components/workstation/play-button";
import { MidiNotes } from "constants/midi-notes";
import { InstrumentRecord } from "models/instrument-record";
import { MidiNoteUtils } from "utils/midi-note-utils";
import { MidiNote } from "types/midi-note";

interface PianoRollProps {
    file?: FileRecord;
    instrument?: InstrumentRecord;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const buttonMarginRight = majorScale(1);
const defaultNoteIndex = MidiNotes.indexOf(MidiNoteUtils.defaultNote);
const indexRange = 12; // Chromatic scale

const PianoRoll: React.FC<PianoRollProps> = (props: PianoRollProps) => {
    const {
        instrument,
        file,
        onChange,
        onStepCountChange,
        stepCount,
        trackSection,
        trackSectionSteps,
    } = props;
    const [viewableIndex, setViewableIndex] = useState<number>(
        instrument?.root_note != null
            ? MidiNotes.indexOf(instrument.root_note as MidiNote)
            : defaultNoteIndex
    );
    // const {
    //     state: reactronicaState,
    //     onStepPlay,
    //     onPlayToggle,
    // } = useReactronicaState({
    //     useAtomState: false,
    // });
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();
    const { value: isLoading, setFalse: handleLoaded } = useBoolean(true);
    const { state: workstationState } = useWorkstationState();
    const { bpm, swing, volume } = workstationState.project;
    const samples = useMemo(() => toInstrumentMap(file), [file]);
    const steps = useMemo(
        () =>
            toInstrumentStepTypes(
                List.of(trackSection),
                trackSectionSteps,
                instrument
            ),
        [instrument, trackSection, trackSectionSteps]
    );

    const handleScaleDown = useCallback(
        () => setViewableIndex((prev) => prev - indexRange),
        [setViewableIndex]
    );
    const handleScaleUp = useCallback(
        () => setViewableIndex((prev) => prev + indexRange),
        [setViewableIndex]
    );

    return (
        <React.Fragment>
            <Pane marginBottom={majorScale(1)}>
                <PlayButton
                    isLoading={isLoading}
                    isPlaying={isPlaying}
                    marginRight={buttonMarginRight}
                    // onClick={onPlayToggle}
                    toggleIsPlaying={toggleIsPlaying}
                />
                <IconButton
                    disabled={viewableIndex - indexRange <= 0}
                    icon={CaretUpIcon}
                    marginRight={buttonMarginRight}
                    onClick={handleScaleDown}
                />
                <IconButton
                    disabled={viewableIndex + indexRange >= MidiNotes.length}
                    icon={CaretDownIcon}
                    marginRight={buttonMarginRight}
                    onClick={handleScaleUp}
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
                    indexRange={indexRange}
                    isPlaying={isPlaying}
                    onChange={onChange}
                    // playingIndex={reactronicaState?.index}
                    stepCount={stepCount}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                    viewableIndex={viewableIndex}
                />
            </Pane>
            {/* <Reactronica.Song
                bpm={bpm}
                isPlaying={isPlaying}
                swing={swing / 100}
                volume={volume}>
                <Reactronica.Track
                    onStepPlay={onStepPlay}
                    solo={true}
                    steps={steps}
                    subdivision="8n">
                    <Reactronica.Instrument
                        onLoad={handleLoaded}
                        samples={samples}
                        type="sampler"
                    />
                </Reactronica.Track>
            </Reactronica.Song> */}
        </React.Fragment>
    );
};

export { PianoRoll };
