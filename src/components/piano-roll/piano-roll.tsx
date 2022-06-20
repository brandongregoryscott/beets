import { PianoSteps } from "components/piano-roll/piano-steps";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import {
    CaretDownIcon,
    CaretUpIcon,
    IconButton,
    majorScale,
    Pane,
    RandomIcon,
} from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useCallback, useState } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import { defaultNote, MidiNotes } from "constants/midi-notes";
import { InstrumentRecord } from "models/instrument-record";
import { MidiNote } from "types/midi-note";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { TrackRecord } from "models/track-record";
import { toDataAttributes } from "utils/data-attribute-utils";
import { Flex } from "components/flex";
import { PianoRollRandomizerPopover } from "components/piano-roll/piano-roll-randomizer-popover";
import { usePianoRollRandomizerSettings } from "utils/hooks/use-piano-roll-randomizer-settings";
import { isNotNilOrEmpty } from "utils/core-utils";
import { getScaleByNotes } from "utils/scale-utils";

interface PianoRollProps {
    centerControls?: boolean;
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
const defaultNoteIndex = MidiNotes.indexOf(defaultNote);
const indexRange = 12; // Chromatic scale

const PianoRoll: React.FC<PianoRollProps> = (props: PianoRollProps) => {
    const {
        instrument,
        file,
        centerControls = false,
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
    const { isLoading } = useToneAudio({
        isPlaying,
        instruments: instrument != null ? List.of(instrument) : undefined,
        files: file != null ? List.of(file) : undefined,
        tracks: List.of(track),
        trackSections: List.of(trackSection.merge({ step_count: stepCount })),
        trackSectionSteps,
    });

    const { settings, setSettings } = usePianoRollRandomizerSettings({ track });
    const handleScaleDown = useCallback(
        () => setViewableIndex((prev) => prev - indexRange),
        [setViewableIndex]
    );
    const handleScaleUp = useCallback(
        () => setViewableIndex((prev) => prev + indexRange),
        [setViewableIndex]
    );

    return (
        <Pane {...toDataAttributes({ stepCount })}>
            <Flex.Row
                justifyContent={centerControls ? "center" : undefined}
                marginBottom={majorScale(1)}>
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
                    marginRight={buttonMarginRight}
                    onChange={onStepCountChange}
                    stepCount={stepCount}
                />
                <PianoRollRandomizerPopover
                    file={file}
                    marginRight={buttonMarginRight}
                    onChange={onChange}
                    onSettingsChange={setSettings}
                    settings={settings}
                    stepCount={stepCount}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                />
            </Flex.Row>
            <Flex.Column flexGrow={1} width="100%">
                <PianoSteps
                    file={file}
                    indexRange={indexRange}
                    onChange={onChange}
                    stepCount={stepCount}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                    viewableIndex={viewableIndex}
                />
            </Flex.Column>
        </Pane>
    );
};

export { PianoRoll };
