import { Menu } from "components/menu/menu";
import { Button, EditIcon, Popover, Position } from "evergreen-ui";
import React, { useCallback } from "react";
import { useClipboardState } from "utils/hooks/use-clipboard-state";

interface EditTabProps {}

const EditTab: React.FC<EditTabProps> = (props: EditTabProps) => {
    const { selectedState, clearSelected, copySelected } = useClipboardState();

    const handleClick = useCallback(
        (closePopover: () => void, callback: () => void) => () => {
            callback();
            closePopover();
        },
        []
    );

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item
                            onClick={handleClick(closePopover, copySelected)}>
                            Copy
                        </Menu.Item>
                        <Menu.Item
                            disabled={selectedState.isEmpty()}
                            onClick={handleClick(closePopover, clearSelected)}>
                            Deselect
                        </Menu.Item>
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
                <Button
                    appearance="tab"
                    iconBefore={<EditIcon />}
                    intent="none">
                    Edit
                </Button>
            </Popover>
        </React.Fragment>
    );
};

export { EditTab };
