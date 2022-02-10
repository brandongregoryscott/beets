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
        <Pane display="flex" flexDirection="row" height="100%">
            <SidebarNavigation />
            <NestedRoutes route={route} />
        </Pane>
    );
};

export { ApplicationLayout };
