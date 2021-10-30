import { Dialog, DialogProps, Table } from "evergreen-ui";
import { ProjectRecord } from "models/project-record";
import { useCallback, useState } from "react";
import { useListProjects } from "utils/hooks/domain/projects/use-list-projects";

interface OpenProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const OpenProjectDialog: React.FC<OpenProjectDialogProps> = (
    props: OpenProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const { resultObject: projects, isLoading } = useListProjects();
    const [selected, setSelected] = useState<ProjectRecord | undefined>(
        undefined
    );
    const handleDeselect = useCallback(() => {
        setSelected(undefined);
    }, [setSelected]);

    const title = "Open Project";
    const confirmLabel = "Open";
    return (
        <Dialog
            confirmLabel={confirmLabel}
            isConfirmLoading={false}
            isShown={isShown}
            onConfirm={() => {}}
            onCloseComplete={onCloseComplete}
            shouldCloseOnOverlayClick={false}
            title={title}>
            <Table>
                <Table.Head>
                    <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
                </Table.Head>
                {projects?.map((project) => (
                    <Table.Row
                        isSelectable={true}
                        isSelected={selected === project}
                        onDeselect={handleDeselect}
                        onSelect={() => setSelected(project)}>
                        <Table.TextCell>{project.name}</Table.TextCell>
                        <Table.TextCell>
                            {project.getUpdatedOn()}
                        </Table.TextCell>
                    </Table.Row>
                ))}
            </Table>
        </Dialog>
    );
};

export { OpenProjectDialog };
