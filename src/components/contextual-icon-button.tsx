import type { IconButtonProps } from "evergreen-ui";
import { majorScale, minorScale, Tooltip, Stack } from "evergreen-ui";
import type { Dispatch, SetStateAction } from "react";
import React, { memo, useCallback } from "react";
import { useDraggable } from "hooks/use-draggable";
import { useTheme } from "hooks/use-theme";
import { IconButton } from "components/icon-button";
import { useDebounce } from "rooks";

interface ContextualIconButtonProps
    extends Omit<IconButtonProps, "icon">,
        Required<Pick<IconButtonProps, "icon">> {
    /** Id of the related element that is draggable */
    id?: string;
    /** Is this the corner button for the card? */
    isCornerButton?: boolean;
    /** Is this button for the last card in the row? */
    isLastCard?: boolean;
    /**
     * Callback to enable/disable dragging when this button is hovered
     */
    setIsDragDisabled?: Dispatch<SetStateAction<boolean>>;
    tooltipText: string;
}

type VisibilityState = "hidden" | "visible";

const _ContextualIconButton: React.FC<ContextualIconButtonProps> = (
    props: ContextualIconButtonProps
) => {
    const {
        icon,
        intent,
        id,
        isCornerButton = false,
        isLastCard = false,
        onClick,
        tooltipText,
        setIsDragDisabled,
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

    const handleMouseOver = useDebounce(() => {
        setIsDragDisabled?.(false);
    }, 25);

    const handleMouseOut = useDebounce(() => {
        setIsDragDisabled?.(true);
    }, 25);

    return (
        <Stack>
            {(zIndex) => (
                <Tooltip content={tooltipText}>
                    <IconButton
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
                        onMouseOut={handleMouseOut}
                        onMouseOver={handleMouseOver}
                        size="small"
                        {...rest}
                        visibility={visibility}
                        zIndex={zIndex}
                    />
                </Tooltip>
            )}
        </Stack>
    );
};

const ContextualIconButton = memo(_ContextualIconButton);
ContextualIconButton.displayName = "ContextualIconButton";

export { ContextualIconButton };
