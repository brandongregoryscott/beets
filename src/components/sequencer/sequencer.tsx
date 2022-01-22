import { SequencerStep } from "components/sequencer/sequencer-step";
import {
    Button,
    IconButton,
    majorScale,
    Pane,
    PauseIcon,
    PlayIcon,
} from "evergreen-ui";
import _ from "lodash";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { useCallback, useMemo, useState } from "react";
import pluralize from "pluralize";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionRecord } from "models/track-section-record";
import { StepCountSelectMenu } from "components/step-count-select-menu";
import { FileSelectMenu } from "components/file-select-menu";
import {
    Instrument,
    Track,
    Song,
    StepNoteType,
} from "@brandongregoryscott/reactronica";
import { toSequencerMap } from "utils/file-utils";
import { toSequencerStepTypes } from "utils/track-section-step-utils";
import { useBoolean } from "utils/hooks/use-boolean";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { ReactronicaState } from "interfaces/reactronica-state";

interface SequencerProps {
    files: List<FileRecord>;
    onStepChange: (index: number, value: List<TrackSectionStepRecord>) => void;
    onStepCountChange: (stepCount: number) => void;
    stepCount: number;
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
        trackSectionSteps,
        trackSection,
    } = props;
    const [reactronicaState, setReactronicaState] = useState<ReactronicaState>({
        notes: [],
        index: 0,
    });
    const handleStepPlay = useCallback(
        (notes: StepNoteType[], index: number) =>
            setReactronicaState({ notes, index }),
        []
    );
    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();
    const { state: workstationState } = useWorkstationState();
    const { bpm, swing, volume } = workstationState.project;
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

    const samples = useMemo(() => toSequencerMap(files), [files]);
    const steps = useMemo(
        () =>
            toSequencerStepTypes(
                List.of(trackSection),
                trackSectionSteps,
                files
            ),
        [files, trackSection, trackSectionSteps]
    );

    return (
        <Pane>
            <Pane marginBottom={majorScale(1)}>
                <IconButton
                    icon={isPlaying ? PauseIcon : PlayIcon}
                    marginRight={buttonMarginRight}
                    onClick={toggleIsPlaying}
                />
                <FileSelectMenu
                    isMultiSelect={true}
                    onDeselect={handleDeselect}
                    onSelect={handleSelect}
                    selected={selected}
                    title="Current Samples">
                    <Button marginRight={buttonMarginRight}>
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
                        files={files}
                        index={index}
                        isPlaying={
                            isPlaying && reactronicaState.index === index
                        }
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
            <Song
                bpm={bpm}
                isPlaying={isPlaying}
                swing={swing / 100}
                volume={volume}>
                <Track
                    onStepPlay={handleStepPlay}
                    steps={steps}
                    subdivision="8n">
                    <Instrument samples={samples} type="sampler" />
                </Track>
            </Song>
        </Pane>
    );
};

export { Sequencer };
