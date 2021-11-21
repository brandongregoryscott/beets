import { Menu } from "components/menu/menu";
import { OpenProjectDialog } from "components/workstation/open-project-dialog";
import { SaveProjectDialog } from "components/workstation/save-project-dialog";
import { Button, DocumentIcon, Popover, Position, toaster } from "evergreen-ui";
import React, { useCallback, useState } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useSyncWorkstationState } from "utils/hooks/use-sync-workstation-state";
import { useTheme } from "utils/hooks/use-theme";
import { ConfirmationDialog } from "components/confirmation-dialog";
import { WorkstationStateRecord } from "models/workstation-state-record";

interface WorkstationTabProps {}

enum ConfirmationAction {
    NewProject,
    RevertToSaved,
}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const { initialState, isDirty, state, setCurrentState, setState } =
        useWorkstationState();
    const { project } = state;
    const isProjectOpen = project.isPersisted();
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
    const [confirmationAction, setConfirmationAction] =
        useState<ConfirmationAction>(ConfirmationAction.NewProject);
    const alertDecription =
        confirmationAction === ConfirmationAction.NewProject
            ? "Opening a new project will wipe out any unsaved changes."
            : "Reverting the project to the last saved state will wipe out any unsaved changes.";
    const theme = useTheme();

    const handleSyncError = useCallback(
        (error: Error) =>
            toaster.danger("There was an error syncing the project", {
                description: error.message,
            }),
        []
    );
    const handleSyncSuccess = useCallback(
        (workstationState: WorkstationStateRecord) => {
            setState(workstationState);
            toaster.success("Successfully saved project");
        },
        [setState]
    );

    const { isLoading: isSyncing, mutate: sync } = useSyncWorkstationState({
        onError: handleSyncError,
        onSuccess: handleSyncSuccess,
    });

    const handleNewClick = useCallback(
        (closePopover: () => void) => () => {
            if (isDirty) {
                setConfirmationAction(ConfirmationAction.NewProject);
                handleOpenConfirmDialog();
                return;
            }

            setState(new WorkstationStateRecord());
            closePopover();
        },
        [handleOpenConfirmDialog, isDirty, setConfirmationAction, setState]
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
                sync();
                closePopover();
                return;
            }

            handleOpenSaveProjectDialog();
            closePopover();
        },
        [isProjectOpen, handleOpenSaveProjectDialog, sync]
    );

    const handleRevertClick = useCallback(
        (closePopover: () => void) => () => {
            setConfirmationAction(ConfirmationAction.RevertToSaved);
            handleOpenConfirmDialog();
            closePopover();
        },
        [setConfirmationAction, handleOpenConfirmDialog]
    );

    const handleDirtyConfirm = useCallback(() => {
        let update = () => setState(new WorkstationStateRecord());
        if (confirmationAction === ConfirmationAction.RevertToSaved) {
            update = () => setCurrentState(initialState);
        }

        update();
        handleCloseConfirmDialog();
    }, [
        confirmationAction,
        handleCloseConfirmDialog,
        initialState,
        setCurrentState,
        setState,
    ]);

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
                        <Menu.Item
                            disabled={!isDirty}
                            onClick={handleRevertClick(closePopover)}>
                            Revert to saved
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
                    alertDescription={alertDecription}
                    isShown={isConfirmDialogOpen}
                    onConfirm={handleDirtyConfirm}
                    onCloseComplete={handleCloseConfirmDialog}
                />
            )}
        </React.Fragment>
    );
};

export { WorkstationTab };
