import { WorkstationTabs } from "components/workstation/workstation-tabs";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { Outlet } from "react-router";

interface WorkstationLayoutProps extends RouteProps {}

const WorkstationLayout: React.FC<WorkstationLayoutProps> = (
    props: WorkstationLayoutProps
) => {
    return (
        <Pane height="100%" width="100%">
            <WorkstationTabs />
            <Outlet />
        </Pane>
    );
};

export { WorkstationLayout };
