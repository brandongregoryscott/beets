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
import { useBoolean } from "utils/hooks/use-boolean";
import { PlayButton } from "components/workstation/play-button";
import { useToneAudio } from "utils/hooks/use-tone-audio";
import { TrackRecord } from "models/track-record";
import { useAtomValue } from "jotai/utils";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";

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

    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();
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

    const currentIndex = useAtomValue(CurrentIndexAtom);
    const { isLoading } = useToneAudio({
        isPlaying,
        files,
        tracks: List.of(track),
        trackSections: List.of(trackSection),
        trackSectionSteps,
    });

    const sampleButtonText = `${selected.count()} ${pluralize(
        "Sample",
        selected.count()
    )}`;

    return (
        <Pane>
            <Pane marginBottom={majorScale(1)}>
                <PlayButton
                    isLoading={isLoading}
                    isPlaying={isPlaying}
                    marginRight={buttonMarginRight}
                    toggleIsPlaying={toggleIsPlaying}
                />
                <FileSelectMenu
                    isMultiSelect={true}
                    onDeselect={handleDeselect}
                    onSelect={handleSelect}
                    selected={selected}
                    title="Current Samples">
                    <Button marginRight={buttonMarginRight}>
                        {sampleButtonText}
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
                        files={files}
                        index={index}
                        isPlaying={isPlaying && currentIndex === index}
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
