import { PianoRollDialog } from "components/piano-roll/piano-roll-dialog";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    DeleteIcon,
    Elevation,
    HeatGridIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    StepChartIcon,
    Tooltip,
} from "evergreen-ui";
import { List } from "immutable";
import { SetStateAction } from "jotai";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback } from "react";
import { getBorderXProps } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useDialog } from "utils/hooks/use-dialog";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionStepsState } from "utils/hooks/use-track-section-steps-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { getStepColor } from "utils/theme-utils";

interface TrackSectionCardProps {
    file?: FileRecord;
    isFirst?: boolean;
    isLast?: boolean;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
    stepCountOffset: number;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
}

const iconMarginRight = majorScale(8);
const stepHeight = majorScale(2);
const stepWidth = majorScale(2);

const TrackSectionCard: React.FC<TrackSectionCardProps> = (
    props: TrackSectionCardProps
) => {
    const [
        sequencerDialogOpen,
        handleOpenSequencerDialog,
        handleCloseSequencerDialog,
    ] = useDialog();

    const [
        pianoRollDialogOpen,
        handleOpenPianoRollDialog,
        handleClosePianoRollDialog,
    ] = useDialog();

    const {
        file,
        isFirst = false,
        isLast = false,
        onChange,
        stepCountOffset,
        track,
        trackSection,
    } = props;
    const borderProps = getBorderXProps({
        isFirst,
        isLast,
        borderRadius: minorScale(1),
    });
    const { state: reactronicaState } = useReactronicaState();
    const { remove } = useTrackSectionsState({
        trackId: trackSection.track_id,
    });

    const {
        setState: handleTrackSectionStepsChange,
        state: trackSectionSteps,
    } = useTrackSectionStepsState({ trackSectionId: trackSection.id });
    const { resultObject: files } = useListFiles();
    const theme = useTheme();

    const groupedTrackSectionSteps = trackSectionSteps.groupBy((e) => e.index);

    const handleRemove = useCallback(
        () => remove(trackSection),
        [remove, trackSection]
    );

    const handleStepCountChange = useCallback(
        (stepCount: number) => {
            onChange(trackSection.id, (prev) =>
                prev.merge({ step_count: stepCount })
            );
        },
        [onChange, trackSection.id]
    );

    return (
        <Pane
            {...borderProps}
            backgroundColor={theme.colors.gray200}
            borderRight={!isLast}
            borderRightColor={theme.colors.gray700}
            borderRightWidth={1}
            display="flex"
            flexDirection="row"
            height={majorScale(10)}
            padding={majorScale(1)}>
            <Pane
                display="flex"
                flexDirection="column"
                maxWidth={majorScale(5)}>
                {track.isSequencer() ? (
                    <Tooltip content="Sequencer">
                        <IconButton
                            icon={HeatGridIcon}
                            marginRight={iconMarginRight}
                            onClick={handleOpenSequencerDialog}
                        />
                    </Tooltip>
                ) : (
                    <Tooltip content="Piano Roll">
                        <IconButton
                            icon={StepChartIcon}
                            marginRight={iconMarginRight}
                            onClick={handleOpenPianoRollDialog}
                        />
                    </Tooltip>
                )}
                <Tooltip content="Remove section">
                    <IconButton
                        icon={DeleteIcon}
                        intent="danger"
                        marginRight={iconMarginRight}
                        onClick={handleRemove}
                    />
                </Tooltip>
            </Pane>
            <Pane display="flex" flexDirection="row">
                {_.range(0, trackSection.step_count).map((index: number) => {
                    const steps =
                        groupedTrackSectionSteps.get(index)?.toList() ?? List();
                    const stepsSortedByFileId = List(
                        _.sortBy(steps.toArray(), "file_id")
                    );

                    const isPlaying =
                        index + stepCountOffset === reactronicaState?.index;

                    const activeProps = isPlaying
                        ? {
                              elevation: 4 as Elevation,
                              transform: "translateY(-2px)",
                          }
                        : {};

                    return (
                        <Pane
                            {...activeProps}
                            display="flex"
                            flexDirection="column"
                            key={`track-section-${trackSection.id}-column-${index}`}
                            minHeight={stepHeight}
                            minWidth={stepWidth}
                            width={stepWidth}>
                            {_.range(0, 4).map((row: number) => {
                                const backgroundColor = getStepColor(
                                    stepsSortedByFileId.get(row)?.file_id,
                                    theme
                                );
                                return (
                                    <Pane
                                        backgroundColor={backgroundColor}
                                        height={stepHeight}
                                        key={`track-section-${trackSection.id}-row-${row}`}
                                        minHeight={stepHeight}
                                        minWidth={stepWidth}
                                        width={stepWidth}
                                    />
                                );
                            })}
                        </Pane>
                    );
                })}
            </Pane>
            {sequencerDialogOpen && files != null && (
                <SequencerDialog
                    files={files}
                    onCloseComplete={handleCloseSequencerDialog}
                    onStepChange={handleTrackSectionStepsChange}
                    onStepCountChange={handleStepCountChange}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                />
            )}
            {pianoRollDialogOpen && (
                <PianoRollDialog
                    file={file}
                    onChange={handleTrackSectionStepsChange}
                    onCloseComplete={handleClosePianoRollDialog}
                    onStepCountChange={handleStepCountChange}
                    trackSection={trackSection}
                    trackSectionSteps={trackSectionSteps}
                />
            )}
        </Pane>
    );
};

export { TrackSectionCard };
