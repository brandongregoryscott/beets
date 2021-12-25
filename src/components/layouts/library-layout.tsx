import { majorScale, Pane, Tab, TabNavigation } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { NestedRoutes } from "components/nested-routes";
import { useHistory, useLocation } from "react-router";
import { useCallback } from "react";
import { Sitemap } from "sitemap";
import upath from "upath";

interface LibraryLayoutProps extends RouteProps {}

enum PageTab {
    Files = "Files",
    Instruments = "Instruments",
}

const tabs = Object.values(PageTab);

const LibraryLayout: React.FC<LibraryLayoutProps> = (
    props: LibraryLayoutProps
) => {
    const { route } = props;
    const location = useLocation();
    const history = useHistory();
    const isTabSelected = useCallback(
        (tab: PageTab): boolean =>
            location.pathname.endsWith(tab.toLowerCase()),
        [location]
    );
    const handleClick = useCallback(
        (tab: PageTab) => () => {
            history.push(upath.join(Sitemap.library.home, tab.toLowerCase()));
        },
        [history]
    );

    return (
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
            <Pane marginTop={majorScale(1)}>
                <NestedRoutes route={route} />
            </Pane>
        </Pane>
    );
};

export { LibraryLayout };
