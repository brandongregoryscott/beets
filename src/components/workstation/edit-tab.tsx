import { Menu } from "components/menu/menu";
import {
    AnnotationIcon,
    Button,
    DuplicateIcon,
    Popover,
    Position,
    SquareIcon,
} from "evergreen-ui";
import React, { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useClipboardState } from "utils/hooks/use-clipboard-state";

interface EditTabProps {}

const EditTab: React.FC<EditTabProps> = (props: EditTabProps) => {
    const { selectedState, clearSelected, duplicateSelected } =
        useClipboardState();
    const handleClick = useCallback(
        (closePopover: () => void, callback: () => void) => () => {
            callback();
            closePopover();
        },
        []
    );

    useHotkeys("cmd+d", duplicateSelected, [selectedState]);

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
                            secondaryText={"⌘D" as any}>
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
