import { SidebarNavigation } from "components/sidebar/sidebar-navigation";
import { Pane } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { Outlet } from "react-router";
import { useSubscribeToAuthStatus } from "utils/hooks/supabase/use-subscribe-to-auth-status";
import { useScrollToHash } from "utils/hooks/use-scroll-to-hash";

interface ApplicationLayoutProps extends RouteProps {}

const ApplicationLayout: React.FC<ApplicationLayoutProps> = (
    props: ApplicationLayoutProps
) => {
    useSubscribeToAuthStatus();
    useScrollToHash();

    return (
        <Pane display="flex" flexDirection="row" height="100%" width="100%">
            <SidebarNavigation />
            <Outlet />
        </Pane>
    );
};

export { ApplicationLayout };
