import { Pane } from "evergreen-ui";
import {
    LibraryPageRoute,
    LoginPageRoute,
    LogoutPageRoute,
    WorkstationPageRoute,
} from "routes";
import { useTheme } from "utils/hooks/use-theme";
import { SidebarLink } from "components/sidebar/sidebar-link";
import { useGlobalState } from "utils/hooks/use-global-state";

interface SidebarNavigationProps {}

const SidebarNavigation: React.FC<SidebarNavigationProps> = (
    props: SidebarNavigationProps
) => {
    const theme = useTheme();
    const { globalState } = useGlobalState();
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
                {!globalState.isAuthenticated() && (
                    <SidebarLink route={LoginPageRoute} />
                )}
                {globalState.isAuthenticated() && (
                    <SidebarLink route={LogoutPageRoute} />
                )}
            </Pane>
        </Pane>
    );
};

export { SidebarNavigation };
