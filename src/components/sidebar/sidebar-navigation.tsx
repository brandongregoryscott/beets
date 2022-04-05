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
                <SidebarLink route={Routes.root.routes.workstation} />
                <SidebarLink
                    matchingRoutes={[Routes.root.routes.library]}
                    route={Routes.root.routes.library}
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
