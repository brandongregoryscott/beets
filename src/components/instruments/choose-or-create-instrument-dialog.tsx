import { FormDialog } from "components/forms/form-dialog";
import { InstrumentsTable } from "components/instruments/instruments-table";
import type { DialogProps } from "evergreen-ui";
import { majorScale, StepChartIcon, Tab, Tablist } from "evergreen-ui";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useState } from "react";
import { useGlobalState } from "utils/hooks/use-global-state";
import { InstrumentSettings } from "components/instruments/instrument-settings";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useTheme } from "utils/hooks/use-theme";
import { generateId } from "utils/id-utils";
import { EmptyState } from "components/empty-state";

interface ChooseOrCreateInstrumentDialogProps
    extends Pick<DialogProps, "onCloseComplete"> {
    instrument?: InstrumentRecord;
    onSubmit?: (instrument: InstrumentRecord) => void;
    showTabs?: boolean;
}

enum DialogTab {
    ChooseInstrument = "Choose Instrument",
    CreateInstrument = "Create Instrument",
}

const tabs = [DialogTab.CreateInstrument, DialogTab.ChooseInstrument];

const ChooseOrCreateInstrumentDialog: React.FC<
    ChooseOrCreateInstrumentDialogProps
> = (props: ChooseOrCreateInstrumentDialogProps) => {
    const {
        instrument: initialInstrument = new InstrumentRecord().merge({
            id: generateId(),
        }),
        onCloseComplete,
        onSubmit,
        showTabs = true,
    } = props;
    const { globalState } = useGlobalState();
    const { colors } = useTheme();
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles();
    const { resultObject: instruments, isLoading: isLoadingInstruments } =
        useListInstruments({ files });
    const [selectedTab, setSelectedTab] = useState<DialogTab>(
        globalState.isAuthenticated()
            ? DialogTab.CreateInstrument
            : DialogTab.ChooseInstrument
    );
    const [selectedInstrument, setSelectedInstrument] = useState<
        InstrumentRecord | undefined
    >();

    const handleTabSelected = useCallback(
        (tab: DialogTab) => () => {
            setSelectedTab(tab);
            // Clear out selected instrument if switching between tabs
            setSelectedInstrument(undefined);
        },
        [setSelectedInstrument, setSelectedTab]
    );

    const handleSelectInstrumentSubmit = useCallback(() => {
        onCloseComplete?.();
        onSubmit?.(selectedInstrument!);
    }, [onCloseComplete, onSubmit, selectedInstrument]);

    const handleCreateSubmit = useCallback(
        (instrument: InstrumentRecord) => {
            onSubmit?.(instrument);
            onCloseComplete?.();
        },
        [onCloseComplete, onSubmit]
    );

    return (
        <FormDialog
            hasFooter={selectedTab === DialogTab.ChooseInstrument}
            isConfirmDisabled={
                selectedTab === DialogTab.ChooseInstrument &&
                selectedInstrument == null
            }
            onCloseComplete={onCloseComplete}
            onSubmit={handleSelectInstrumentSubmit}
            title="Instrument Settings">
            {showTabs && (
                <Tablist marginBottom={majorScale(3)}>
                    {tabs.map((tab) => (
                        <Tab
                            isSelected={tab === selectedTab}
                            key={tab}
                            onSelect={handleTabSelected(tab)}>
                            {tab}
                        </Tab>
                    ))}
                </Tablist>
            )}
            {selectedTab === DialogTab.ChooseInstrument && (
                <InstrumentsTable
                    emptyState={
                        <EmptyState
                            description="Save a new Instrument to begin"
                            icon={<StepChartIcon />}
                            title="No Instruments Found"
                        />
                    }
                    files={files}
                    instruments={instruments}
                    isLoading={isLoadingFiles || isLoadingInstruments}
                    isSelectable={true}
                    onSelect={setSelectedInstrument}
                    selected={selectedInstrument}
                />
            )}
            {selectedTab === DialogTab.CreateInstrument && (
                <InstrumentSettings
                    instrument={initialInstrument}
                    onCancel={onCloseComplete}
                    onCreateOrUpdate={handleCreateSubmit}
                    onDelete={onCloseComplete}
                />
            )}
        </FormDialog>
    );
};

export { ChooseOrCreateInstrumentDialog };
