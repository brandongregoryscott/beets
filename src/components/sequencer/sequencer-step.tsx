import { SequencerStepRow } from "components/sequencer/sequencer-step-row";
import { ConditionalTooltip } from "components/conditional-tooltip";
import { Card, majorScale } from "evergreen-ui";
import type { List } from "immutable";
import type { FileRecord } from "models/file-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import type { TrackSectionRecord } from "models/track-section-record";
import { useCallback } from "react";

interface SequencerStepProps {
    files: List<FileRecord>;
    index: number;
    onChange: (index: number, steps: List<TrackSectionStepRecord>) => void;
    selected: List<FileRecord>;
    trackSection: TrackSectionRecord;
    value: List<TrackSectionStepRecord>;
}

const maxCount = 4;

const SequencerStep: React.FC<SequencerStepProps> = (
    props: SequencerStepProps
) => {
    const { index, files, onChange, selected, trackSection, value } = props;
    const hasSamples = !selected.isEmpty();
    const handleAdd = useCallback(() => {
        if (
            value.count() >= maxCount ||
            value.count() + selected.count() > maxCount
        ) {
            return;
        }

        const newSteps = selected
            .map(
                (file) =>
                    new TrackSectionStepRecord({
                        file_id: file.id,
                        index,
                        track_section_id: trackSection.id,
                    })
            )
            .filter(
                (step) =>
                    !value.some(
                        (existingStep) => existingStep.file_id === step.file_id
                    )
            );

        onChange(index, value.concat(newSteps));
    }, [index, onChange, selected, trackSection.id, value]);

    const handleRemove = useCallback(
        (step: TrackSectionStepRecord) => {
            if (!value.includes(step)) {
                return;
            }

            onChange(index, value.remove(value.indexOf(step)));
        },
        [index, onChange, value]
    );

    const isContentEmpty = !hasSamples && value.isEmpty();

    return (
        <ConditionalTooltip
            content="Select one or more samples to drop in"
            isShown={isContentEmpty}>
            <Card
                border={true}
                cursor={hasSamples ? "pointer" : "not-allowed"}
                data-index={index}
                height={majorScale(12)}
                hoverElevation={1}
                margin={majorScale(1)}
                onClick={handleAdd}
                width={majorScale(12)}>
                {value.map((step) => (
                    <SequencerStepRow
                        file={files.find((file) => file.id === step.file_id)!}
                        key={step.id}
                        onClick={handleRemove}
                        trackSectionStep={step}
                        trackSectionSteps={value}
                    />
                ))}
            </Card>
        </ConditionalTooltip>
    );
};

export { SequencerStep };
