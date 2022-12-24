import { EditableParagraph } from "components/editable-paragraph";
import {
    Card,
    DeleteIcon,
    DragHandleHorizontalIcon,
    majorScale,
    minorScale,
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
import { ContextualIconButton } from "components/contextual-icon-button";
import { Flex } from "components/flex";
import { Slider } from "components/mantine/slider";
import { IconButton } from "components/icon-button";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useBoolean } from "hooks/use-boolean";
import { useDebounce } from "rooks";

interface TrackCardProps {
    dragHandleProps: DraggableProvidedDragHandleProps | undefined;
    track: TrackRecord;
}

const iconMarginRight = minorScale(2);
const width = majorScale(21);

const _TrackCard: React.FC<TrackCardProps> = (props: TrackCardProps) => {
    const { dragHandleProps, track } = props;
    const { id, name, mute, solo, volume } = track;
    const { colors } = useTheme();
    const { update, remove } = useTracksState();

    const { value: isHovered, setValue: setIsHovered } = useBoolean();
    const handleMouseOver = useDebounce(() => setIsHovered(true), 25);
    const handleMouseLeave = useDebounce(() => setIsHovered(false), 25);

    const [localVolume, setLocalVolume] = useState<number>(volume);
    useEffect(() => setLocalVolume(volume), [volume]);

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

    return (
        <Flex.Row alignItems="center" height={majorScale(10)}>
            <Card
                alignItems="flex-start"
                background={colors.gray200}
                display="flex"
                flexDirection="column"
                minWidth={width}
                onMouseLeave={handleMouseLeave}
                onMouseOver={handleMouseOver}
                padding={majorScale(1)}
                position="relative"
                width={width}>
                {isHovered && (
                    <Flex.Row
                        justifyContent="flex-end"
                        marginTop={-majorScale(1)}
                        minWidth={width}
                        position="absolute"
                        width={width}>
                        <ContextualIconButton
                            icon={DeleteIcon}
                            id={track.id}
                            intent="danger"
                            isLastCard={true}
                            onClick={handleRemove}
                            tooltipText="Remove track"
                        />
                        <ContextualIconButton
                            dragHandleProps={dragHandleProps}
                            icon={DragHandleHorizontalIcon}
                            id={track.id}
                            isCornerButton={true}
                            isLastCard={true}
                            marginRight={majorScale(1)}
                            tooltipText="Move track"
                        />
                    </Flex.Row>
                )}
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
            </Card>
        </Flex.Row>
    );
};

const TrackCard = memo(_TrackCard);
TrackCard.displayName = "TrackCard";

export type { TrackCardProps };
export { TrackCard };
