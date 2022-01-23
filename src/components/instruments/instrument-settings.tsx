import { ConfirmButton } from "components/confirm-button";
import { ErrorAlert } from "components/error-alert";
import { FileSelectMenu } from "components/file-select-menu";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { FormField } from "components/forms/form-field";
import { NoteSelectMenu } from "components/note-select-menu";
import { PlayButton } from "components/workstation/play-button";
import { Button, TextInputField, toaster, TrashIcon } from "evergreen-ui";
import { capitalize } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Song,
    Track,
    Instrument as ReactronicaInstrument,
    MidiNote,
} from "@brandongregoryscott/reactronica";
import { InstrumentRecord } from "models/instrument-record";
import { ValidationState } from "interfaces/validation-state";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { enumToSelectMenuItems } from "utils/select-menu-utils";
import { FileRecord } from "models/file-record";
import { getFileById, toInstrumentMap } from "utils/file-utils";
import { useBoolean } from "utils/hooks/use-boolean";
import { ValueRequiredState } from "constants/validation-states";
import { useListFiles } from "generated/hooks/domain/files/use-list-files";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
import { useDeleteInstrument } from "generated/hooks/domain/instruments/use-delete-instrument";
import { isNilOrEmpty } from "utils/core-utils";
import { useNumberInput } from "utils/hooks/use-number-input";
import { MidiNoteUtils } from "utils/midi-note-utils";
import { useInput } from "utils/hooks/use-input";
import { Instrument } from "generated/interfaces/instrument";
import { DialogFooter } from "components/dialog-footer";

interface InstrumentSettingsProps {
    instrument?: InstrumentRecord;
    onCreateOrUpdate?: (instrument: InstrumentRecord) => void;
    onDelete?: () => void;
}

const curveOptions: Array<SelectMenuItem<InstrumentCurve>> =
    enumToSelectMenuItems(InstrumentCurve);

const InstrumentSettings: React.FC<InstrumentSettingsProps> = (
    props: InstrumentSettingsProps
) => {
    const { instrument: initialInstrument, onCreateOrUpdate, onDelete } = props;

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
            onCreateOrUpdate?.(instrument);
        },
    });
    const {
        error: deleteError,
        mutate: deleteInstrument,
        isLoading: isDeleting,
    } = useDeleteInstrument({
        onSuccess: () => {
            toaster.success("Instrument successfully deleted.");
            onDelete?.();
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
    const { value: isAttemptingDelete, setTrue: handleDeleteClick } =
        useBoolean();

    const handleFileSelected = useCallback(
        (file: FileRecord) => {
            setFileValidation(undefined);
            setFile(file);
        },
        [setFile, setFileValidation]
    );

    const handleSubmit = useCallback(() => {
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
            root_note: rootNote,
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
        rootNote,
        setFileValidation,
        setNameValidation,
    ]);

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

    const { value: isPlaying, toggle: toggleIsPlaying } = useBoolean();
    const { value: isLoadingSamples, setFalse: handleSamplesLoaded } =
        useBoolean(true);

    const samples = useMemo(() => toInstrumentMap(file), [file]);

    return (
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
            <FormField label="Root Note">
                <NoteSelectMenu
                    onDeselect={setRootNote}
                    onSelect={setRootNote}
                    selected={rootNote}>
                    <Button type="button" width="100%">
                        {rootNote}
                    </Button>
                </NoteSelectMenu>
            </FormField>
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
                            fileValidation?.isInvalid ? "danger" : undefined
                        }
                        type="button"
                        width="100%">
                        {file?.name ?? "No sample selected"}
                    </Button>
                </FileSelectMenu>
            </FormField>
            <FormField label="Preview">
                <PlayButton
                    disabled={file == null}
                    isLoading={file != null && isLoadingSamples}
                    isPlaying={isPlaying}
                    toggleIsPlaying={toggleIsPlaying}
                    type="button"
                    width="100%"
                />
                <Song bpm={80} isPlaying={isPlaying}>
                    <Track subdivision="8n">
                        <ReactronicaInstrument
                            onLoad={handleSamplesLoaded}
                            samples={samples}
                            type="sampler"
                        />
                    </Track>
                </Song>
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
            <DialogFooter
                isConfirmDisabled={isAttemptingDelete}
                isConfirmLoading={isLoading}
                onConfirm={handleSubmit}
            />
        </React.Fragment>
    );
};

export { InstrumentSettings };
