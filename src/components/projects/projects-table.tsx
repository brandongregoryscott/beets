import { ConfirmationDialog } from "components/confirmation-dialog";
import { EmptyState } from "components/empty-state";
import { IconButton } from "components/icon-button";
import {
    majorScale,
    MoreIcon,
    ProjectsIcon,
    Spinner,
    Table,
    TrashIcon,
} from "evergreen-ui";
import { useDeleteWorkstation } from "hooks/use-delete-workstation";
import { useDialog } from "hooks/use-dialog";
import { List } from "immutable";
import type { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useCallback, useMemo, useState } from "react";
import { isNilOrEmpty, isNotNilOrEmpty } from "utils/core-utils";
import { formatUpdatedOn } from "utils/date-utils";

type ProjectsTableProps = ProjectsTableBaseProps &
    (ProjectsTableMultiSelectProps | ProjectsTableSingleSelectProps);

interface ProjectsTableSingleSelectProps {
    isMultiSelect?: false;
    selected?: WorkstationStateRecord;
}

interface ProjectsTableMultiSelectProps {
    isMultiSelect: true;
    selected?: List<WorkstationStateRecord>;
}

interface ProjectsTableBaseProps {
    isLoading: boolean;
    onDeselect?: (workstation: WorkstationStateRecord) => void;
    onSelect?: (workstation: WorkstationStateRecord) => void;
    workstations: List<WorkstationStateRecord> | undefined;
}

const ProjectsTable: React.FC<ProjectsTableProps> = (
    props: ProjectsTableProps
) => {
    const {
        isLoading,
        onSelect,
        isMultiSelect = false,
        onDeselect,
        selected,
        workstations,
    } = props;
    const { mutate: deleteWorkstation } = useDeleteWorkstation();
    const hasProjects = isNotNilOrEmpty(workstations);
    const [
        isConfirmDialogOpen,
        handleOpenConfirmDialog,
        handleCloseConfirmDialog,
    ] = useDialog();
    const [filter, setFilter] = useState<string>("");

    const filteredWorkstations = useMemo(() => {
        if (isNilOrEmpty(filter)) {
            return workstations;
        }

        return workstations?.filter((workstation) =>
            workstation.project.name
                .toLowerCase()
                .includes(filter.toLowerCase())
        );
    }, [filter, workstations]);

    const isSelected = useCallback(
        (workstation: WorkstationStateRecord) => {
            if (List.isList(selected)) {
                return selected.includes(workstation);
            }

            return workstation === selected;
        },
        [selected]
    );

    const handleConfirmDelete = useCallback(() => {
        handleCloseConfirmDialog();
        if (!List.isList(selected)) {
            return;
        }

        selected.forEach((workstation) => {
            deleteWorkstation(workstation);
            onDeselect?.(workstation);
        });
    }, [deleteWorkstation, handleCloseConfirmDialog, onDeselect, selected]);

    return (
        <React.Fragment>
            <Table>
                <Table.Head>
                    <Table.SearchHeaderCell onChange={setFilter} value={filter}>
                        Name
                    </Table.SearchHeaderCell>
                    <Table.TextHeaderCell>Tracks</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
                    {isMultiSelect && List.isList(selected) && (
                        <Table.TextHeaderCell>
                            {selected?.count()} Selected
                            {!selected.isEmpty() && (
                                <IconButton
                                    appearance="minimal"
                                    icon={TrashIcon}
                                    intent="danger"
                                    marginLeft={majorScale(2)}
                                    onClick={handleOpenConfirmDialog}
                                />
                            )}
                        </Table.TextHeaderCell>
                    )}
                </Table.Head>
                {isLoading && <Spinner margin="auto" />}
                {!isLoading && (
                    <Table.Body>
                        {hasProjects &&
                            filteredWorkstations?.map((workstation) => (
                                <Table.Row
                                    isSelectable={true}
                                    isSelected={isSelected(workstation)}
                                    key={workstation.project.id}
                                    onDeselect={() => onDeselect?.(workstation)}
                                    onSelect={() => onSelect?.(workstation)}>
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
                        {isNilOrEmpty(filteredWorkstations) &&
                            isNotNilOrEmpty(filter) && (
                                <EmptyState
                                    description="No projects matching the filter were found."
                                    icon={<ProjectsIcon />}
                                    title="No Projects Found"
                                />
                            )}
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
            {isConfirmDialogOpen && (
                <ConfirmationDialog
                    alertDescription="Selected projects will be deleted."
                    onConfirm={handleConfirmDelete}
                />
            )}
        </React.Fragment>
    );
};

export { ProjectsTable };
