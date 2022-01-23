import { FormDialog } from "components/forms/form-dialog";
import { InstrumentsTable } from "components/instruments/instruments-table";
import { DialogProps, majorScale, Tab, Tablist } from "evergreen-ui";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useState } from "react";
import { useGlobalState } from "utils/hooks/use-global-state";
import { InstrumentSettings } from "components/instruments/instrument-settings";

interface ChooseOrCreateInstrumentDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {
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
        instrument: initialInstrument,
        isShown,
        onCloseComplete,
        onSubmit,
        showTabs = true,
    } = props;
    const { globalState } = useGlobalState();
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
            isShown={isShown}
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
                    isSelectable={true}
                    onSelect={setSelectedInstrument}
                    selected={selectedInstrument}
                />
            )}
            {selectedTab === DialogTab.CreateInstrument && (
                <InstrumentSettings
                    instrument={initialInstrument}
                    onCreateOrUpdate={handleCreateSubmit}
                    onDelete={onCloseComplete}
                />
            )}
        </FormDialog>
    );
};

export { ChooseOrCreateInstrumentDialog };
