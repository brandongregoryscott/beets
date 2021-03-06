import {
    IconButton,
    majorScale,
    Pane,
    Tab,
    TabNavigation,
    CircleArrowUpIcon,
    Tooltip,
} from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { useNavigate, useLocation, Outlet } from "react-router";
import { useCallback, useRef } from "react";
import { HelpResource } from "enums/help-resource";
import { toPathCase } from "utils/route-utils";
import { useTheme } from "utils/hooks/use-theme";
import { HelpResourceTabs } from "constants/help-resource-tabs";
import { first, isEmpty } from "lodash";

interface HelpLayoutProps extends RouteProps {}

const HelpLayout: React.FC<HelpLayoutProps> = (props: HelpLayoutProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { colors } = useTheme();
    const pageRef = useRef<HTMLDivElement | null>(null);
    const isTabSelected = useCallback(
        (tab: HelpResource): boolean =>
            location.pathname.endsWith(toPathCase(tab)),
        [location]
    );
    const handleClick = useCallback(
        (tab: HelpResource) => () => {
            navigate(toPathCase(tab));
        },
        [navigate]
    );

    const handleReturnToTopClick = useCallback(() => {
        pageRef.current?.scrollTo({ top: 0 });
        const { hash, pathname } = window.location;
        if (isEmpty(hash)) {
            return;
        }

        // Strip off the hash when returning to the top of the page
        navigate(first(pathname.split("#"))!);
    }, [navigate]);

    return (
        <Pane height="100%" overflow="auto" ref={pageRef} width="100%">
            <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
                <TabNavigation>
                    {HelpResourceTabs.map((tab) => (
                        <Tab
                            isSelected={isTabSelected(tab)}
                            key={tab}
                            onSelect={handleClick(tab)}>
                            {tab}
                        </Tab>
                    ))}
                </TabNavigation>
                <Pane margin={majorScale(2)} maxWidth={majorScale(90)}>
                    <Outlet />
                </Pane>
            </Pane>
            <Pane
                bottom={majorScale(3)}
                position="absolute"
                right={majorScale(4)}>
                <Tooltip content="Return to top">
                    <IconButton
                        appearance="minimal"
                        background={colors.white}
                        icon={CircleArrowUpIcon}
                        onClick={handleReturnToTopClick}
                    />
                </Tooltip>
            </Pane>
        </Pane>
    );
};

export { HelpLayout };
