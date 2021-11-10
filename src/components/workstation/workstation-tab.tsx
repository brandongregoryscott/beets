import { Menu } from "components/menu/menu";
import { OpenProjectDialog } from "components/workstation/open-project-dialog";
import { SaveProjectDialog } from "components/workstation/save-project-dialog";
import { Button, DocumentIcon, Popover, Position, toaster } from "evergreen-ui";
import React, { useCallback } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useSyncProject } from "utils/hooks/domain/projects/use-sync-project";
import { ProjectRecord } from "models/project-record";
import { useTheme } from "utils/hooks/use-theme";

interface WorkstationTabProps {}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const { isDirty, state, setState } = useWorkstationState();
    const { currentProject } = state;
    const isProjectOpen = currentProject.isPersisted();
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
    const theme = useTheme();
    const handleSyncProjectError = useCallback(
        (error: Error) =>
            toaster.danger("There was an error syncing the project", {
                description: error.message,
            }),
        []
    );
    const handleSyncProjectSuccess = useCallback(
        (project: ProjectRecord) => {
            setState((prev) =>
                prev.merge({
                    initialProject: project,
                    currentProject: project,
                })
            );
            toaster.success("Successfully saved project");
        },
        [setState]
    );

    const { isLoading: isSyncing, mutate: syncProject } = useSyncProject({
        onError: handleSyncProjectError,
        onSuccess: handleSyncProjectSuccess,
    });

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
                syncProject(currentProject);
                closePopover();
                return;
            }

            handleOpenSaveProjectModal();
            closePopover();
        },
        [isProjectOpen, currentProject, handleOpenSaveProjectModal, syncProject]
    );

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item onClick={handleOpenClick(closePopover)}>
                            Open Project
                        </Menu.Item>
                        <Menu.Item onClick={handleSaveClick(closePopover)}>
                            Save
                        </Menu.Item>
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
                <Button
                    appearance={"tab" as any}
                    iconBefore={
                        <DocumentIcon
                            color={
                                isDirty ? theme.intents.warning.icon : undefined
                            }
                        />
                    }
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
