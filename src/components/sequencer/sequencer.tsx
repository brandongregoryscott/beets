import { SequencerStep } from "components/sequencer/sequencer-step";
import { Button, majorScale, Pane } from "evergreen-ui";
import _ from "lodash";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { useCallback, useState } from "react";
import pluralize from "pluralize";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionRecord } from "models/track-section-record";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import { FileSelectMenu } from "components/file-select-menu";

interface SequencerProps {
    files: List<FileRecord>;
    onStepChange: (index: number, value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const {
        onStepChange,
        onStepCountChange,
        files,
        stepCount,
        trackSectionSteps: steps,
        trackSection,
    } = props;
    const [selected, setSelected] = useState<List<FileRecord>>(List());

    const handleDeselect = useCallback(
        (file: FileRecord) =>
            setSelected((prev) =>
                prev.includes(file) ? prev.remove(prev.indexOf(file)) : prev
            ),
        [setSelected]
    );

    const handleSelect = useCallback(
        (file: FileRecord) =>
            setSelected((prev) =>
                prev.includes(file) ? prev : prev.push(file)
            ),
        [setSelected]
    );

    return (
        <Pane>
            <Pane marginBottom={majorScale(1)}>
                <FileSelectMenu
                    isMultiSelect={true}
                    onDeselect={handleDeselect}
                    onSelect={handleSelect}
                    selected={selected}
                    title="Current Samples">
                    <Button marginRight={majorScale(1)}>
                        {selected.count()}{" "}
                        {pluralize("Sample", selected.count())}
                    </Button>
                </FileSelectMenu>
                <StepCountSelectMenu
                    onChange={onStepCountChange}
                    stepCount={stepCount}
                />
            </Pane>
            <Pane
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center"
                marginX="auto">
                {_.range(0, stepCount).map((index: number) => (
                    <SequencerStep
                        index={index}
                        files={files}
                        key={index}
                        onChange={onStepChange}
                        selected={selected}
                        trackSection={trackSection}
                        value={steps.filter(
                            (trackSectionStep) =>
                                trackSectionStep.index === index
                        )}
                    />
                ))}
            </Pane>
        </Pane>
    );
};

export { Sequencer };
