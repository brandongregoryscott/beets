import { Menu } from "components/menu/menu";
import { OpenProjectDialog } from "components/workstation/open-project-dialog";
import { SaveProjectDialog } from "components/workstation/save-project-dialog";
import { Button, Popover, Position } from "evergreen-ui";
import React from "react";
import { useBoolean } from "utils/hooks/use-boolean";

interface WorkstationTabProps {}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const {
        value: isSaveProjectModalOpen,
        setFalse: handleCloseSaveProjectModal,
        setTrue: handleOpenSaveProjectModal,
    } = useBoolean();
    const {
        value: isOpenProjectModalOpen,
        setFalse: handleCloseOpenProjectModal,
        setTrue: handleOpenOpenProjectModal,
    } = useBoolean();

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item
                            onClick={() => {
                                handleOpenOpenProjectModal();
                                closePopover();
                            }}>
                            Open
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => {
                                handleOpenSaveProjectModal();
                                closePopover();
                            }}>
                            Save
                        </Menu.Item>
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
                <Button appearance={"tab" as any} intent="none">
                    File
                </Button>
            </Popover>
            {isSaveProjectModalOpen && (
                <SaveProjectDialog
                    isShown={isSaveProjectModalOpen}
                    onCloseComplete={handleCloseSaveProjectModal}
                />
            )}
            {isOpenProjectModalOpen && (
                <OpenProjectDialog
                    isShown={isOpenProjectModalOpen}
                    onCloseComplete={handleCloseOpenProjectModal}
                />
            )}
        </React.Fragment>
    );
};

export { WorkstationTab };
