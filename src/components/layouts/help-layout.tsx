import { majorScale, Pane, Tab, TabNavigation } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { NestedRoutes } from "components/nested-routes";
import { useHistory, useLocation } from "react-router";
import { useCallback } from "react";
import { Sitemap } from "sitemap";
import upath from "upath";
import { HelpResource } from "enums/help-resource";

interface HelpLayoutProps extends RouteProps {}

const tabs = Object.values(HelpResource);

const HelpLayout: React.FC<HelpLayoutProps> = (props: HelpLayoutProps) => {
    const { route } = props;
    const location = useLocation();
    const history = useHistory();
    const isTabSelected = useCallback(
        (tab: HelpResource): boolean =>
            location.pathname.endsWith(tab.toLowerCase()),
        [location]
    );
    const handleClick = useCallback(
        (tab: HelpResource) => () => {
            history.push(upath.join(Sitemap.help.home, tab.toLowerCase()));
        },
        [history]
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
                    <NestedRoutes route={route} />
                </Pane>
            </Pane>
        </Pane>
    );
};

export { HelpLayout };
