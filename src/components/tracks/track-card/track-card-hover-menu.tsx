import { ContextualIconButton } from "components/contextual-icon-button";
import { Flex } from "components/flex";
import { DeleteIcon, DragHandleHorizontalIcon, majorScale } from "evergreen-ui";
import type { TrackRecord } from "models/track-record";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

interface TrackCardHoverMenuProps {
    onRemove: () => void;
    setIsDragDisabled?: Dispatch<SetStateAction<boolean>>;
    track: TrackRecord;
    width: number;
}

const TrackCardHoverMenu: React.FC<TrackCardHoverMenuProps> = (
    props: TrackCardHoverMenuProps
) => {
    const { onRemove, track, setIsDragDisabled, width } = props;
    return (
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
                onClick={onRemove}
                tooltipText="Remove track"
            />
            <ContextualIconButton
                icon={DragHandleHorizontalIcon}
                id={track.id}
                isCornerButton={true}
                isLastCard={true}
                marginRight={majorScale(1)}
                setIsDragDisabled={setIsDragDisabled}
                tooltipText="Move track"
            />
        </Flex.Row>
    );
};

export { TrackCardHoverMenu };
