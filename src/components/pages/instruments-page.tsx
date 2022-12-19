import { ConfirmationDialog } from "components/confirmation-dialog";
import { EmptyState } from "components/empty-state";
import { Flex } from "components/flex";
import { InstrumentSettings } from "components/instruments/instrument-settings";
import { InstrumentsTable } from "components/instruments/instruments-table";
import { Pane, majorScale, BanCircleIcon, StepChartIcon } from "evergreen-ui";
import { useListFiles } from "generated/hooks/domain/files/use-list-files";
import { useListInstruments } from "generated/hooks/domain/instruments/use-list-instruments";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useMemo, useState } from "react";
import { hasValues } from "utils/collection-utils";
import { useDialog } from "utils/hooks/use-dialog";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTheme } from "utils/hooks/use-theme";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";
import { generateId } from "utils/id-utils";

const InstrumentsPage: React.FC = () => {
    const { globalState } = useGlobalState();
    const { intents } = useTheme();
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles();
    const { resultObject: instruments, isLoading: isLoadingInstruments } =
        useListInstruments();

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

    const isLoading = isLoadingFiles || isLoadingInstruments;
    const hasInstruments = !isLoading && hasValues(instruments);

    return (
        <Pane marginRight={majorScale(2)} marginTop={majorScale(1)}>
            {globalState.isAuthenticated() && (
                <Flex.Row>
                    <Pane width={majorScale(65)}>
                        <InstrumentsTable
                            emptyState={
                                <EmptyState
                                    description="Create a new Instrument to begin"
                                    icon={<StepChartIcon />}
                                    primaryCta={
                                        <EmptyState.PrimaryButton
                                            onClick={handleCreate}>
                                            Create Instrument
                                        </EmptyState.PrimaryButton>
                                    }
                                    title="No Instruments Found"
                                />
                            }
                            files={files}
                            instruments={instruments}
                            isLoading={isLoadingFiles || isLoadingInstruments}
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
                        {instrument == null && hasInstruments && (
                            <Pane marginRight={majorScale(2)}>
                                <EmptyState
                                    description="Select an Instrument to edit or create a new one."
                                    icon={<StepChartIcon />}
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
                        icon={<BanCircleIcon />}
                        iconBgColor={intents.danger.background}
                        iconColor={intents.danger.icon}
                        title="Please register to create instruments."
                    />
                </Pane>
            )}
        </Pane>
    );
};

export { InstrumentsPage };
