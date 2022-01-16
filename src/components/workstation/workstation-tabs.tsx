import { EditTab } from "components/workstation/edit-tab";
import { FileTab } from "components/workstation/file-tab";
import React from "react";

interface WorkstationTabsProps {}

const WorkstationTabs: React.FC<WorkstationTabsProps> = (
    props: WorkstationTabsProps
) => {
    return (
        <React.Fragment>
            <FileTab />
            <EditTab />
        </React.Fragment>
    );
};

export { WorkstationTabs };
