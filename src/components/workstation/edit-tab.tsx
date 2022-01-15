import { Menu } from "components/menu/menu";
import {
    AnnotationIcon,
    Button,
    ClipboardIcon,
    DuplicateIcon,
    EraserIcon,
    Popover,
    Position,
    SquareIcon,
} from "evergreen-ui";
import React, { useCallback } from "react";
import { useClipboardState } from "utils/hooks/use-clipboard-state";
import { useTheme } from "utils/hooks/use-theme";

interface EditTabProps {}

const EditTab: React.FC<EditTabProps> = (props: EditTabProps) => {
    const {
        copiedState,
        selectedState,
        clearCopied,
        clearSelected,
        copySelected,
    } = useClipboardState();
    const { colors } = useTheme();
    const handleClick = useCallback(
        (closePopover: () => void, callback: () => void) => () => {
            callback();
            closePopover();
        },
        []
    );

    const editIconColor = copiedState.isEmpty() ? undefined : colors.blue400;

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item
                            disabled={selectedState.isEmpty()}
                            icon={DuplicateIcon}
                            onClick={handleClick(closePopover, copySelected)}
                            secondaryText={"⌘C" as any}>
                            Copy
                        </Menu.Item>
                        <Menu.Item
                            disabled={copiedState.isEmpty()}
                            icon={ClipboardIcon}
                            onClick={closePopover}
                            secondaryText={"⌘V" as any}>
                            Paste
                        </Menu.Item>
                        <Menu.Item
                            disabled={copiedState.isEmpty()}
                            icon={EraserIcon}
                            onClick={handleClick(closePopover, clearCopied)}>
                            Clear Clipboard
                        </Menu.Item>
                        <Menu.Item
                            disabled={selectedState.isEmpty()}
                            icon={SquareIcon}
                            onClick={handleClick(closePopover, clearSelected)}>
                            Clear Selection
                        </Menu.Item>
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
                <Button
                    appearance="tab"
                    iconBefore={<AnnotationIcon color={editIconColor} />}
                    intent="none">
                    Edit
                </Button>
            </Popover>
        </React.Fragment>
    );
};

export { EditTab };
