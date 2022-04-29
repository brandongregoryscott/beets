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
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { Flex } from "components/flex";
import { Slider } from "@mantine/core";

interface TrackCardProps {
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);
const maxVolume = 12;
const minVolume = -12;
const width = majorScale(21);

const TrackCard: React.FC<TrackCardProps> = (props: TrackCardProps) => {
    const { track } = props;
    const { id, name, mute, solo, instrument_id, index, volume } = track;
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

    const [localVolume, setLocalVolume] = useState<number>(volume);
    useEffect(() => setLocalVolume(volume), [volume]);

    const { colors } = useTheme();

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

    const handleVolumeChangeEnd = useCallback(
        (updatedVolume: number) =>
            update(id, (prev) => prev.merge({ volume: updatedVolume })),
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
                    <Flex.Row
                        alignItems="center"
                        marginY={majorScale(1)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <Card
                            alignItems="flex-start"
                            background={colors.gray200}
                            className={cardClass}
                            display="flex"
                            flexDirection="column"
                            marginRight={majorScale(2)}
                            minWidth={width}
                            padding={majorScale(1)}
                            position="relative"
                            width={width}>
                            <Flex.Row
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
                                    tooltipText="Remove track"
                                />
                                <ContextualIconButton
                                    className={contextualButtonClass}
                                    dragHandleProps={provided.dragHandleProps}
                                    icon={DragHandleHorizontalIcon}
                                    id={track.id}
                                    isCornerButton={true}
                                    isLastCard={true}
                                    marginRight={majorScale(1)}
                                    tooltipText="Move track"
                                />
                            </Flex.Row>
                            <EditableParagraph
                                onChange={setName}
                                value={name}
                            />
                            <Flex.Row alignItems="center">
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
                                <Pane width={majorScale(8)}>
                                    <Slider
                                        defaultValue={0}
                                        max={maxVolume}
                                        min={minVolume}
                                        onChange={setLocalVolume}
                                        onChangeEnd={handleVolumeChangeEnd}
                                        radius="sm"
                                        size="sm"
                                        value={localVolume}
                                    />
                                </Pane>
                            </Flex.Row>
                        </Card>
                        <DragDropContext
                            onDragEnd={onDragEnd}
                            onDragStart={onDragStart}>
                            <Droppable
                                direction="horizontal"
                                droppableId={track.id}>
                                {(provided, snapshot) => (
                                    <Flex.Row
                                        border={`2px dashed ${
                                            snapshot.isDraggingOver
                                                ? colors.blue300
                                                : "transparent"
                                        }`}
                                        borderRadius={minorScale(1)}
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
                                    </Flex.Row>
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
                    </Flex.Row>
                )}
            </Draggable>
        </Pane>
    );
};

export type { TrackCardProps };
export { TrackCard };
