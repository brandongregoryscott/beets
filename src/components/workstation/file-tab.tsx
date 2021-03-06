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
import { ExportDialog } from "components/workstation/export-dialog";
import { useKeyboardShortcut } from "utils/hooks/use-keyboard-shortcut";
import { Key } from "enums/key";
import {
    trackProjectSavedFromFileMenu,
    trackProjectSavedFromKeyboardShortcut,
    trackProjectSyncFailed,
} from "utils/analytics-utils";

interface FileTabProps {}

enum ConfirmationAction {
    NewProject,
    RevertToDemo,
    RevertToSaved,
}

const FileTab: React.FC<FileTabProps> = (props: FileTabProps) => {
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
        isExportDialogOpen,
        handleOpenExportDialog,
        handleCloseExportDialog,
    ] = useDialog();
    const [
        isSettingsDialogOpen,
        handleOpenSettingsDialog,
        handleCloseSettingsDialog,
    ] = useDialog();
    const [confirmationAction, setConfirmationAction] =
        useState<ConfirmationAction>(ConfirmationAction.NewProject);
    const { resultObject: files } = useListFiles();
    const alertDescription =
        confirmationAction === ConfirmationAction.NewProject
            ? "Opening a new project will wipe out any unsaved changes."
            : "Reverting the project to the last saved state will wipe out any unsaved changes.";
    const theme = useTheme();

    const handleSyncError = useCallback(
        (error: Error) => {
            trackProjectSyncFailed(project, error);
            toaster.danger("There was an error syncing the project", {
                description: error.message,
            });
        },
        [project]
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

    const handleSave = useCallback(
        (closePopover?: () => void) => () => {
            const newProjectHasName =
                !state.isDemo() && isNotNilOrEmpty(project.name);
            if (projectIsPersisted || newProjectHasName) {
                sync(state);
                closePopover?.();
                return;
            }

            handleOpenSaveProjectDialog();
            closePopover?.();
        },
        [
            handleOpenSaveProjectDialog,
            project.name,
            projectIsPersisted,
            state,
            sync,
        ]
    );

    const { label } = useKeyboardShortcut(
        `${Key.Control}+s`,
        () => {
            trackProjectSavedFromKeyboardShortcut(project);
            handleSave()();
        },
        [handleSave, project]
    );

    const handleRevertToSavedClick = useCallback(
        (closePopover: () => void) => () => {
            setConfirmationAction(ConfirmationAction.RevertToSaved);
            handleOpenConfirmDialog();
            closePopover();
        },
        [handleOpenConfirmDialog, setConfirmationAction]
    );

    const handleRevertToDemoClick = useCallback(
        (closePopover: () => void) => () => {
            setConfirmationAction(ConfirmationAction.RevertToDemo);
            handleOpenConfirmDialog();
            closePopover();
        },
        [handleOpenConfirmDialog, setConfirmationAction]
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

    const handleExportClick = useCallback(
        (closePopover: () => void) => () => {
            handleOpenExportDialog();
            closePopover();
        },
        [handleOpenExportDialog]
    );

    const handleSaveClick = useCallback(
        (closePopover: () => void) => () => {
            trackProjectSavedFromFileMenu(project);
            handleSave(closePopover)();
        },
        [handleSave, project]
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
                        <Menu.Item
                            onClick={handleSaveClick(closePopover)}
                            secondaryText={label}>
                            Save
                        </Menu.Item>
                        <Menu.Item onClick={handleExportClick(closePopover)}>
                            Export
                        </Menu.Item>
                        <Menu.Item onClick={handleSettingsClick(closePopover)}>
                            Settings
                        </Menu.Item>
                        {isAuthenticated && (
                            <Menu.Item
                                disabled={!isDirty}
                                onClick={handleRevertToSavedClick(
                                    closePopover
                                )}>
                                Revert to saved
                            </Menu.Item>
                        )}
                        {!isAuthenticated && (
                            <Menu.Item
                                disabled={!isDirty}
                                onClick={handleRevertToDemoClick(closePopover)}>
                                Revert to initial demo
                            </Menu.Item>
                        )}
                    </Menu>
                )}
                position={Position.TOP_RIGHT}>
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
                    isLoading={isSyncing}>
                    File
                </Button>
            </Popover>
            {isSaveProjectDialogOpen && (
                <SaveProjectDialog
                    onCloseComplete={handleCloseSaveProjectDialog}
                />
            )}
            {isOpenProjectDialogOpen && (
                <OpenProjectDialog
                    onCloseComplete={handleCloseOpenProjectDialog}
                />
            )}
            {isConfirmDialogOpen && (
                <ConfirmationDialog
                    alertDescription={alertDescription}
                    alertTitle="You currently have unsaved changes."
                    onCloseComplete={handleCloseConfirmDialog}
                    onConfirm={handleDirtyConfirm}
                />
            )}
            {isSettingsDialogOpen && (
                <ProjectSettingsDialog
                    onCloseComplete={handleCloseSettingsDialog}
                />
            )}
            {isExportDialogOpen && (
                <ExportDialog onCloseComplete={handleCloseExportDialog} />
            )}
        </React.Fragment>
    );
};

export { FileTab };
