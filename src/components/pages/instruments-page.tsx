import { InstrumentSettingsDialog } from "components/instruments/instrument-settings-dialog";
import { InstrumentsTable } from "components/instruments/instruments-table";
import {
    Pane,
    majorScale,
    EmptyState,
    Icon,
    BanCircleIcon,
    Paragraph,
} from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useState } from "react";
import { theme } from "theme";
import { useGlobalState } from "utils/hooks/use-global-state";

interface InstrumentsPageProps extends RouteProps {}

const InstrumentsPage: React.FC<InstrumentsPageProps> = (
    props: InstrumentsPageProps
) => {
    const { globalState } = useGlobalState();
    const [instrument, setInstrument] = useState<
        InstrumentRecord | undefined
    >();

    const handleCloseDialog = useCallback(
        () => setInstrument(undefined),
        [setInstrument]
    );

    return (
        <Pane marginRight={majorScale(2)} marginTop={majorScale(1)}>
            {globalState.isAuthenticated() && (
                <Pane maxWidth={majorScale(80)}>
                    <InstrumentsTable
                        isSelectable={true}
                        onSelect={setInstrument}
                        selected={instrument}
                    />
                    {instrument != null && (
                        <InstrumentSettingsDialog
                            instrument={instrument}
                            isShown={true}
                            onCloseComplete={handleCloseDialog}
                            showTabs={false}
                        />
                    )}
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
    );
};

export { InstrumentsPage };
