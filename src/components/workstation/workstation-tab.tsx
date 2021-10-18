import { Menu } from "components/menu/menu";
import { Button, Popover, Position } from "evergreen-ui";

interface WorkstationTabProps {}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    return (
        <Popover
            content={({ close }) => (
                <Menu>
                    <Menu.Item onClick={close}>Open</Menu.Item>
                    <Menu.Item onClick={close}>Save</Menu.Item>
                </Menu>
            )}
            position={Position.TOP_RIGHT}>
            <Button appearance={"tab" as any} intent="none">
                File
            </Button>
        </Popover>
    );
};

export { WorkstationTab };
