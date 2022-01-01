import { NestedRoutes } from "components/nested-routes";
import { SidebarNavigation } from "components/sidebar/sidebar-navigation";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { useSubscribeToAuthStatus } from "utils/hooks/supabase/use-subscribe-to-auth-status";

interface ApplicationLayoutProps extends RouteProps {}

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (
    props: ApplicationLayoutProps
) => {
    const { route } = props;
    useSubscribeToAuthStatus();

    return (
        <Pane display="flex" flexDirection="row">
            <Pane>
                <SidebarNavigation />
            </Pane>
            <Pane width="100%">
                <NestedRoutes route={route} />
            </Pane>
        </Pane>
    );
};

export { ApplicationLayout };
