import { EditableParagraph } from "components/editable-paragraph";
import {
    Card,
    DeleteIcon,
    DragHandleHorizontalIcon,
    majorScale,
    minorScale,
    Pane,
    PropertiesIcon,
    PropertyIcon,
    Tooltip,
    VolumeOffIcon,
    VolumeUpIcon,
} from "evergreen-ui";
import React, { memo, useCallback, useEffect, useState } from "react";
import type { TrackRecord } from "models/track-record";
import { useTheme } from "hooks/use-theme";
import { useTracksState } from "hooks/use-tracks-state";
import { Draggable } from "react-beautiful-dnd";
import { ContextualIconButton } from "components/contextual-icon-button";
import { css, select } from "glamor";
import { Flex } from "components/flex";
import { Slider } from "components/mantine/slider";
import { IconButton } from "components/icon-button";

interface TrackCardProps {
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);
const width = majorScale(21);

const _TrackCard: React.FC<TrackCardProps> = (props: TrackCardProps) => {
    const { track } = props;
    const { id, name, mute, solo, volume } = track;
    const { update, remove } = useTracksState();

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

    const handleRemove = useCallback(() => remove(track), [remove, track]);

    const contextualButtonClass = css({ visibility: "hidden" }).toString();
    const cardClass = css(
        select(`&:hover .${contextualButtonClass}`, { visibility: "visible" })
    ).toString();

    return (
        <Draggable draggableId={track.id} index={track.index}>
            {(provided) => (
                <Flex.Row
                    alignItems="center"
                    height={majorScale(10)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <Pane
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
                        <EditableParagraph onChange={setName} value={name} />
                        <Flex.Row alignItems="center">
                            <Tooltip content="Mute Track">
                                <IconButton
                                    icon={mute ? VolumeOffIcon : VolumeUpIcon}
                                    marginRight={iconMarginRight}
                                    onClick={toggleMute}
                                />
                            </Tooltip>
                            <Tooltip content="Solo Track">
                                <IconButton
                                    icon={solo ? PropertyIcon : PropertiesIcon}
                                    marginRight={iconMarginRight}
                                    onClick={toggleSolo}
                                />
                            </Tooltip>
                            <Slider
                                label="Vol"
                                onChange={setLocalVolume}
                                onChangeEnd={handleVolumeChangeEnd}
                                value={localVolume}
                            />
                        </Flex.Row>
                    </Pane>
                </Flex.Row>
            )}
        </Draggable>
    );
};

const TrackCard = memo(_TrackCard);
TrackCard.displayName = "TrackCard";

export type { TrackCardProps };
export { TrackCard };
