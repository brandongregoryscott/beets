import { SequencerStep } from "components/sequencer/sequencer-step";
import { Button, majorScale, Pane } from "evergreen-ui";
import _ from "lodash";
import { List } from "immutable";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { FileRecord } from "models/file-record";
import { useMemo, useState } from "react";
import pluralize from "pluralize";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionRecord } from "models/track-section-record";

interface SequencerProps {
    files: List<FileRecord>;
    onStepCountChange: (stepCount: number) => void;
    onStepChange: (index: number, value: List<TrackSectionStepRecord>) => void;
    stepCount: number;
    steps: List<TrackSectionStepRecord>;
    trackSection: TrackSectionRecord;
}

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const {
        onStepChange,
        onStepCountChange,
        files,
        stepCount,
        steps,
        trackSection,
    } = props;
    const [selectedFiles, setSelectedFiles] = useState<List<FileRecord>>(
        List()
    );
    const sampleOptions: Array<SelectMenuItem<FileRecord>> = useMemo(
        () => FileRecord.toSelectMenuItems(files),
        [files]
    );
    const stepCountOptions: Array<SelectMenuItem<number>> = _.range(1, 65).map(
        (stepCount: number) => ({
            label: `${stepCount} ${pluralize("steps", stepCount)}`,
            id: stepCount.toString(),
            value: stepCount,
        })
    );

    const handleDeselectSample = (item: SelectMenuItem<FileRecord>) =>
        setSelectedFiles((prev) =>
            prev.includes(item.value)
                ? prev.remove(prev.indexOf(item.value))
                : prev
        );

    const handleSelectSample = (item: SelectMenuItem<FileRecord>) =>
        setSelectedFiles((prev) =>
            prev.includes(item.value) ? prev : prev.push(item.value)
        );

    const handleSelectStepCount = (item: SelectMenuItem<number>) =>
        onStepCountChange(item.value);

    return (
        <Pane>
            <Pane marginBottom={majorScale(1)}>
                <SelectMenu
                    isMultiSelect={true}
                    onDeselect={handleDeselectSample}
                    onSelect={handleSelectSample}
                    options={sampleOptions}
                    selected={selectedFiles}
                    title="Current Samples">
                    <Button marginRight={majorScale(1)}>
                        {selectedFiles.count()}{" "}
                        {pluralize("Sample", selectedFiles.count())}
                    </Button>
                </SelectMenu>
                <SelectMenu
                    isMultiSelect={false}
                    hasFilter={false}
                    onSelect={handleSelectStepCount}
                    options={stepCountOptions}
                    selected={stepCount}
                    title="Number of steps">
                    <Button>
                        {stepCount} {pluralize("Step", stepCount)}
                    </Button>
                </SelectMenu>
            </Pane>
            <Pane
                marginX="auto"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                justifyContent="center">
                {_.range(0, stepCount).map((index: number) => (
                    <SequencerStep
                        index={index}
                        files={files}
                        key={index}
                        onChange={onStepChange}
                        selected={selectedFiles}
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
