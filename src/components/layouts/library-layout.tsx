import { majorScale, Pane, Tab, TabNavigation } from "evergreen-ui";
import { Outlet } from "react-router";
import { useCallback } from "react";
import { useRouter } from "hooks/use-router";

enum LibraryTab {
    Files = "Files",
    Instruments = "Instruments",
    Projects = "Projects",
}

const tabs = Object.values(LibraryTab);

const LibraryLayout: React.FC = () => {
    const { navigate, location } = useRouter();
    const isTabSelected = useCallback(
        (tab: LibraryTab): boolean =>
            location.pathname.endsWith(tab.toLowerCase()),
        [location]
    );
    const handleClick = useCallback(
        (tab: LibraryTab) => () => {
            navigate(tab.toLowerCase());
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
