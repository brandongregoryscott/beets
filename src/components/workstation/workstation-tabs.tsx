import { EditTab } from "components/workstation/edit-tab";
import { FileTab } from "components/workstation/file-tab";
import { HelpTab } from "components/workstation/help-tab";
import { majorScale, Pane } from "evergreen-ui";
import React from "react";

const WorkstationTabsHeight = majorScale(4);

const WorkstationTabs: React.FC = () => {
    return (
        <Pane height={WorkstationTabsHeight}>
            <FileTab />
            <EditTab />
            <HelpTab />
        </Pane>
    );
};

export { WorkstationTabs, WorkstationTabsHeight };
