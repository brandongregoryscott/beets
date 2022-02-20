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
import React, { useCallback, useState } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import { MidiNotes } from "constants/midi-notes";
import { InstrumentRecord } from "models/instrument-record";
import { MidiNoteUtils } from "utils/midi-note-utils";
import { MidiNote } from "types/midi-note";
import { useAtomValue } from "jotai/utils";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";
import { TrackRecord } from "models/track-record";

interface PianoRollProps {
    file?: FileRecord;
    instrument?: InstrumentRecord;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
    track: TrackRecord;
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
        track,
        trackSection,
        trackSectionSteps,
    } = props;
    const [viewableIndex, setViewableIndex] = useState<number>(
        instrument?.root_note != null
            ? MidiNotes.indexOf(instrument.root_note as MidiNote)
            : defaultNoteIndex
    );
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();
    const currentIndex = useAtomValue(CurrentIndexAtom);
    const { isLoading } = useToneAudio({
        isPlaying,
        instruments: instrument != null ? List.of(instrument) : undefined,
        files: file != null ? List.of(file) : undefined,
        tracks: List.of(track),
        trackSections: List.of(trackSection),
        trackSectionSteps,
    });

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
                    playingIndex={currentIndex}
                    stepCount={stepCount}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                    viewableIndex={viewableIndex}
                />
            </Pane>
        </React.Fragment>
    );
};

export { PianoRoll };
