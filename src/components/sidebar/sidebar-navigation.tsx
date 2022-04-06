import { majorScale, Pane } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { SidebarLink } from "components/sidebar/sidebar-link";
import { ProfileMenuCard } from "components/sidebar/profile-menu-card";
import { Routes } from "routes";

interface SidebarNavigationProps {}

const SidebarNavigationWidth = majorScale(6);

const SidebarNavigation: React.FC<SidebarNavigationProps> = (
    props: SidebarNavigationProps
) => {
    const theme = useTheme();

    return (
        <Pane
            background={theme.colors.gray100}
            display="flex"
            flexDirection="column"
            height="100%"
            width={SidebarNavigationWidth}>
            <Pane display="flex" flexDirection="column">
                <SidebarLink route={Routes.root.children.workstation} />
                <SidebarLink
                    matchingRoutes={[Routes.root.children.library]}
                    route={Routes.root.children.library}
                />
            </Pane>
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

export { SidebarNavigation, SidebarNavigationWidth };
