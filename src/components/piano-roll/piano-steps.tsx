import { PianoKey } from "components/piano-roll/piano-key";
import { PianoStep } from "components/piano-roll/piano-step";
import { MidiNotes } from "constants/midi-notes";
import { Pane } from "evergreen-ui";
import { List } from "immutable";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useCallback, useMemo } from "react";
import { MidiNote } from "types/midi-note";
import { useTheme } from "utils/hooks/use-theme";
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

    const { colors } = useTheme();
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

    const innerContent = useMemo(
        () =>
            notes.map((note) => (
                <Pane
                    backgroundColor={colors.gray300}
                    display="flex"
                    flexDirection="row"
                    flexGrow={1}
                    key={`piano-steps-pane-${note}`}
                    width="min-content">
                    <PianoKey key={`${PianoKey.name}-${note}`} note={note} />
                    {_.range(0, stepCount).map((index: number) => (
                        <PianoStep
                            index={index}
                            isSelected={isSelected(
                                trackSectionSteps,
                                index,
                                note
                            )}
                            key={`${PianoStep.name}-${note}-${index}`}
                            note={note}
                            onClick={handleClick}
                        />
                    ))}
                </Pane>
            )),
        [colors.gray300, handleClick, notes, stepCount, trackSectionSteps]
    );
    return (
        <Pane
            display="flex"
            flexDirection="column"
            justifyContent="center"
            marginX="auto">
            {innerContent}
        </Pane>
    );
};

export { PianoSteps };
