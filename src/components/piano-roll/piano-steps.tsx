import { Flex } from "components/flex";
import { PianoKey } from "components/piano-roll/piano-key";
import { PianoRollRow } from "components/piano-roll/piano-roll-row";
import { PianoStep } from "components/piano-roll/piano-step";
import { MidiNotes } from "constants/midi-notes";
import type { List } from "immutable";
import { range } from "lodash";
import type { FileRecord } from "models/file-record";
import type { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useCallback, useMemo } from "react";
import type { MidiNote } from "types/midi-note";
import { isSelected } from "utils/track-section-step-utils";

interface PianoStepsProps {
    file?: FileRecord;
    indexRange: number;
    onChange: (value: List<TrackSectionStepRecord>) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
    viewableIndex: number;
}

const PianoSteps: React.FC<PianoStepsProps> = (props: PianoStepsProps) => {
    const {
        viewableIndex,
        indexRange,
        file,
        onChange,
        stepCount,
        trackSection,
        trackSectionSteps,
    } = props;

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

    const notes = useMemo(
        () =>
            MidiNotes.slice(
                Math.max(viewableIndex, 0),
                viewableIndex + indexRange
            ),
        [indexRange, viewableIndex]
    );

    return (
        <Flex.Column justifyContent="center" marginX="auto">
            <PianoRollRow>
                {range(0, stepCount + 1).map((index: number) => (
                    <PianoKey
                        key={index}
                        noteOrIndex={index === 0 ? undefined : index}
                    />
                ))}
            </PianoRollRow>
            {notes.map((note) => (
                <PianoRollRow key={`${PianoRollRow.name}${note}`}>
                    <PianoKey noteOrIndex={note} />
                    {range(0, stepCount).map((index: number) => (
                        <PianoStep
                            index={index}
                            isSelected={isSelected(
                                trackSectionSteps,
                                index,
                                note
                            )}
                            key={`${PianoStep.name}${index}${note}`}
                            note={note}
                            onClick={handleClick}
                        />
                    ))}
                </PianoRollRow>
            ))}
        </Flex.Column>
    );
};

export { PianoSteps };
