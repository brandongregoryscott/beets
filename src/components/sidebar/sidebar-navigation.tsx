import { Pane } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { SidebarLink } from "components/sidebar/sidebar-link";
import { ProfileMenuCard } from "components/sidebar/profile-menu-card";
import { Routes } from "routes";
import { flattenRoutes } from "utils/route-utils";

interface SidebarNavigationProps {}

const SidebarNavigation: React.FC<SidebarNavigationProps> = (
    props: SidebarNavigationProps
) => {
    const theme = useTheme();

    return (
        <Pane
            background={theme.colors.gray100}
            display="flex"
            flexDirection="column"
            height="100vh">
            <SidebarLink route={Routes.root.routes.workstation} />
            <SidebarLink
                matchingRoutes={flattenRoutes(
                    Routes.root.routes.library.routes
                )}
                route={Routes.root.routes.library}
            />
            <Pane
                display="flex"
                flexDirection="column"
                flexGrow={1}
                justifyContent="flex-end">
                <ProfileMenuCard />
            </Pane>
        </Pane>
    );
};

export { SidebarNavigation };
