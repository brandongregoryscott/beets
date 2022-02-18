import { ContextualIconButton } from "components/contextual-icon-button";
import { PianoRollDialog } from "components/piano-roll/piano-roll-dialog";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
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
import { useTheme } from "utils/hooks/use-theme";
import { useTrackSectionStepsState } from "utils/hooks/use-track-section-steps-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { getStepColor } from "utils/theme-utils";
import { css, hover, select } from "glamor";
import { useClipboardState } from "utils/hooks/use-clipboard-state";
import { InstrumentRecord } from "models/instrument-record";

interface TrackSectionCardProps {
    file?: FileRecord;
    instrument?: InstrumentRecord;
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

    const {
        instrument,
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
    const { remove } = useTrackSectionsState({
        trackId: trackSection.track_id,
    });

    const { isSelected, onSelect } = useClipboardState();

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

    const width = trackSection.step_count * stepWidth;

    const backgroundColor = isSelected(trackSection)
        ? theme.colors.gray400
        : theme.colors.gray200;

    const contextualButtonClass = css({ visibility: "hidden" }).toString();
    const cardClass = css(
        hover({ cursor: "pointer" }),
        select(`&:hover .${contextualButtonClass}`, { visibility: "visible" })
    ).toString();

    return (
        <Draggable draggableId={trackSection.id} index={trackSection.index}>
            {(provided) => (
                <Pane
                    {...borderProps}
                    {...provided.draggableProps}
                    backgroundColor={backgroundColor}
                    className={cardClass}
                    display="flex"
                    flexDirection="row"
                    height={majorScale(10)}
                    onClick={onSelect(trackSection)}
                    paddingLeft={isFirst ? majorScale(1) : undefined}
                    paddingRight={isLast ? majorScale(1) : undefined}
                    paddingY={majorScale(1)}
                    ref={provided.innerRef}>
                    <Pane
                        display="flex"
                        flexDirection="row"
                        justifyContent="flex-end"
                        marginTop={-majorScale(1)}
                        minWidth={width}
                        position="absolute"
                        width={width}>
                        <ContextualIconButton
                            backgroundColor={backgroundColor}
                            className={contextualButtonClass}
                            icon={DeleteIcon}
                            id={trackSection.id}
                            intent="danger"
                            isLastCard={isLast}
                            onClick={handleRemove}
                            tooltipText="Remove section"
                        />
                        {track.isSequencer() && (
                            <ContextualIconButton
                                backgroundColor={backgroundColor}
                                className={contextualButtonClass}
                                icon={HeatGridIcon}
                                id={trackSection.id}
                                isLastCard={isLast}
                                onClick={handleOpenSequencerDialog}
                                tooltipText="Sequencer"
                            />
                        )}
                        {!track.isSequencer() && (
                            <ContextualIconButton
                                backgroundColor={backgroundColor}
                                className={contextualButtonClass}
                                icon={StepChartIcon}
                                id={trackSection.id}
                                isLastCard={isLast}
                                onClick={handleOpenPianoRollDialog}
                                tooltipText="Piano Roll"
                            />
                        )}
                        <ContextualIconButton
                            backgroundColor={backgroundColor}
                            className={contextualButtonClass}
                            dragHandleProps={provided.dragHandleProps}
                            icon={DragHandleHorizontalIcon}
                            id={trackSection.id}
                            isCornerButton={true}
                            isLastCard={isLast}
                            marginRight={isLast ? -majorScale(1) : undefined}
                            tooltipText="Move section"
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

                                const isPlaying = false;
                                // const isPlaying =
                                //     index + stepCountOffset ===
                                //     reactronicaState?.index;

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
                            instrument={instrument}
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
