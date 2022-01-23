import { MidiNote } from "@brandongregoryscott/reactronica";
import { FormDialog } from "components/forms/form-dialog";
import { InstrumentsTable } from "components/instruments/instruments-table";
import { ValueRequiredState } from "constants/validation-states";
import { DialogProps, majorScale, Tab, Tablist, toaster } from "evergreen-ui";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
import { useDeleteInstrument } from "generated/hooks/domain/instruments/use-delete-instrument";
import { Instrument } from "generated/interfaces/instrument";
import { ValidationState } from "interfaces/validation-state";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useEffect, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { getFileById } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useInput } from "utils/hooks/use-input";
import { useNumberInput } from "utils/hooks/use-number-input";
import { MidiNoteUtils } from "utils/midi-note-utils";
import { InstrumentSettings } from "components/instruments/instrument-settings";

interface InstrumentSettingsDialogProps
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
    const { globalState } = useGlobalState();
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
        initialValue:
            initialInstrument?.release ??
            InstrumentRecord.defaultValues.release,
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
    const [rootNote, setRootNote] = useState<MidiNote>(
        (initialInstrument?.root_note as MidiNote) ?? MidiNoteUtils.defaultNote
    );
    const [selectedTab, setSelectedTab] = useState<DialogTab>(
        globalState.isAuthenticated()
            ? DialogTab.CreateInstrument
            : DialogTab.ChooseInstrument
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
                <InstrumentSettings
                    curve={curve}
                    error={error}
                    file={file}
                    fileValidation={fileValidation}
                    instrument={initialInstrument}
                    isDeleting={isDeleting}
                    name={name}
                    nameValidation={nameValidation}
                    onCurveChange={setCurve}
                    onDeleteClick={handleDeleteClick}
                    onDeleteConfirm={handleDeleteConfirm}
                    onFileChange={handleFileSelected}
                    onNameChange={onNameChange}
                    onReleaseChange={onReleaseChange}
                    onRootNoteChange={setRootNote}
                    releaseDisplayValue={releaseDisplayValue}
                    releaseValidation={releaseValidation}
                    rootNote={rootNote}
                />
            )}
        </FormDialog>
    );
};

export { InstrumentSettingsDialog };
