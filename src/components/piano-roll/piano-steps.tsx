import { PianoKey } from "components/piano-roll/piano-key";
import { PianoStep } from "components/piano-roll/piano-step";
import { MidiNotes } from "constants/midi-notes";
import { Pane } from "evergreen-ui";
import { List } from "immutable";
import _ from "lodash";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import React, { useCallback, useMemo } from "react";
import { MidiNote } from "reactronica";
import { useTheme } from "utils/hooks/use-theme";
import { isSelected } from "utils/track-section-step-utils";

interface PianoStepsProps {
    onChange: (value: List<TrackSectionStepRecord>) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const PianoSteps: React.FC<PianoStepsProps> = (props: PianoStepsProps) => {
    const { onChange, stepCount, trackSection, trackSectionSteps } = props;
    console.log("PianoSteps stepCount", stepCount);
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
                        index,
                        note,
                        track_section_id: trackSection.id,
                    })
                )
            );
        },
        [onChange, trackSection, trackSectionSteps]
    );
    const innerContent = useMemo(
        () =>
            MidiNotes.map((note) => (
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
        [handleClick, stepCount, theme.colors.gray300, trackSectionSteps]
    );
    return <React.Fragment>{innerContent}</React.Fragment>;
};

export { PianoSteps };
