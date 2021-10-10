import { Pane } from "evergreen-ui";
import { LibraryPageRoute, WorkstationPageRoute } from "routes";
import { useTheme } from "utils/hooks/use-theme";
import { SidebarLink } from "components/sidebar/sidebar-link";
import { ProfileMenuCard } from "components/sidebar/profile-menu-card";

interface SidebarNavigationProps {}

const SidebarNavigation: React.FC<SidebarNavigationProps> = (
    props: SidebarNavigationProps
) => {
    const theme = useTheme();

    return (
        <Pane
            display="flex"
            flexDirection="column"
            background={theme.colors.gray75}
            height="100vh">
            <SidebarLink route={WorkstationPageRoute} />
            <SidebarLink route={LibraryPageRoute} />
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
