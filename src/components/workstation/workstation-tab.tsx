import { Menu } from "components/menu/menu";
import { OpenProjectDialog } from "components/workstation/open-project-dialog";
import { SaveProjectDialog } from "components/workstation/save-project-dialog";
import { Button, Popover, Position } from "evergreen-ui";
import React, { useCallback } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useSyncProject } from "utils/hooks/domain/projects/use-sync-project";

interface WorkstationTabProps {}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const { state } = useWorkstationState();
    const { initialProject } = state;

    const isProjectOpen = initialProject.isPersisted();
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

    const { isLoading: isSyncing, mutate: syncProject } = useSyncProject();

    const openButtonText = isProjectOpen
        ? "Open Another Project"
        : "Open Existing Project";
    const saveButtonText = isProjectOpen ? "Save" : "Save New Project";

    const handleOpenClick = useCallback(
        (closePopover: () => void) => () => {
            handleOpenOpenProjectModal();
            closePopover();
        },
        [handleOpenOpenProjectModal]
    );

    const handleSaveClick = useCallback(
        (closePopover: () => void) => () => {
            if (isProjectOpen) {
                syncProject();
                closePopover();
                return;
            }

            handleOpenSaveProjectModal();
            closePopover();
        },
        [isProjectOpen, handleOpenSaveProjectModal, syncProject]
    );

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item onClick={handleOpenClick(closePopover)}>
                            {openButtonText}
                        </Menu.Item>
                        <Menu.Item onClick={handleSaveClick(closePopover)}>
                            {saveButtonText}
                        </Menu.Item>
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
                <Button
                    appearance={"tab" as any}
                    intent="none"
                    isLoading={isSyncing}>
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
