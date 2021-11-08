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
import { useCallback, useMemo, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { useTheme } from "utils/hooks/use-theme";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface OpenProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const OpenProjectDialog: React.FC<OpenProjectDialogProps> = (
    props: OpenProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const theme = useTheme();
    const { state, setState } = useWorkstationState();
    const { resultObject: projects, isLoading: isLoadingProjects } =
        useListProjects();

    const [selected, setSelected] = useState<ProjectRecord | undefined>(
        state.initialProject
    );

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
        setState((prev) =>
            prev.merge({
                initialProject: selected,
                currentProject: selected,
            })
        );

        onCloseComplete?.();
    }, [onCloseComplete, selected, setState]);

    const handleDeselect = useCallback(
        () => setSelected(undefined),
        [setSelected]
    );

    const title = "Open Project";
    const confirmLabel = "Open";
    const isLoading = isLoadingProjects || isLoadingTracks;
    const hasProjects = !isNilOrEmpty(projectsWithTracks);
    return (
        <Dialog
            confirmLabel={confirmLabel}
            isConfirmLoading={false}
            isConfirmDisabled={!hasProjects || selected == null}
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
                                    <GitRepoIcon color={theme.colors.gray800} />
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
    );
};

export { OpenProjectDialog };
