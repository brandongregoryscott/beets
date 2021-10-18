import { Menu } from "components/menu/menu";
import { Button, Popover, Position, Text } from "evergreen-ui";
import { useState } from "react";
import { useTheme } from "utils/hooks/use-theme";

interface WorkstationTabProps {}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const theme = useTheme();
    const [isSaving, setIsSaving] = useState(false);
    return (
        <Popover
            content={({ close }) => (
                <Menu>
                    <Menu.Item onClick={close}>Open</Menu.Item>
                    <Menu.Item onClick={close}>Save</Menu.Item>
                </Menu>
            )}
            position={Position.TOP_RIGHT}>
            <Button
                appearance={"tab" as any}
                intent="none"
                isLoading={isSaving}>
                File
            </Button>
        </Popover>
    );
};

export { WorkstationTab };
