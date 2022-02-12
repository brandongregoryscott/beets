import { EditableParagraph } from "components/editable-paragraph";
import {
    AddIcon,
    Card,
    DeleteIcon,
    DragHandleHorizontalIcon,
    IconButton,
    majorScale,
    minorScale,
    Pane,
    PropertiesIcon,
    PropertyIcon,
    Tooltip,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import React, { useCallback, useMemo } from "react";
import { TrackRecord } from "models/track-record";
import { useTheme } from "utils/hooks/use-theme";
import { useTracksState } from "utils/hooks/use-tracks-state";
import { useTrackSectionsState } from "utils/hooks/use-track-sections-state";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { getFileById } from "utils/file-utils";
import { isNotNilOrEmpty } from "utils/core-utils";
import { useGetInstrument } from "utils/hooks/domain/instruments/use-get-instrument";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TrackSectionList } from "components/tracks/track-section-list/track-section-list";
import { useDraggable } from "utils/hooks/use-draggable";
import { ContextualIconButton } from "components/contextual-icon-button";
import { css, select } from "glamor";
import { TrackTime } from "components/tracks/track-time/track-time";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface TrackCardProps {
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);
const width = majorScale(21);

const TrackCard: React.FC<TrackCardProps> = (props: TrackCardProps) => {
    const { track } = props;
    const { id, name, mute, solo, instrument_id, index } = track;
    const { state: workstationState } = useWorkstationState();
    const { update, remove, state: tracks } = useTracksState();
    const {
        add: addTrackSection,
        setState: setTrackSections,
        state: trackSections,
        update: updateTrackSection,
    } = useTrackSectionsState({ trackId: id });
    const { onDragEnd, onDragStart } = useDraggable({
        setState: setTrackSections,
    });
    const { resultObject: files } = useListFiles();
    const { resultObject: instrument } = useGetInstrument({
        id: instrument_id!,
        enabled: isNotNilOrEmpty(instrument_id),
        files,
    });
    const instrumentFile = useMemo(
        () => getFileById(instrument?.file_id, files),
        [files, instrument]
    );

    const theme = useTheme();

    const setName = useCallback(
        (value: string) => update(id, (prev) => prev.merge({ name: value })),
        [id, update]
    );

    const toggleMute = useCallback(
        () => update(id, (prev) => prev.merge({ mute: !prev.mute })),
        [id, update]
    );

    const toggleSolo = useCallback(
        () => update(id, (prev) => prev.merge({ solo: !prev.solo })),
        [id, update]
    );

    const handleAddTrackSection = useCallback(
        () => addTrackSection(),
        [addTrackSection]
    );

    const handleRemove = useCallback(() => remove(track), [remove, track]);

    const contextualButtonClass = css({ visibility: "hidden" }).toString();
    const cardClass = css(
        select(`&:hover .${contextualButtonClass}`, { visibility: "visible" })
    ).toString();

    return (
        <Pane
            marginBottom={
                index === tracks.count() - 1 ? -majorScale(1) : undefined
            }
            marginTop={index === 0 ? -majorScale(1) : undefined}>
            {index === 0 && (
                <Pane
                    marginLeft={width + majorScale(3)}
                    marginTop={majorScale(2)}>
                    <TrackTime stepCount={workstationState.getStepCount()} />
                </Pane>
            )}
            <Draggable draggableId={track.id} index={track.index}>
                {(provided) => (
                    <Pane
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        marginY={majorScale(1)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <Card
                            alignItems="flex-start"
                            background={theme.colors.gray200}
                            className={cardClass}
                            display="flex"
                            flexDirection="column"
                            marginRight={majorScale(2)}
                            minWidth={width}
                            padding={majorScale(1)}
                            width={width}>
                            <Pane
                                display="flex"
                                flexDirection="row"
                                justifyContent="flex-end"
                                marginTop={-majorScale(1)}
                                minWidth={width}
                                position="absolute"
                                width={width}>
                                <ContextualIconButton
                                    className={contextualButtonClass}
                                    icon={DeleteIcon}
                                    id={track.id}
                                    intent="danger"
                                    isLastCard={true}
                                    onClick={handleRemove}
                                    tooltipText="Remove section"
                                />
                                <ContextualIconButton
                                    className={contextualButtonClass}
                                    dragHandleProps={provided.dragHandleProps}
                                    icon={DragHandleHorizontalIcon}
                                    id={track.id}
                                    isCornerButton={true}
                                    isLastCard={true}
                                    marginRight={majorScale(1)}
                                    tooltipText="Move section"
                                />
                            </Pane>
                            <EditableParagraph
                                onChange={setName}
                                value={name}
                            />
                            <Pane display="flex" flexDirection="row">
                                <Tooltip content="Mute Track">
                                    <IconButton
                                        icon={
                                            mute ? VolumeOffIcon : VolumeUpIcon
                                        }
                                        marginRight={iconMarginRight}
                                        onClick={toggleMute}
                                    />
                                </Tooltip>
                                <Tooltip content="Solo Track">
                                    <IconButton
                                        icon={
                                            solo ? PropertyIcon : PropertiesIcon
                                        }
                                        marginRight={iconMarginRight}
                                        onClick={toggleSolo}
                                    />
                                </Tooltip>
                            </Pane>
                        </Card>
                        <DragDropContext
                            onDragEnd={onDragEnd}
                            onDragStart={onDragStart}>
                            <Droppable
                                direction="horizontal"
                                droppableId={track.id}>
                                {(provided, snapshot) => (
                                    <Pane
                                        border={`2px dashed ${
                                            snapshot.isDraggingOver
                                                ? theme.colors.blue300
                                                : "transparent"
                                        }`}
                                        borderRadius={minorScale(1)}
                                        display="flex"
                                        flexDirection="row"
                                        margin={-2}
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}>
                                        <TrackSectionList
                                            instrument={instrument}
                                            instrumentFile={instrumentFile}
                                            onChange={updateTrackSection}
                                            track={track}
                                            trackSections={trackSections}
                                        />
                                        {provided.placeholder}
                                    </Pane>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <Tooltip content="Add Section">
                            <IconButton
                                icon={AddIcon}
                                marginLeft={
                                    trackSections.isEmpty()
                                        ? undefined
                                        : majorScale(2)
                                }
                                onClick={handleAddTrackSection}
                            />
                        </Tooltip>
                    </Pane>
                )}
            </Draggable>
        </Pane>
    );
};

export { TrackCard };
export type { TrackCardProps };
