import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { renderRoutes } from "utils/route-utils";

interface WorkstationLayoutProps extends RouteProps {}

const WorkstationLayout: React.FC<WorkstationLayoutProps> = (
    props: WorkstationLayoutProps
) => {
    const { route } = props;
    return <Pane width="100%">{renderRoutes(route.routes)}</Pane>;
};

export { WorkstationLayout };
