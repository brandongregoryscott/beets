import { majorScale, Pane, Tab, TabNavigation } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { useNavigate, useLocation, Outlet } from "react-router";
import { useCallback } from "react";
import { HelpResource } from "enums/help-resource";
import { joinPaths } from "utils/route-utils";

interface HelpLayoutProps extends RouteProps {}

const tabs = [HelpResource.Overview, HelpResource.HowTo];

const HelpLayout: React.FC<HelpLayoutProps> = (props: HelpLayoutProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isTabSelected = useCallback(
        (tab: HelpResource): boolean =>
            location.pathname.endsWith(joinPaths(tab)),
        [location]
    );
    const handleClick = useCallback(
        (tab: HelpResource) => () => {
            navigate(joinPaths(tab));
        },
        [navigate]
    );

    return (
        <Pane height="100%" overflow="auto" width="100%">
            <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
                <TabNavigation>
                    {tabs.map((tab) => (
                        <Tab
                            isSelected={isTabSelected(tab)}
                            key={tab}
                            onSelect={handleClick(tab)}>
                            {tab}
                        </Tab>
                    ))}
                </TabNavigation>
                <Pane margin={majorScale(2)}>
                    <Outlet />
                </Pane>
            </Pane>
        </Pane>
    );
};

export { HelpLayout };
