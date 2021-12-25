import {
    Pane,
    majorScale,
    EmptyState,
    Icon,
    BanCircleIcon,
    Paragraph,
} from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import React from "react";
import { theme } from "theme";
import { useGlobalState } from "utils/hooks/use-global-state";

interface InstrumentsPageProps extends RouteProps {}

const InstrumentsPage: React.FC<InstrumentsPageProps> = (
    props: InstrumentsPageProps
) => {
    const { globalState } = useGlobalState();
    return (
        <React.Fragment>
            <Pane marginTop={majorScale(1)}>
                {globalState.isAuthenticated() && (
                    <Pane>
                        <Paragraph>Coming soon</Paragraph>
                    </Pane>
                )}
                {!globalState.isAuthenticated() && (
                    <Pane maxWidth={majorScale(60)}>
                        <EmptyState
                            background="dark"
                            icon={
                                <Icon
                                    color={theme.intents.danger.icon}
                                    icon={BanCircleIcon}
                                />
                            }
                            iconBgColor={theme.intents.danger.background}
                            title="Please register to create instruments."
                        />
                    </Pane>
                )}
            </Pane>
        </React.Fragment>
    );
};

export { InstrumentsPage };
