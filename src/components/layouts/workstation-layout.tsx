import { WorkstationTabs } from "components/workstation/workstation-tabs";
import { Pane } from "evergreen-ui";
import { Outlet } from "react-router";

const WorkstationLayout: React.FC = () => {
    return (
        <Pane height="100%" width="100%">
            <WorkstationTabs />
            <Outlet />
        </Pane>
    );
};

export { WorkstationLayout };
