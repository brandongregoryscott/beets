import { ConfirmationDialog } from "components/confirmation-dialog";
import { Flex } from "components/flex";
import { InstrumentSettings } from "components/instruments/instrument-settings";
import { InstrumentsTable } from "components/instruments/instruments-table";
import {
    Pane,
    majorScale,
    EmptyState,
    Icon,
    BanCircleIcon,
    StepChartIcon,
} from "evergreen-ui";
import { RouteProps } from "interfaces/route-props";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useState } from "react";
import { useDialog } from "utils/hooks/use-dialog";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTheme } from "utils/hooks/use-theme";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";

interface InstrumentsPageProps extends RouteProps {}

const InstrumentsPage: React.FC<InstrumentsPageProps> = (
    props: InstrumentsPageProps
) => {
    const { globalState } = useGlobalState();
    const { colors, intents } = useTheme();
    const [instrument, setInstrument] = useState<
        InstrumentRecord | undefined
    >();
    const [initialInstrument, setInitialInstrument] = useState<
        InstrumentRecord | undefined
    >();
    const [
        confirmationDialogOpen,
        handleOpenConfirmationDialog,
        closeConfirmationDialog,
    ] = useDialog();
    useTimeoutRender();

    const resetInstrument = useCallback(() => {
        setInstrument(undefined);
        setInitialInstrument(undefined);
    }, []);

    const handleCancel = useCallback(() => {
        if (!initialInstrument?.equals(instrument)) {
            handleOpenConfirmationDialog();
            return;
        }

        resetInstrument();
    }, [
        handleOpenConfirmationDialog,
        initialInstrument,
        instrument,
        resetInstrument,
    ]);

    const handleConfirmDiscardChanges = useCallback(() => {
        resetInstrument();
        closeConfirmationDialog();
    }, [closeConfirmationDialog, resetInstrument]);

    const handleChange = useCallback((instrument: InstrumentRecord) => {
        setInstrument(instrument);
    }, []);

    const handleCreateOrUpdate = useCallback((instrument: InstrumentRecord) => {
        setInstrument(instrument);
        setInitialInstrument(instrument);
    }, []);

    const handleCreate = useCallback(() => {
        const newInstrument = new InstrumentRecord();
        setInstrument(newInstrument);
        setInitialInstrument(newInstrument);
    }, []);

    const handleSelect = useCallback((instrument: InstrumentRecord) => {
        setInitialInstrument(instrument);
        setInstrument(instrument);
    }, []);

    const handleDelete = useCallback(() => {
        resetInstrument();
    }, [resetInstrument]);

    return (
        <Pane marginRight={majorScale(2)} marginTop={majorScale(1)}>
            {globalState.isAuthenticated() && (
                <Flex.Row>
                    <Pane maxWidth="40%" minWidth="40%">
                        <InstrumentsTable
                            isSelectable={true}
                            onSelect={handleSelect}
                            selected={initialInstrument}
                        />
                    </Pane>
                    <Flex.Column
                        marginLeft={majorScale(2)}
                        maxWidth="60%"
                        minWidth="60%">
                        {instrument != null && (
                            <Pane maxWidth="75%">
                                <InstrumentSettings
                                    confirmLabel="Save"
                                    instrument={instrument}
                                    onCancel={handleCancel}
                                    onChange={handleChange}
                                    onCreateOrUpdate={handleCreateOrUpdate}
                                    onDelete={handleDelete}
                                />
                            </Pane>
                        )}
                        {instrument == null && (
                            <Pane marginRight={majorScale(2)}>
                                <EmptyState
                                    background="dark"
                                    icon={
                                        <Icon
                                            color={colors.gray500}
                                            icon={StepChartIcon}
                                        />
                                    }
                                    iconBgColor={colors.gray200}
                                    primaryCta={
                                        <EmptyState.PrimaryButton
                                            onClick={handleCreate}>
                                            Create Instrument
                                        </EmptyState.PrimaryButton>
                                    }
                                    title="Select an Instrument on the left to edit or create a new one."
                                />
                            </Pane>
                        )}
                        {confirmationDialogOpen && (
                            <ConfirmationDialog
                                alertDescription="Cancelling or selecting a new Instrument will discard your changes."
                                alertTitle="You have unsaved changes."
                                onCloseComplete={closeConfirmationDialog}
                                onConfirm={handleConfirmDiscardChanges}
                            />
                        )}
                    </Flex.Column>
                </Flex.Row>
            )}
            {!globalState.isAuthenticated() && (
                <Pane maxWidth={majorScale(60)}>
                    <EmptyState
                        background="dark"
                        icon={
                            <Icon
                                color={intents.danger.icon}
                                icon={BanCircleIcon}
                            />
                        }
                        iconBgColor={intents.danger.background}
                        title="Please register to create instruments."
                    />
                </Pane>
            )}
        </Pane>
    );
};

export { InstrumentsPage };
