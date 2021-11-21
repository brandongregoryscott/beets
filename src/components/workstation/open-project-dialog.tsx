import { ConfirmationDialog } from "components/confirmation-dialog";
import {
    Dialog,
    DialogProps,
    EmptyState,
    GitRepoIcon,
    Spinner,
    Table,
} from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useCallback, useState } from "react";
import { isNilOrEmpty } from "utils/collection-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { useBoolean } from "utils/hooks/use-boolean";
import { useListWorkstations } from "utils/hooks/use-list-workstations";
import { useTheme } from "utils/hooks/use-theme";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface OpenProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const OpenProjectDialog: React.FC<OpenProjectDialogProps> = (
    props: OpenProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const theme = useTheme();
    const { isDirty, state, setState } = useWorkstationState();
    const { resultObject: workstations, isLoading } = useListWorkstations({});
    const {
        value: isConfirmDialogOpen,
        setTrue: handleOpenConfirmDialog,
        setFalse: handleCloseConfirmDialog,
    } = useBoolean();
    const [selected, setSelected] = useState<
        WorkstationStateRecord | undefined
    >();

    const handleConfirm = useCallback(() => {
        if (isDirty) {
            handleOpenConfirmDialog();
            return;
        }

        setState(selected!);
        onCloseComplete?.();
    }, [handleOpenConfirmDialog, isDirty, onCloseComplete, selected, setState]);

    const handleDirtyConfirm = useCallback(() => {
        setState(selected!);
        handleCloseConfirmDialog();
        onCloseComplete?.();
    }, [handleCloseConfirmDialog, onCloseComplete, selected, setState]);

    const handleDeselect = useCallback(
        () => setSelected(undefined),
        [setSelected]
    );

    const title = "Open Project";
    const confirmLabel = "Open";
    const hasProjects = !isNilOrEmpty(workstations);

    return (
        <React.Fragment>
            <Dialog
                confirmLabel={confirmLabel}
                isConfirmLoading={false}
                isConfirmDisabled={
                    !hasProjects ||
                    selected == null ||
                    selected?.equals(state.project)
                }
                isShown={isShown}
                onConfirm={handleConfirm}
                onCloseComplete={onCloseComplete}
                shouldCloseOnOverlayClick={false}
                title={title}>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Tracks</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
                    </Table.Head>
                    {isLoading && <Spinner margin="auto" />}
                    {!isLoading && (
                        <Table.Body>
                            {hasProjects &&
                                workstations?.map((workstation) => (
                                    <Table.Row
                                        key={workstation.project.id}
                                        isSelectable={true}
                                        isSelected={selected?.equals(
                                            workstation
                                        )}
                                        onDeselect={handleDeselect}
                                        onSelect={() =>
                                            setSelected(workstation)
                                        }>
                                        <Table.TextCell>
                                            {workstation.project.name}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {workstation.tracks.count()} Tracks
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {formatUpdatedOn(
                                                workstation.project.getUpdatedOn()
                                            )}
                                        </Table.TextCell>
                                    </Table.Row>
                                ))}
                            {!hasProjects && (
                                <EmptyState
                                    icon={
                                        <GitRepoIcon
                                            color={theme.colors.gray800}
                                        />
                                    }
                                    title="No Projects Found"
                                    description="Save a new project to begin"
                                    iconBgColor={theme.colors.gray100}
                                />
                            )}
                        </Table.Body>
                    )}
                </Table>
            </Dialog>
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

export { OpenProjectDialog };
