import { PianoRollDialog } from "components/piano-roll/piano-roll-dialog";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import { TrackSectionCardButton } from "components/tracks/track-section-card-button";
import {
    DeleteIcon,
    DragHandleHorizontalIcon,
    Elevation,
    HeatGridIcon,
    majorScale,
    minorScale,
    Pane,
    StepChartIcon,
} from "evergreen-ui";
import { List } from "immutable";
import { SetStateAction } from "jotai";
import _ from "lodash";
import { FileRecord } from "models/file-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { sortBy } from "utils/collection-utils";
import { getBorderXProps } from "utils/core-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useDialog } from "utils/hooks/use-dialog";
import { useIsHovering } from "utils/hooks/use-is-hovering";
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

    const { isHovering, onMouseEnter, onMouseLeave } = useIsHovering();

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

    const handleButtonClick = useCallback(
        (callback: () => void) => () => {
            callback();
            onMouseLeave();
        },
        [onMouseLeave]
    );

    const width = trackSection.step_count * stepWidth;

    return (
        <Draggable draggableId={trackSection.id} index={trackSection.index}>
            {(provided) => (
                <Pane
                    {...borderProps}
                    {...provided.draggableProps}
                    backgroundColor={theme.colors.gray200}
                    borderRight={!isLast}
                    borderRightColor={theme.colors.gray300}
                    borderRightWidth={1}
                    display="flex"
                    flexDirection="row"
                    height={majorScale(10)}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    padding={majorScale(1)}
                    ref={provided.innerRef}
                    width={width}>
                    <Pane
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        marginTop={-majorScale(1)}
                        minWidth={width}
                        position="absolute"
                        width={width}>
                        <TrackSectionCardButton
                            icon={DeleteIcon}
                            intent="danger"
                            isHovering={isHovering}
                            isLastCard={isLast}
                            onClick={handleButtonClick(handleRemove)}
                            tooltipText="Remove section"
                            trackSectionId={trackSection.id}
                        />
                        {track.isSequencer() && (
                            <TrackSectionCardButton
                                icon={HeatGridIcon}
                                isHovering={isHovering}
                                isLastCard={isLast}
                                onClick={handleButtonClick(
                                    handleOpenSequencerDialog
                                )}
                                tooltipText="Sequencer"
                                trackSectionId={trackSection.id}
                            />
                        )}
                        {!track.isSequencer() && (
                            <TrackSectionCardButton
                                icon={StepChartIcon}
                                isHovering={isHovering}
                                isLastCard={isLast}
                                onClick={handleButtonClick(
                                    handleOpenPianoRollDialog
                                )}
                                tooltipText="Piano Roll"
                                trackSectionId={trackSection.id}
                            />
                        )}
                        <TrackSectionCardButton
                            dragHandleProps={provided.dragHandleProps}
                            icon={DragHandleHorizontalIcon}
                            isCornerButton={true}
                            isHovering={isHovering}
                            isLastCard={isLast}
                            tooltipText="Move section"
                            trackSectionId={trackSection.id}
                        />
                    </Pane>
                    <Pane display="flex" flexDirection="row">
                        {_.range(0, trackSection.step_count).map(
                            (index: number) => {
                                const steps =
                                    groupedTrackSectionSteps
                                        .get(index)
                                        ?.toList() ?? List();
                                const stepsSortedByFileId = sortBy(
                                    steps,
                                    (trackSectionStep) =>
                                        trackSectionStep.file_id
                                );

                                const isPlaying =
                                    index + stepCountOffset ===
                                    reactronicaState?.index;

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
                                            const backgroundColor =
                                                getStepColor(
                                                    stepsSortedByFileId.get(row)
                                                        ?.file_id
                                                );
                                            return (
                                                <Pane
                                                    backgroundColor={
                                                        backgroundColor
                                                    }
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
                            }
                        )}
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
            )}
        </Draggable>
    );
};

export { TrackSectionCard };
