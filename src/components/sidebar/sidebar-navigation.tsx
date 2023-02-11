import { majorScale, Pane, Stack } from "evergreen-ui";
import { useTheme } from "hooks/use-theme";
import { SidebarLink } from "components/sidebar/sidebar-link";
import { ProfileMenuCard } from "components/sidebar/profile-menu-card";
import { Routes } from "routes";
import { useWorkstationState } from "hooks/use-workstation-state";
import { Sitemap } from "sitemap";
import { generatePath } from "utils/route-utils";

const SidebarNavigationWidth = majorScale(6);

const SidebarNavigation: React.FC = () => {
    const { colors } = useTheme();
    const { state } = useWorkstationState();

    const workstationPath = state.project.isPersisted()
        ? generatePath(Sitemap.root.project, { projectId: state.project.id })
        : Sitemap.root.newProject;

    return (
        <Pane
            background={colors.gray100}
            display="flex"
            flexDirection="column"
            height="100%"
            width={SidebarNavigationWidth}>
            <Pane display="flex" flexDirection="column">
                <SidebarLink
                    path={workstationPath}
                    route={Routes.root.children.workstation}
                />
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
