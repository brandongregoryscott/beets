import type { IconButtonProps } from "evergreen-ui";
import { majorScale, minorScale, Tooltip, Stack } from "evergreen-ui";
import React, { memo, useCallback } from "react";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useDraggable } from "hooks/use-draggable";
import { useTheme } from "hooks/use-theme";
import { IconButton } from "components/icon-button";

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

type VisibilityState = "hidden" | "visible";

const _ContextualIconButton: React.FC<ContextualIconButtonProps> = (
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
    const { colors } = useTheme();
    const { draggableId } = useDraggable();
    const isOtherElementDragging = draggableId != null && draggableId !== id;
    const visibility: VisibilityState = isOtherElementDragging
        ? "hidden"
        : "visible";

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            onClick?.(event);
        },
        [onClick]
    );

    return (
        <Tooltip content={tooltipText}>
            <Stack>
                {(zIndex) => (
                    <IconButton
                        {...dragHandleProps}
                        appearance="default"
                        backgroundColor={colors.gray200}
                        borderRadius={null}
                        borderTopRightRadius={
                            isLastCard && isCornerButton ? minorScale(1) : null
                        }
                        icon={icon}
                        iconSize={majorScale(2)}
                        intent={intent}
                        onClick={handleClick}
                        size="small"
                        {...rest}
                        visibility={visibility}
                        zIndex={zIndex}
                    />
                )}
            </Stack>
        </Tooltip>
    );
};

const ContextualIconButton = memo(_ContextualIconButton);
ContextualIconButton.displayName = "ContextualIconButton";

export { ContextualIconButton };
