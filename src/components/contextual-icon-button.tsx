import {
    IconButton,
    IconButtonProps,
    majorScale,
    minorScale,
    Tooltip,
} from "evergreen-ui";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useDraggable } from "utils/hooks/use-draggable";
import { useTheme } from "utils/hooks/use-theme";

interface ContextualIconButtonProps
    extends Omit<IconButtonProps, "icon">,
        Required<Pick<IconButtonProps, "icon">> {
    dragHandleProps?: DraggableProvidedDragHandleProps;
    /** Id of the related element that is draggable */
    id?: string;
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
        className,
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
    const isCurrentElementDragging = draggableId != null && draggableId === id;
    const isOtherElementDragging = draggableId != null && draggableId !== id;
    const visibility: VisibilityState = isCurrentElementDragging
        ? "visible"
        : "hidden";

    return (
        <Tooltip content={tooltipText}>
            <IconButton
                {...dragHandleProps}
                // Don't apply className with hover style if another element is being dragged
                className={isOtherElementDragging ? undefined : props.className}
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
                {...rest}
                visibility={visibility}
            />
        </Tooltip>
    );
};

export { ContextualIconButton };
