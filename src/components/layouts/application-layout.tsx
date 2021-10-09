import { SidebarNavigation } from "components/sidebar/sidebar-navigation";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { renderRoutes } from "react-router-config";

interface ApplicationLayoutProps extends RouteProps {}

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (
    props: ApplicationLayoutProps
) => {
    const { route } = props;
    return (
        <Pane display="flex" flexDirection="row">
            <Pane>
                <SidebarNavigation />
            </Pane>
            <Pane width="100%">{renderRoutes(route.routes)}</Pane>
        </Pane>
    );
};

export { ApplicationLayout };
