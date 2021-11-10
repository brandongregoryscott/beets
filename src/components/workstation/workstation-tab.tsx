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
import { ConfirmationDialog } from "components/confirmation-dialog";

interface WorkstationTabProps {}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const { isDirty, state, setState } = useWorkstationState();
    const { currentProject } = state;
    const isProjectOpen = currentProject.isPersisted();
    const {
        value: isSaveProjectDialogOpen,
        setFalse: handleCloseSaveProjectDialog,
        setTrue: handleOpenSaveProjectDialog,
    } = useBoolean();
    const {
        value: isOpenProjectDialogOpen,
        setFalse: handleCloseOpenProjectDialog,
        setTrue: handleOpenOpenProjectDialog,
    } = useBoolean();
    const {
        value: isConfirmDialogOpen,
        setFalse: handleCloseConfirmDialog,
        setTrue: handleOpenConfirmDialog,
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

    const handleNewClick = useCallback(
        (closePopover: () => void) => () => {
            if (isDirty) {
                handleOpenConfirmDialog();
                return;
            }

            setState((prev) =>
                prev.merge({
                    initialProject: new ProjectRecord(),
                    currentProject: new ProjectRecord(),
                })
            );

            closePopover();
        },
        [isDirty, handleOpenConfirmDialog, setState]
    );

    const handleOpenClick = useCallback(
        (closePopover: () => void) => () => {
            handleOpenOpenProjectDialog();
            closePopover();
        },
        [handleOpenOpenProjectDialog]
    );

    const handleSaveClick = useCallback(
        (closePopover: () => void) => () => {
            if (isProjectOpen) {
                syncProject(currentProject);
                closePopover();
                return;
            }

            handleOpenSaveProjectDialog();
            closePopover();
        },
        [
            isProjectOpen,
            currentProject,
            handleOpenSaveProjectDialog,
            syncProject,
        ]
    );

    const handleDirtyConfirm = useCallback(() => {
        setState((prev) =>
            prev.merge({
                initialProject: new ProjectRecord(),
                currentProject: new ProjectRecord(),
            })
        );

        handleCloseConfirmDialog();
    }, [handleCloseConfirmDialog, setState]);

    return (
        <React.Fragment>
            <Popover
                content={({ close: closePopover }) => (
                    <Menu>
                        <Menu.Item onClick={handleNewClick(closePopover)}>
                            New
                        </Menu.Item>
                        <Menu.Item onClick={handleOpenClick(closePopover)}>
                            Open
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
            {isSaveProjectDialogOpen && (
                <SaveProjectDialog
                    isShown={isSaveProjectDialogOpen}
                    onCloseComplete={handleCloseSaveProjectDialog}
                />
            )}
            {isOpenProjectDialogOpen && (
                <OpenProjectDialog
                    isShown={isOpenProjectDialogOpen}
                    onCloseComplete={handleCloseOpenProjectDialog}
                />
            )}
            {isConfirmDialogOpen && (
                <ConfirmationDialog
                    alertTitle="You currently have unsaved changes."
                    alertDescription="Opening a new project will wipe out any unsaved changes."
                    isShown={isConfirmDialogOpen}
                    onConfirm={handleDirtyConfirm}
                    onCloseComplete={handleCloseConfirmDialog}
                />
            )}
        </React.Fragment>
    );
};

export { WorkstationTab };
