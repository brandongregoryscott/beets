import { ConfirmButton } from "components/confirm-button";
import { ErrorAlert } from "components/error-alert";
import { FileSelectMenu } from "components/file-select-menu";
import { FormDialog } from "components/forms/form-dialog";
import { FormField } from "components/forms/form-field";
import { InstrumentsTable } from "components/instruments/instruments-table";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { ValueRequiredState } from "constants/validation-states";
import {
    Button,
    DialogProps,
    majorScale,
    Tab,
    Tablist,
    TextInputField,
    toaster,
    TrashIcon,
} from "evergreen-ui";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
import { useDeleteInstrument } from "generated/hooks/domain/instruments/use-delete-instrument";
import { Instrument } from "generated/interfaces/instrument";
import { ValidationState } from "interfaces/validation-state";
import { capitalize } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useEffect, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { getFileById } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useInput } from "utils/hooks/use-input";
import { useNumberInput } from "utils/hooks/use-number-input";
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
    const {
        error: createError,
        mutate: createOrUpdateInstrument,
        isLoading: isCreating,
    } = useCreateOrUpdateInstrument({
        onSuccess: (instrument: InstrumentRecord) => {
            const isUpdate = initialInstrument?.isPersisted() ?? false;
            toaster.success(
                `Instrument '${instrument.name}' successfully ${
                    isUpdate ? "updated" : "created"
                }!`
            );
            onCloseComplete?.();
            onSubmit?.(instrument);
        },
    });
    const {
        error: deleteError,
        mutate: deleteInstrument,
        isLoading: isDeleting,
    } = useDeleteInstrument({
        onSuccess: () => {
            toaster.success("Instrument successfully deleted.");
            onCloseComplete?.();
        },
    });

    const { resultObject: files } = useListFiles();

    const {
        value: name,
        onChange: onNameChange,
        setValidation: setNameValidation,
        ...nameValidation
    } = useInput({
        initialValue: initialInstrument?.name,
    });
    const {
        displayValue: releaseDisplayValue,
        value: release,
        onChange: onReleaseChange,
        ...releaseValidation
    } = useNumberInput({
        initialValue: initialInstrument?.release,
        allowFloating: true,
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
    const [isAttemptingDelete, setIsAttemptingDelete] =
        useState<boolean>(false);

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

    const handleDeleteClick = useCallback(
        () => setIsAttemptingDelete(true),
        [setIsAttemptingDelete]
    );

    const handleDeleteConfirm = useCallback(
        () => deleteInstrument(initialInstrument?.id ?? ""),
        [deleteInstrument, initialInstrument]
    );

    useEffect(() => {
        if (file != null) {
            return;
        }

        const foundFile = getFileById(initialInstrument?.file_id, files);
        if (foundFile == null) {
            return;
        }

        setFile(foundFile);
    }, [file, files, initialInstrument?.file_id]);
    const error = createError ?? deleteError;
    const isLoading = isCreating || isDeleting;
    return (
        <FormDialog
            isConfirmDisabled={
                (selectedTab === DialogTab.ChooseInstrument &&
                    selectedInstrument == null) ||
                isAttemptingDelete
            }
            isConfirmLoading={isLoading}
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
                <InstrumentsTable
                    isSelectable={true}
                    onSelect={setSelectedInstrument}
                    selected={selectedInstrument}
                />
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
                        value={releaseDisplayValue}
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
                    {initialInstrument?.isPersisted() && (
                        <ConfirmButton
                            alertDescription="Click Delete Instrument again to confirm this action."
                            alertTitle="This will permanently delete your instrument and all of its tracks."
                            iconBefore={TrashIcon}
                            intent="danger"
                            isLoading={isDeleting}
                            onClick={handleDeleteClick}
                            onConfirm={handleDeleteConfirm}
                            width="100%">
                            Delete Instrument
                        </ConfirmButton>
                    )}
                    <ErrorAlert error={error} />
                </React.Fragment>
            )}
        </FormDialog>
    );
};

export { InstrumentSettingsDialog };
