import { NestedRoutes } from "components/nested-routes";
import { WorkstationTabs } from "components/workstation/workstation-tabs";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";

interface WorkstationLayoutProps extends RouteProps {}

const WorkstationLayout: React.FC<WorkstationLayoutProps> = (
    props: WorkstationLayoutProps
) => {
    const { route } = props;
    return (
        <Pane width="100%" height="100%">
            <WorkstationTabs />
            <NestedRoutes route={route} />
        </Pane>
    );
};

export { WorkstationLayout };
