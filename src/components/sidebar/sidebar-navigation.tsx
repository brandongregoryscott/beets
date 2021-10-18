import { Pane } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { SidebarLink } from "components/sidebar/sidebar-link";
import { ProfileMenuCard } from "components/sidebar/profile-menu-card";
import { Routes } from "routes";

interface SidebarNavigationProps {}

const SidebarNavigation: React.FC<SidebarNavigationProps> = (
    props: SidebarNavigationProps
) => {
    const theme = useTheme();

    return (
        <Pane
            display="flex"
            flexDirection="column"
            background={theme.colors.gray100}
            height="100vh">
            <SidebarLink route={Routes.root.routes.workstation} />
            <SidebarLink route={Routes.root.routes.library} />
            <Pane
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
                flexGrow={1}>
                <ProfileMenuCard />
            </Pane>
        </Pane>
    );
};

export { SidebarNavigation };
