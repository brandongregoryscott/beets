import {
    IconButton,
    IconButtonProps,
    majorScale,
    minorScale,
    Tooltip,
} from "evergreen-ui";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useDraggable } from "utils/hooks/use-draggable";
import { useHoverable } from "utils/hooks/use-hoverable";
import { useTheme } from "utils/hooks/use-theme";

interface ContextualIconButtonProps
    extends Omit<IconButtonProps, "icon">,
        Required<Pick<IconButtonProps, "icon">> {
    dragHandleProps?: DraggableProvidedDragHandleProps;
    /** Id of the related element that is hoverable/draggable */
    id: string;
    /** Is this the corner button for the card? */
    isCornerButton?: boolean;
    /** Is this button for the last card in the row? */
    isLastCard?: boolean;
    tooltipText: string;
}

const ContextualIconButton: React.FC<ContextualIconButtonProps> = (
    props: ContextualIconButtonProps
) => {
    const {
        dragHandleProps,
        icon,
        intent,
        id,
        isCornerButton = false,
        isLastCard = false,
        onClick,
        tooltipText,
        ...rest
    } = props;
    const theme = useTheme();
    const { draggableId } = useDraggable();
    const { isHovering, hoverableId } = useHoverable({ hoverableId: id });
    let visibility: VisibilityState = "hidden";
    if (
        (isHovering && hoverableId === id) ||
        (draggableId != null && draggableId === id)
    ) {
        visibility = "visible";
    }

    if (draggableId != null && draggableId !== id) {
        visibility = "hidden";
    }

    return (
        <Tooltip content={tooltipText}>
            <IconButton
                {...dragHandleProps}
                appearance="default"
                backgroundColor={theme.colors.gray200}
                borderRadius={false}
                borderTopRightRadius={
                    isLastCard && isCornerButton ? minorScale(1) : false
                }
                icon={icon}
                iconSize={majorScale(2)}
                intent={intent}
                onClick={onClick}
                size="small"
                visibility={visibility}
                {...rest}
            />
        </Tooltip>
    );
};

export { ContextualIconButton };
