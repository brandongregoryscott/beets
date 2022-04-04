import { majorScale, Pane, Tab, TabNavigation } from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { useNavigate, useLocation, Outlet } from "react-router";
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
    const location = useLocation();
    const navigate = useNavigate();
    const isTabSelected = useCallback(
        (tab: PageTab): boolean =>
            location.pathname.endsWith(tab.toLowerCase()),
        [location]
    );
    const handleClick = useCallback(
        (tab: PageTab) => () => {
            navigate(upath.join(Sitemap.library.home, tab.toLowerCase()));
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
                <Pane marginBottom={majorScale(2)} marginTop={majorScale(2)}>
                    <Outlet />
                </Pane>
            </Pane>
        </Pane>
    );
};

export { LibraryLayout };
