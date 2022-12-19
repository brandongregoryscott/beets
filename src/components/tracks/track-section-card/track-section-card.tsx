import { ContextualIconButton } from "components/contextual-icon-button";
import { PianoRollDialog } from "components/piano-roll/piano-roll-dialog";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    DeleteIcon,
    DragHandleHorizontalIcon,
    HeatGridIcon,
    majorScale,
    minorScale,
    Pane,
    StepChartIcon,
} from "evergreen-ui";
import type { SetStateAction } from "jotai";
import type { FileRecord } from "models/file-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import { useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { getBorderXProps } from "utils/core-utils";
import { useListFiles } from "hooks/domain/files/use-list-files";
import { useDialog } from "hooks/use-dialog";
import { useTheme } from "hooks/use-theme";
import { useTrackSectionStepsState } from "hooks/use-track-section-steps-state";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import { css, hover, select } from "glamor";
import { useClipboardState } from "hooks/use-clipboard-state";
import type { InstrumentRecord } from "models/instrument-record";
import { TrackSectionStepGrid } from "components/tracks/track-section-card/track-section-step-grid";
import { TrackSectionStepColumnWidth } from "components/tracks/track-section-card/track-section-step-column";
import { useWorkstationState } from "hooks/use-workstation-state";
import { unsoloAll } from "utils/track-utils";

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

const TrackSectionCard: React.FC<TrackSectionCardProps> = (
    props: TrackSectionCardProps
) => {
    const [
        sequencerDialogOpen,
        openSequencerDialog,
        handleCloseSequencerDialog,
    ] = useDialog();

    const [
        pianoRollDialogOpen,
        openPianoRollDialog,
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

    const { state: workstationState, setCurrentState: setWorkstationState } =
        useWorkstationState();
    const stepCount = workstationState.getStepCount();
    const { isSelected, onSelect } = useClipboardState();

    const {
        setState: handleTrackSectionStepsChange,
        state: trackSectionSteps,
    } = useTrackSectionStepsState({ trackSectionId: trackSection.id });
    const { resultObject: files } = useListFiles();
    const theme = useTheme();

    const unsoloTracks = useCallback(() => {
        setWorkstationState((prev) => {
            const { tracks } = prev;
            return prev.merge({ tracks: unsoloAll(tracks) });
        });
    }, [setWorkstationState]);

    const handleOpenSequencerDialog = useCallback(() => {
        unsoloTracks();
        openSequencerDialog();
    }, [openSequencerDialog, unsoloTracks]);

    const handleOpenPianoRollDialog = useCallback(() => {
        unsoloTracks();
        openPianoRollDialog();
    }, [openPianoRollDialog, unsoloTracks]);

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

    const width = trackSection.step_count * TrackSectionStepColumnWidth;

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
                    position="relative"
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
                    <TrackSectionStepGrid
                        stepCount={stepCount}
                        stepCountOffset={stepCountOffset}
                        trackSection={trackSection}
                        trackSectionSteps={trackSectionSteps}
                    />
                    {sequencerDialogOpen && files != null && (
                        <SequencerDialog
                            files={files}
                            onCloseComplete={handleCloseSequencerDialog}
                            onStepChange={handleTrackSectionStepsChange}
                            onStepCountChange={handleStepCountChange}
                            track={track}
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
                            track={track}
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
