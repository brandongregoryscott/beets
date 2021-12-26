import { ErrorAlert } from "components/error-alert";
import { FileSelectMenu } from "components/file-select-menu";
import { FormDialog } from "components/forms/form-dialog";
import { FormField } from "components/forms/form-field";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { ValueRequiredState } from "constants/validation-states";
import {
    Button,
    DialogProps,
    majorScale,
    Spinner,
    StyleIcon,
    EmptyState,
    Tab,
    Table,
    Tablist,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
import { useListInstruments } from "generated/hooks/domain/instruments/use-list-instruments";
import { Instrument } from "generated/interfaces/instrument";
import { ValidationState } from "interfaces/validation-state";
import { capitalize, isEmpty } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { getFileById } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useInput } from "utils/hooks/use-input";
import { useNumberInput } from "utils/hooks/use-number-input";
import { useTheme } from "utils/hooks/use-theme";
import { enumToSelectMenuItems } from "utils/select-menu-utils";

interface InstrumentSettingsDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {
    instrument?: InstrumentRecord;
    onSubmit?: (instrument: InstrumentRecord) => void;
    showTabs?: boolean;
}

enum DialogTab {
    CreateInstrument = "Create Instrument",
    ChooseInstrument = "Choose Instrument",
}

const curveOptions: Array<SelectMenuItem<InstrumentCurve>> =
    enumToSelectMenuItems(InstrumentCurve);

const tabs = Object.values(DialogTab);

const InstrumentSettingsDialog: React.FC<InstrumentSettingsDialogProps> = (
    props: InstrumentSettingsDialogProps
) => {
    const {
        instrument: initialInstrument,
        isShown,
        onCloseComplete,
        onSubmit,
        showTabs = true,
    } = props;
    const theme = useTheme();
    const {
        error,
        mutate: createOrUpdateInstrument,
        isLoading: isCreating,
    } = useCreateOrUpdateInstrument({
        onSuccess: (instrument: InstrumentRecord) => {
            toaster.success(
                `Instrument '${instrument.name}' successfully created!`
            );
            onCloseComplete?.();
            onSubmit?.(instrument);
        },
    });

    const { resultObject: files } = useListFiles();
    const { resultObject: instruments, isLoading: isLoadingInstruments } =
        useListInstruments();

    const {
        value: name,
        onChange: onNameChange,
        setValidation: setNameValidation,
        ...nameValidation
    } = useInput({
        initialValue: initialInstrument?.name,
    });
    const {
        value: release,
        onChange: onReleaseChange,
        ...releaseValidation
    } = useNumberInput({
        initialValue: initialInstrument?.release,
        min: 0,
        max: 1,
    });
    const [fileValidation, setFileValidation] = useState<
        ValidationState | undefined
    >();
    const [file, setFile] = useState<FileRecord | undefined>(
        getFileById(initialInstrument?.file_id, files)
    );
    const [curve, setCurve] = useState<InstrumentCurve>(
        InstrumentCurve.Exponential
    );
    const [selectedTab, setSelectedTab] = useState<DialogTab>(
        DialogTab.CreateInstrument
    );
    const [selectedInstrument, setSelectedInstrument] = useState<
        InstrumentRecord | undefined
    >();
    const handleFileSelected = useCallback(
        (file: FileRecord) => {
            setFileValidation(undefined);
            setFile(file);
        },
        [setFile, setFileValidation]
    );

    const handleCreateInstrumentSubmit = useCallback(() => {
        if (nameValidation?.isInvalid || releaseValidation.isInvalid) {
            return;
        }

        const hasSubmissionErrors = isNilOrEmpty(name) || file == null;
        if (isNilOrEmpty(name)) {
            setNameValidation(ValueRequiredState);
        }

        if (file == null) {
            setFileValidation(ValueRequiredState);
        }

        if (hasSubmissionErrors) {
            return;
        }

        const updatedValues: Partial<Instrument> = {
            curve,
            name,
            release,
            file_id: file?.id,
        };

        const instrument =
            initialInstrument?.merge(updatedValues) ??
            new InstrumentRecord(updatedValues);

        createOrUpdateInstrument(instrument);
    }, [
        createOrUpdateInstrument,
        curve,
        file,
        initialInstrument,
        name,
        nameValidation,
        release,
        releaseValidation,
        setFileValidation,
        setNameValidation,
    ]);

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

    const handleSubmit = useCallback(() => {
        if (selectedTab === DialogTab.ChooseInstrument) {
            handleSelectInstrumentSubmit();
            return;
        }

        handleCreateInstrumentSubmit();
    }, [
        handleCreateInstrumentSubmit,
        handleSelectInstrumentSubmit,
        selectedTab,
    ]);

    const hasInstruments = !isLoadingInstruments && !isEmpty(instruments);
    return (
        <FormDialog
            isConfirmDisabled={
                selectedTab === DialogTab.ChooseInstrument &&
                selectedInstrument == null
            }
            isConfirmLoading={isCreating}
            isShown={isShown}
            onCloseComplete={onCloseComplete}
            onSubmit={handleSubmit}
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
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Sample</Table.TextHeaderCell>
                        <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body>
                        {isLoadingInstruments && <Spinner margin="auto" />}
                        {hasInstruments &&
                            instruments?.map((instrument) => (
                                <Table.Row
                                    isSelectable={true}
                                    isSelected={instrument.equals(
                                        selectedInstrument
                                    )}
                                    onSelect={() =>
                                        setSelectedInstrument(instrument)
                                    }>
                                    <Table.TextCell>
                                        {instrument.name}
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        {
                                            getFileById(
                                                instrument.file_id,
                                                files
                                            )?.name
                                        }
                                    </Table.TextCell>
                                    <Table.TextCell>
                                        {formatUpdatedOn(
                                            instrument.getUpdatedOn()
                                        )}
                                    </Table.TextCell>
                                </Table.Row>
                            ))}
                        {!hasInstruments && (
                            <EmptyState
                                description="Save a new instrument to begin"
                                icon={
                                    <StyleIcon color={theme.colors.gray800} />
                                }
                                iconBgColor={theme.colors.gray100}
                                title="No Instruments Found"
                            />
                        )}
                    </Table.Body>
                </Table>
            )}
            {selectedTab === DialogTab.CreateInstrument && (
                <React.Fragment>
                    <TextInputField
                        {...nameValidation}
                        label="Name"
                        onChange={onNameChange}
                        value={name}
                    />
                    <TextInputField
                        {...releaseValidation}
                        label="Release"
                        onChange={onReleaseChange}
                        value={release ?? ""}
                    />
                    <FormField label="Curve">
                        <SelectMenu
                            calculateHeight={true}
                            hasFilter={false}
                            hasTitle={false}
                            onValueDeselect={setCurve}
                            onValueSelect={setCurve}
                            options={curveOptions}
                            selected={curve}>
                            <Button type="button" width="100%">
                                {capitalize(curve)}
                            </Button>
                        </SelectMenu>
                    </FormField>
                    <FormField label="Sample" {...fileValidation}>
                        <FileSelectMenu
                            hasTitle={false}
                            onDeselect={handleFileSelected}
                            onSelect={handleFileSelected}
                            selected={file}>
                            <Button
                                intent={
                                    fileValidation?.isInvalid
                                        ? "danger"
                                        : undefined
                                }
                                type="button"
                                width="100%">
                                {file?.name ?? "No sample selected"}
                            </Button>
                        </FileSelectMenu>
                    </FormField>
                    <ErrorAlert error={error} />
                </React.Fragment>
            )}
        </FormDialog>
    );
};

export { InstrumentSettingsDialog };
