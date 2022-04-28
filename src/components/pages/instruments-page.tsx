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
import React, { useCallback, useMemo, useState } from "react";
import { useDialog } from "utils/hooks/use-dialog";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTheme } from "utils/hooks/use-theme";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";
import { generateId } from "utils/id-utils";

interface InstrumentsPageProps extends RouteProps {}

const InstrumentsPage: React.FC<InstrumentsPageProps> = (
    props: InstrumentsPageProps
) => {
    const { globalState } = useGlobalState();
    const { colors, intents } = useTheme();
    const [stagedInstrument, setStagedInstrument] = useState<
        InstrumentRecord | undefined
    >();
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

    const isDirty = useMemo(
        () =>
            initialInstrument != null && !initialInstrument.equals(instrument),
        [initialInstrument, instrument]
    );

    const resetInstrument = useCallback(() => {
        setInstrument(undefined);
        setInitialInstrument(undefined);
    }, []);

    const handleCancel = useCallback(() => {
        if (isDirty) {
            handleOpenConfirmationDialog();
            return;
        }

        resetInstrument();
    }, [handleOpenConfirmationDialog, isDirty, resetInstrument]);

    const handleConfirmDiscardChanges = useCallback(() => {
        if (stagedInstrument == null) {
            resetInstrument();
            closeConfirmationDialog();
            return;
        }

        setInitialInstrument(stagedInstrument);
        setInstrument(stagedInstrument);
        setStagedInstrument(undefined);
        closeConfirmationDialog();
    }, [closeConfirmationDialog, resetInstrument, stagedInstrument]);

    const handleChange = useCallback((instrument: InstrumentRecord) => {
        setInstrument(instrument);
    }, []);

    const handleCreateOrUpdate = useCallback((instrument: InstrumentRecord) => {
        setInstrument(instrument);
        setInitialInstrument(instrument);
    }, []);

    const handleCreate = useCallback(() => {
        const newInstrument = new InstrumentRecord().merge({
            id: generateId(),
        });
        setInstrument(newInstrument);
        setInitialInstrument(newInstrument);
    }, []);

    const handleSelect = useCallback(
        (selectedInstrument: InstrumentRecord) => {
            if (isDirty) {
                // Persist instrument selection but show warning dialog if current form is dirty
                setStagedInstrument(selectedInstrument);
                handleOpenConfirmationDialog();
                return;
            }

            setInitialInstrument(selectedInstrument);
            setInstrument(selectedInstrument);
        },
        [handleOpenConfirmationDialog, isDirty]
    );

    const handleDelete = useCallback(() => {
        resetInstrument();
    }, [resetInstrument]);

    return (
        <Pane marginRight={majorScale(2)} marginTop={majorScale(1)}>
            {globalState.isAuthenticated() && (
                <Flex.Row>
                    <Pane width={majorScale(65)}>
                        <InstrumentsTable
                            isSelectable={true}
                            onSelect={handleSelect}
                            selected={initialInstrument}
                        />
                    </Pane>
                    <Flex.Column
                        marginLeft={majorScale(2)}
                        width={majorScale(60)}>
                        {instrument != null && (
                            <InstrumentSettings
                                confirmLabel="Save"
                                instrument={instrument}
                                /** Explicitly setting key here to force a re-render when instrument is changed */
                                key={instrument.id}
                                onCancel={handleCancel}
                                onChange={handleChange}
                                onCreateOrUpdate={handleCreateOrUpdate}
                                onDelete={handleDelete}
                            />
                        )}
                        {instrument == null && (
                            <Pane marginRight={majorScale(2)}>
                                <EmptyState
                                    background="dark"
                                    description="Select an Instrument to edit or create a new one."
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
                                    title="Select an Instrument"
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
