import { SidebarNavigation } from "components/sidebar/sidebar-navigation";
import { Pane } from "evergreen-ui";
import { Outlet } from "react-router";
import { useSubscribeToAuthStatus } from "hooks/supabase/use-subscribe-to-auth-status";
import { useScrollToHash } from "hooks/use-scroll-to-hash";

const ApplicationLayout: React.FC = () => {
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
