import { EditTab } from "components/workstation/edit-tab";
import { FileTab } from "components/workstation/file-tab";
import { majorScale, Pane } from "evergreen-ui";
import React from "react";

interface WorkstationTabsProps {}

const WorkstationTabsHeight = majorScale(4);

const WorkstationTabs: React.FC<WorkstationTabsProps> = (
    props: WorkstationTabsProps
) => {
    return (
        <Pane height={WorkstationTabsHeight}>
            <FileTab />
            <EditTab />
        </Pane>
    );
};

export { WorkstationTabs, WorkstationTabsHeight };
