import {
    IconButton,
    IconButtonProps,
    majorScale,
    minorScale,
    Tooltip,
} from "evergreen-ui";
import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useTheme } from "utils/hooks/use-theme";

interface TrackSectionCardButtonProps
    extends Pick<IconButtonProps, "intent" | "onClick">,
        Required<Pick<IconButtonProps, "icon">> {
    dragHandleProps?: DraggableProvidedDragHandleProps;
    /** Is this the corner button for the card? */
    isCornerButton?: boolean;
    /** Is the card currently being hovered? */
    isHovering: boolean;
    /** Is this button for the last card in the row? */
    isLastCard?: boolean;
    tooltipText: string;
}

const TrackSectionCardButton: React.FC<TrackSectionCardButtonProps> = (
    props: TrackSectionCardButtonProps
) => {
    const {
        dragHandleProps,
        icon,
        intent,
        isCornerButton = false,
        isLastCard = false,
        isHovering,
        onClick,
        tooltipText,
    } = props;
    const theme = useTheme();

    return (
        <Tooltip content={tooltipText}>
            <IconButton
                {...dragHandleProps}
                appearance="default"
                backgroundColor={theme.colors.gray200}
                borderBottomLeftRadius={false}
                borderBottomRightRadius={false}
                borderTopLeftRadius={false}
                borderTopRightRadius={
                    isLastCard && isCornerButton ? minorScale(1) : false
                }
                icon={icon}
                iconSize={majorScale(2)}
                intent={intent}
                marginRight={isCornerButton ? majorScale(1) : undefined}
                onClick={onClick}
                size="small"
                visibility={isHovering ? "visible" : "hidden"}
            />
        </Tooltip>
    );
};

export { TrackSectionCardButton };
