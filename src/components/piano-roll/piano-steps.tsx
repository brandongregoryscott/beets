import { PianoKey } from "components/piano-roll/piano-key";
import { PianoStep } from "components/piano-roll/piano-step";
import { MidiNotes } from "constants/midi-notes";
import {
    Pane,
    IconButton,
    CaretUpIcon,
    CaretDownIcon,
    majorScale,
} from "evergreen-ui";
import { List } from "immutable";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useCallback, useMemo, useState } from "react";
import { MidiNote } from "@brandongregoryscott/reactronica";
import { useTheme } from "utils/hooks/use-theme";
import { isSelected } from "utils/track-section-step-utils";

interface PianoStepsProps {
    file?: FileRecord;
    isPlaying: boolean;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    playingIndex?: number;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const defaultNoteIndex = MidiNotes.indexOf("C5");
const indexRange = 12; // Chromatic scale

const PianoSteps: React.FC<PianoStepsProps> = (props: PianoStepsProps) => {
    const {
        file,
        isPlaying,
        playingIndex,
        onChange,
        stepCount,
        trackSection,
        trackSectionSteps,
    } = props;
    const [viewableIndex, setViewableIndex] =
        useState<number>(defaultNoteIndex);
    const handleScaleDown = useCallback(
        () => setViewableIndex((prev) => prev - indexRange),
        [setViewableIndex]
    );
    const handleScaleUp = useCallback(
        () => setViewableIndex((prev) => prev + indexRange),
        [setViewableIndex]
    );

    const theme = useTheme();
    const handleClick = useCallback(
        (index: number, note: MidiNote) => {
            if (isSelected(trackSectionSteps, index, note)) {
                onChange(
                    trackSectionSteps.filterNot(
                        (trackSectionStep) =>
                            trackSectionStep.index === index &&
                            trackSectionStep.note === note
                    )
                );

                return;
            }

            onChange(
                trackSectionSteps.push(
                    new TrackSectionStepRecord({
                        file_id: file?.id,
                        index,
                        note,
                        track_section_id: trackSection.id,
                    })
                )
            );
        },
        [file, onChange, trackSection, trackSectionSteps]
    );
    const innerContent = useMemo(
        () =>
            MidiNotes.slice(
                Math.max(viewableIndex, 0),
                viewableIndex + indexRange
            ).map((note, rowIndex) => (
                <Pane
                    backgroundColor={theme.colors.gray300}
                    display="flex"
                    flexDirection="row"
                    flexGrow={1}
                    key={`piano-steps-pane-${note}`}
                    width="min-content">
                    <PianoKey key={`piano-steps-key-${note}`} note={note} />
                    {_.range(0, stepCount).map((index: number) => (
                        <PianoStep
                            index={index}
                            isFirst={rowIndex === 0}
                            isLast={rowIndex === indexRange - 1}
                            isPlaying={isPlaying && index === playingIndex}
                            isSelected={isSelected(
                                trackSectionSteps,
                                index,
                                note
                            )}
                            key={`piano-steps-step-${note}-${index}`}
                            note={note}
                            onClick={handleClick}
                        />
                    ))}
                </Pane>
            )),
        [
            handleClick,
            isPlaying,
            playingIndex,
            stepCount,
            theme.colors.gray300,
            trackSectionSteps,
            viewableIndex,
        ]
    );
    return (
        <React.Fragment>
            <IconButton
                icon={CaretUpIcon}
                onClick={handleScaleDown}
                width={majorScale(6)}
            />
            {innerContent}
            <IconButton
                icon={CaretDownIcon}
                onClick={handleScaleUp}
                width={majorScale(6)}
            />
        </React.Fragment>
    );
};

export { PianoSteps };
