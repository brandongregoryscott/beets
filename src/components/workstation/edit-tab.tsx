import { Menu } from "components/menu/menu";
import { Key } from "enums/key";
import {
    AnnotationIcon,
    Button,
    DuplicateIcon,
    Popover,
    Position,
    SquareIcon,
} from "evergreen-ui";
import React, { useCallback } from "react";
import { useClipboardState } from "hooks/use-clipboard-state";
import { useKeyboardShortcut } from "hooks/use-keyboard-shortcut";
import { useToneControls } from "hooks/use-tone-controls";

const EditTab: React.FC = () => {
    const { selectedState, clearSelected, duplicateSelected } =
        useClipboardState();
    const { isPlaying } = useToneControls();
    const handleClick = useCallback(
        (closePopover: () => void, callback: () => void) => () => {
            callback();
            closePopover();
        },
        []
    );

    const { label } = useKeyboardShortcut(
        `${Key.Control}+d`,
        duplicateSelected,
        [isPlaying, selectedState]
    );

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item
                            disabled={selectedState.isEmpty()}
                            icon={DuplicateIcon}
                            onClick={handleClick(
                                closePopover,
                                duplicateSelected
                            )}
                            secondaryText={label}>
                            Duplicate
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
                    iconBefore={<AnnotationIcon />}
                    intent="none">
                    Edit
                </Button>
            </Popover>
        </React.Fragment>
    );
};

export { EditTab };
