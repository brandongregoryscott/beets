import { SequencerStep } from "components/sequencer/sequencer-step";
import { Button, CrossIcon, majorScale, Pane } from "evergreen-ui";
import _ from "lodash";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import pluralize from "pluralize";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionRecord } from "models/track-section-record";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import { FileSelectMenu } from "components/files/file-select-menu";
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { TrackRecord } from "models/track-record";
import { toDataAttributes } from "utils/data-attribute-utils";
import { useSampleSelection } from "utils/hooks/use-sample-selection";
import { IconButton } from "components/icon-button";
import { useMemo } from "react";
import { intersectionWith } from "utils/collection-utils";

interface SequencerProps {
    files: List<FileRecord>;
    onStepChange: (index: number, value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const buttonMarginRight = majorScale(1);

const Sequencer: React.FC<SequencerProps> = (props: SequencerProps) => {
    const {
        onStepChange,
        onStepCountChange,
        files,
        stepCount,
        track,
        trackSectionSteps,
        trackSection,
    } = props;

    const assignedFiles = useMemo(
        () =>
            intersectionWith(
                files,
                trackSectionSteps,
                (file, trackSectionStep) => file.id === trackSectionStep.file_id
            ),
        [files, trackSectionSteps]
    );
    const { selected, onSelect, onDeselect, onClear } = useSampleSelection({
        files,
        track,
    });
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();

    const { isLoading } = useToneAudio({
        isPlaying,
        files,
        tracks: List.of(track),
        trackSections: List.of(trackSection.merge({ step_count: stepCount })),
        trackSectionSteps,
    });

    const sampleButtonText = pluralize("Sample", selected.count(), true);

    return (
        <Pane {...toDataAttributes({ stepCount })}>
            <Pane marginBottom={majorScale(1)}>
                <PlayButton
                    isLoading={isLoading}
                    isPlaying={isPlaying}
                    marginRight={buttonMarginRight}
                    toggleIsPlaying={toggleIsPlaying}
                />
                <FileSelectMenu
                    assigned={assignedFiles}
                    isMultiSelect={true}
                    onDeselect={onDeselect}
                    onSelect={onSelect}
                    selected={selected}
                    title="Current Samples">
                    <Button
                        borderBottomRightRadius={0}
                        borderTopRightRadius={0}>
                        {sampleButtonText}
                    </Button>
                </FileSelectMenu>
                <IconButton
                    borderBottomLeftRadius={0}
                    borderLeft="none"
                    borderTopLeftRadius={0}
                    icon={CrossIcon}
                    marginRight={buttonMarginRight}
                    onClick={onClear}
                />
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
                        files={files}
                        index={index}
                        key={index}
                        onChange={onStepChange}
                        selected={selected}
                        trackSection={trackSection}
                        value={trackSectionSteps.filter(
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
