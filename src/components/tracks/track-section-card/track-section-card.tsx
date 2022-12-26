import { ContextualIconButton } from "components/contextual-icon-button";
import { PianoRollDialog } from "components/piano-roll/piano-roll-dialog";
import { SequencerDialog } from "components/sequencer/sequencer-dialog";
import {
    AddIcon,
    DeleteIcon,
    DragHandleHorizontalIcon,
    HeatGridIcon,
    InsertIcon,
    majorScale,
    minorScale,
    Pane,
    PlusIcon,
    StepChartIcon,
} from "evergreen-ui";
import type { SetStateAction } from "jotai";
import type { FileRecord } from "models/file-record";
import type { TrackRecord } from "models/track-record";
import type { TrackSectionRecord } from "models/track-section-record";
import type { Dispatch } from "react";
import { memo, useCallback } from "react";
import { useListFiles } from "hooks/domain/files/use-list-files";
import { useDialog } from "hooks/use-dialog";
import { useTheme } from "hooks/use-theme";
import { useTrackSectionStepsState } from "hooks/use-track-section-steps-state";
import { useTrackSectionsState } from "hooks/use-track-sections-state";
import { useClipboardState } from "hooks/use-clipboard-state";
import type { InstrumentRecord } from "models/instrument-record";
import { TrackSectionStepGrid } from "components/tracks/track-section-card/track-section-step-grid";
import { TrackSectionStepColumnWidth } from "components/tracks/track-section-card/track-section-step-column";
import { useWorkstationState } from "hooks/use-workstation-state";
import { unsoloAll } from "utils/track-utils";
import type { SelectorMap } from "ui-box";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { getBorderXProps } from "utils/core-utils";
import { useBoolean } from "hooks/use-boolean";
import { useDebounce } from "rooks";
import { Flex } from "components/flex";

interface TrackSectionCardProps {
    dragHandleProps: DraggableProvidedDragHandleProps | undefined;
    file?: FileRecord;
    instrument?: InstrumentRecord;
    isFirst?: boolean;
    isLast?: boolean;
    onChange: (id: string, update: SetStateAction<TrackSectionRecord>) => void;
    setIsDragDisabled?: Dispatch<SetStateAction<boolean>>;
    stepCountOffset: number;
    track: TrackRecord;
    trackSection: TrackSectionRecord;
}

const selectors: SelectorMap = {
    "&:hover": {
        cursor: "pointer",
    },
};

const TrackSectionCard: React.FC<TrackSectionCardProps> = memo(
    (props: TrackSectionCardProps) => {
        const {
            dragHandleProps,
            instrument,
            file,
            isFirst = false,
            isLast = false,
            onChange,
            setIsDragDisabled,
            stepCountOffset,
            track,
            trackSection,
        } = props;

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

        const { value: isHovered, setValue: setIsHovered } = useBoolean();
        const handleMouseOver = useDebounce(() => setIsHovered(true), 25);
        const handleMouseOut = useDebounce(() => setIsHovered(false), 25);

        const borderProps = getBorderXProps({
            isFirst,
            isLast,
            borderRadius: minorScale(1),
        });

        const { remove, insert } = useTrackSectionsState({
            trackId: trackSection.track_id,
        });

        const {
            state: workstationState,
            setCurrentState: setWorkstationState,
        } = useWorkstationState();
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

        const handleAdd = useCallback(() => {
            insert(trackSection.index + 1);
        }, [insert, trackSection.index]);

        const width = trackSection.step_count * TrackSectionStepColumnWidth;

        const backgroundColor = isSelected(trackSection)
            ? theme.colors.gray400
            : theme.colors.gray200;

        return (
            <Pane
                {...borderProps}
                {...dragHandleProps}
                backgroundColor={backgroundColor}
                display="flex"
                flexDirection="row"
                height={majorScale(10)}
                onClick={onSelect(trackSection)}
                onMouseOut={handleMouseOut}
                onMouseOver={handleMouseOver}
                paddingLeft={isFirst ? majorScale(1) : undefined}
                paddingRight={isLast ? majorScale(1) : undefined}
                paddingY={majorScale(1)}
                position="relative"
                selectors={selectors}>
                {isHovered && (
                    <Flex.Row
                        justifyContent="flex-end"
                        marginTop={-majorScale(1)}
                        minWidth={width}
                        position="absolute"
                        width={width}>
                        <ContextualIconButton
                            backgroundColor={backgroundColor}
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
                                icon={StepChartIcon}
                                id={trackSection.id}
                                isLastCard={isLast}
                                onClick={handleOpenPianoRollDialog}
                                tooltipText="Piano Roll"
                            />
                        )}
                        <ContextualIconButton
                            backgroundColor={backgroundColor}
                            icon={AddIcon}
                            id={trackSection.id}
                            isLastCard={isLast}
                            onClick={handleAdd}
                            tooltipText="Add section"
                        />
                        <ContextualIconButton
                            backgroundColor={backgroundColor}
                            icon={DragHandleHorizontalIcon}
                            id={trackSection.id}
                            isLastCard={isLast}
                            marginRight={isFirst ? majorScale(1) : undefined}
                            setIsDragDisabled={setIsDragDisabled}
                            tooltipText="Move section"
                        />
                    </Flex.Row>
                )}
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
        );
    }
);

TrackSectionCard.displayName = "TrackSectionCard";

export { TrackSectionCard };
