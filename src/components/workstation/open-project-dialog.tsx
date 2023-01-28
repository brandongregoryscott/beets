import { ConfirmationDialog } from "components/confirmation-dialog";
import { ProjectsIcon, Spinner, Table } from "evergreen-ui";
import type { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useCallback, useState } from "react";
import { isNilOrEmpty } from "utils/collection-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { useListWorkstations } from "hooks/use-list-workstations";
import { useWorkstationState } from "hooks/use-workstation-state";
import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import { EmptyState } from "components/empty-state";
import { useDialog } from "hooks/use-dialog";
import { useRouter } from "hooks/use-router";
import { Sitemap } from "sitemap";
import { generatePath } from "utils/route-utils";

interface OpenProjectDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const OpenProjectDialog: React.FC<OpenProjectDialogProps> = (
    props: OpenProjectDialogProps
) => {
    const { onCloseComplete } = props;
    const { navigate } = useRouter();
    const { isDirty, state } = useWorkstationState();
    const { resultObject: workstations, isLoading } = useListWorkstations({});
    const [
        isConfirmDialogOpen,
        handleOpenConfirmDialog,
        handleCloseConfirmDialog,
    ] = useDialog();
    const [selected, setSelected] = useState<
        WorkstationStateRecord | undefined
    >();

    const handleConfirm = useCallback(() => {
        if (isDirty) {
            handleOpenConfirmDialog();
            return;
        }

        navigate(
            generatePath(Sitemap.root.project, {
                projectId: selected?.project.id,
            })
        );
        onCloseComplete?.();
    }, [
        handleOpenConfirmDialog,
        isDirty,
        navigate,
        onCloseComplete,
        selected?.project.id,
    ]);

    const handleDirtyConfirm = useCallback(() => {
        handleCloseConfirmDialog();
        navigate(
            generatePath(Sitemap.root.project, {
                projectId: selected?.project.id,
            })
        );
        onCloseComplete?.();
    }, [
        handleCloseConfirmDialog,
        navigate,
        onCloseComplete,
        selected?.project.id,
    ]);

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
                isConfirmDisabled={
                    !hasProjects ||
                    selected == null ||
                    selected?.equals(state.project)
                }
                isConfirmLoading={false}
                onCloseComplete={onCloseComplete}
                onConfirm={handleConfirm}
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
                                        isSelectable={true}
                                        isSelected={selected?.equals(
                                            workstation
                                        )}
                                        key={workstation.project.id}
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
                                    description="Save a new project to begin"
                                    icon={<ProjectsIcon />}
                                    title="No Projects Found"
                                />
                            )}
                        </Table.Body>
                    )}
                </Table>
            </Dialog>
            {isConfirmDialogOpen && (
                <ConfirmationDialog
                    alertDescription="Opening a new project will wipe out any unsaved changes."
                    alertTitle="You currently have unsaved changes."
                    onCloseComplete={handleCloseConfirmDialog}
                    onConfirm={handleDirtyConfirm}
                />
            )}
        </React.Fragment>
    );
};

export { OpenProjectDialog };
