import { NestedRoutes } from "components/nested-routes";
import { WorkstationTab } from "components/workstation/workstation-tab";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { renderRoutes } from "utils/route-utils";

interface WorkstationLayoutProps extends RouteProps {}

const WorkstationLayout: React.FC<WorkstationLayoutProps> = (
    props: WorkstationLayoutProps
) => {
    const { route } = props;
    return (
        <Pane width="100%">
            <WorkstationTab />
            <NestedRoutes route={route} />
        </Pane>
    );
};

export { WorkstationLayout };
