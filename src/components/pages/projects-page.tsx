import { ProjectsTable } from "components/projects/projects-table";
import { Pane } from "evergreen-ui";
import { useListWorkstations } from "hooks/use-list-workstations";
import { useTimeoutRender } from "hooks/use-timeout-render";
import { List } from "immutable";
import type { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useCallback, useState } from "react";

const ProjectsPage: React.FC = () => {
    const { resultObject: workstations, isLoading } = useListWorkstations({});
    const [selected, setSelected] = useState<List<WorkstationStateRecord>>(
        List()
    );
    useTimeoutRender();

    const handleDeselect = useCallback(
        (workstation: WorkstationStateRecord) => {
            setSelected((prev) =>
                prev.filter(
                    (existingWorkstation) => existingWorkstation !== workstation
                )
            );
        },
        []
    );

    const handleSelect = useCallback((workstation: WorkstationStateRecord) => {
        setSelected((prev) => prev.push(workstation));
    }, []);

    return (
        <Pane>
            <ProjectsTable
                isLoading={isLoading}
                isMultiSelect={true}
                onDeselect={handleDeselect}
                onSelect={handleSelect}
                selected={selected}
                workstations={workstations}
            />
        </Pane>
    );
};

export { ProjectsPage };
