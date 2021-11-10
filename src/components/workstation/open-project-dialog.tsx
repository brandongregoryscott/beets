import { ConfirmationDialog } from "components/confirmation-dialog";
import {
    Dialog,
    DialogProps,
    EmptyState,
    GitRepoIcon,
    Spinner,
    Table,
} from "evergreen-ui";
import { useListProjects } from "generated/hooks/domain/projects/use-list-projects";
import { useListTracks } from "generated/hooks/domain/tracks/use-list-tracks";
import { ProjectRecord } from "models/project-record";
import React, { useCallback, useMemo, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { useBoolean } from "utils/hooks/use-boolean";
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
    const { resultObject: projects, isLoading: isLoadingProjects } =
        useListProjects();
    const {
        value: isConfirmDialogOpen,
        setTrue: handleOpenConfirmDialog,
        setFalse: handleCloseConfirmDialog,
    } = useBoolean();
    const [selected, setSelected] = useState<ProjectRecord | undefined>();

    const { resultObject: tracks, isLoading: isLoadingTracks } = useListTracks({
        enabled: !isNilOrEmpty(projects),
        filter: (query) =>
            query.in(
                "project_id",
                projects?.map((project) => project.id) ?? []
            ),
    });

    const projectsWithTracks = useMemo(
        () => projects?.map((project) => project.setTracks(tracks ?? [])),
        [projects, tracks]
    );

    const handleConfirm = useCallback(() => {
        if (isDirty) {
            handleOpenConfirmDialog();
            return;
        }

        setState((prev) =>
            prev.merge({
                initialProject: selected,
                currentProject: selected,
            })
        );

        onCloseComplete?.();
    }, [isDirty, handleOpenConfirmDialog, onCloseComplete, selected, setState]);

    const handleDirtyConfirm = useCallback(() => {
        setState((prev) =>
            prev.merge({
                initialProject: selected,
                currentProject: selected,
            })
        );

        handleCloseConfirmDialog();
        onCloseComplete?.();
    }, [handleCloseConfirmDialog, onCloseComplete, selected, setState]);

    const handleDeselect = useCallback(
        () => setSelected(undefined),
        [setSelected]
    );

    const title = "Open Project";
    const confirmLabel = "Open";
    const isLoading = isLoadingProjects || isLoadingTracks;
    const hasProjects = !isNilOrEmpty(projectsWithTracks);

    return (
        <React.Fragment>
            <Dialog
                confirmLabel={confirmLabel}
                isConfirmLoading={false}
                isConfirmDisabled={
                    !hasProjects ||
                    selected == null ||
                    selected?.equals(state.currentProject)
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
                                projectsWithTracks?.map((project) => (
                                    <Table.Row
                                        key={project.id}
                                        isSelectable={true}
                                        isSelected={selected?.equals(project)}
                                        onDeselect={handleDeselect}
                                        onSelect={() => setSelected(project)}>
                                        <Table.TextCell>
                                            {project.name}
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {project.getTracks().count()} Tracks
                                        </Table.TextCell>
                                        <Table.TextCell>
                                            {formatUpdatedOn(
                                                project.getUpdatedOn()
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
