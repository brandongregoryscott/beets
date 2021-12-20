import { Menu } from "components/menu/menu";
import { OpenProjectDialog } from "components/workstation/open-project-dialog";
import { SaveProjectDialog } from "components/workstation/save-project-dialog";
import { Button, DocumentIcon, Popover, Position, toaster } from "evergreen-ui";
import React, { useCallback, useState } from "react";
import { useWorkstationState } from "utils/hooks/use-workstation-state";
import { useSyncWorkstationState } from "utils/hooks/use-sync-workstation-state";
import { useTheme } from "utils/hooks/use-theme";
import { ConfirmationDialog } from "components/confirmation-dialog";
import { WorkstationStateRecord } from "models/workstation-state-record";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useDialog } from "utils/hooks/use-dialog";
import { ProjectSettingsDialog } from "components/workstation/project-settings-dialog";
import { isNotNilOrEmpty } from "utils/core-utils";

interface WorkstationTabProps {}

enum ConfirmationAction {
    NewProject,
    RevertToDemo,
    RevertToSaved,
}

const WorkstationTab: React.FC<WorkstationTabProps> = (
    props: WorkstationTabProps
) => {
    const { initialState, isDirty, state, setCurrentState, setState } =
        useWorkstationState();
    const { isAuthenticated } = useGlobalState();
    const { project } = state;
    const projectIsPersisted = project.isPersisted();
    const [
        isSaveProjectDialogOpen,
        handleOpenSaveProjectDialog,
        handleCloseSaveProjectDialog,
    ] = useDialog();
    const [
        isOpenProjectDialogOpen,
        handleOpenOpenProjectDialog,
        handleCloseOpenProjectDialog,
    ] = useDialog();
    const [
        isConfirmDialogOpen,
        handleOpenConfirmDialog,
        handleCloseConfirmDialog,
    ] = useDialog();
    const [
        isSettingsDialogOpen,
        handleOpenSettingsDialog,
        handleCloseSettingsDialog,
    ] = useDialog();
    const [confirmationAction, setConfirmationAction] =
        useState<ConfirmationAction>(ConfirmationAction.NewProject);
    const { resultObject: files } = useListFiles();
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
            const newProjectHasName =
                !state.isDemo() && isNotNilOrEmpty(project.name);
            if (projectIsPersisted || newProjectHasName) {
                sync(state);
                closePopover();
                return;
            }

            handleOpenSaveProjectDialog();
            closePopover();
        },
        [
            projectIsPersisted,
            project.name,
            handleOpenSaveProjectDialog,
            state,
            sync,
        ]
    );

    const handleRevertToSavedClick = useCallback(
        (closePopover: () => void) => () => {
            setConfirmationAction(ConfirmationAction.RevertToSaved);
            handleOpenConfirmDialog();
            closePopover();
        },
        [setConfirmationAction, handleOpenConfirmDialog]
    );

    const handleRevertToDemoClick = useCallback(
        (closePopover: () => void) => () => {
            setConfirmationAction(ConfirmationAction.RevertToDemo);
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

        if (confirmationAction === ConfirmationAction.RevertToDemo) {
            update = () => setCurrentState(WorkstationStateRecord.demo(files));
        }

        update();
        handleCloseConfirmDialog();
    }, [
        confirmationAction,
        files,
        handleCloseConfirmDialog,
        initialState,
        setCurrentState,
        setState,
    ]);

    const handleSettingsClick = useCallback(
        (closePopover: () => void) => () => {
            handleOpenSettingsDialog();
            closePopover();
        },
        [handleOpenSettingsDialog]
    );

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
                        <Menu.Item onClick={handleSettingsClick(closePopover)}>
                            Settings
                        </Menu.Item>
                        {isAuthenticated && (
                            <Menu.Item
                                disabled={!isDirty}
                                onClick={handleRevertToSavedClick(closePopover)}
                            >
                                Revert to saved
                            </Menu.Item>
                        )}
                        {!isAuthenticated && (
                            <Menu.Item
                                disabled={!isDirty}
                                onClick={handleRevertToDemoClick(closePopover)}
                            >
                                Revert to initial demo
                            </Menu.Item>
                        )}
                    </Menu>
                )}
                position={Position.TOP_RIGHT}
            >
                <Button
                    appearance="tab"
                    iconBefore={
                        <DocumentIcon
                            color={
                                isDirty ? theme.intents.warning.icon : undefined
                            }
                        />
                    }
                    intent="none"
                    isLoading={isSyncing}
                >
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
            {isSettingsDialogOpen && (
                <ProjectSettingsDialog
                    isShown={isSettingsDialogOpen}
                    onCloseComplete={handleCloseSettingsDialog}
                />
            )}
        </React.Fragment>
    );
};

export { WorkstationTab };
