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
import { InstrumentRecord } from "models/instrument-record";
import { ValidationState } from "interfaces/validation-state";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { enumToSelectMenuItems } from "utils/select-menu-utils";
import { FileRecord } from "models/file-record";
import { getFileById } from "utils/file-utils";
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
import { MidiNote } from "types/midi-note";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { List } from "immutable";
import { useToneAudio } from "utils/hooks/use-tone-audio";

interface InstrumentSettingsProps {
    instrument?: InstrumentRecord;
    onCancel?: () => void;
    onCreateOrUpdate?: (instrument: InstrumentRecord) => void;
    onDelete?: () => void;
}

const curveOptions: Array<SelectMenuItem<InstrumentCurve>> =
    enumToSelectMenuItems(InstrumentCurve);

const InstrumentSettings: React.FC<InstrumentSettingsProps> = (
    props: InstrumentSettingsProps
) => {
    const {
        instrument: initialInstrument,
        onCreateOrUpdate,
        onCancel,
        onDelete,
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
    const {
        displayValue: durationDisplayValue,
        value: duration,
        onChange: onDurationChange,
        ...durationValidation
    } = useNumberInput({
        initialValue: initialInstrument?.duration,
        allowFloating: true,
        min: 0,
        max: 30,
    });
    const [fileValidation, setFileValidation] = useState<
        ValidationState | undefined
    >();
    const [file, setFile] = useState<FileRecord | undefined>(
        getFileById(initialInstrument?.file_id, files)
    );
    const [curve, setCurve] = useState<InstrumentCurve>(
        initialInstrument?.curve ?? InstrumentCurve.Exponential
    );
    const [rootNote, setRootNote] = useState<MidiNote>(
        (initialInstrument?.root_note as MidiNote) ?? MidiNoteUtils.defaultNote
    );
    const { value: isAttemptingDelete, setTrue: handleDeleteClick } =
        useBoolean();

    const instrument = useMemo(() => {
        const updatedValues: Partial<Instrument> = {
            curve,
            duration,
            name,
            release,
            file_id: file?.id,
            root_note: rootNote,
        };

        const instrument =
            initialInstrument?.merge(updatedValues) ??
            new InstrumentRecord(updatedValues);

        return instrument;
    }, [curve, duration, file?.id, initialInstrument, name, release, rootNote]);

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

        createOrUpdateInstrument(instrument);
    }, [
        createOrUpdateInstrument,
        file,
        instrument,
        name,
        nameValidation?.isInvalid,
        releaseValidation.isInvalid,
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

    const {
        value: isPlaying,
        toggle: toggleIsPlaying,
        setFalse: stopPlaying,
    } = useBoolean();

    const track = useMemo(
        () => new TrackRecord().merge({ instrument_id: initialInstrument?.id }),
        [initialInstrument?.id]
    );

    const trackSection = useMemo(
        () => new TrackSectionRecord().merge({ track_id: track.id }),
        [track.id]
    );

    const trackSectionSteps: List<TrackSectionStepRecord> = useMemo(
        () =>
            List.of(
                new TrackSectionStepRecord({
                    note: rootNote,
                    track_section_id: trackSection.id,
                })
            ),
        [rootNote, trackSection.id]
    );

    const { isLoading: isLoadingSamples } = useToneAudio({
        isPlaying,
        loop: false,
        files: file != null ? List.of(file) : undefined,
        instruments: List.of(instrument),
        tracks: List.of(track),
        trackSections: List.of(trackSection),
        trackSectionSteps: trackSectionSteps,
    });

    const handlePlay = useCallback(() => {
        // Toggle the 'isPlaying' boolean after the duration of the sample which should reset to
        // a 'Play' state instead of 'Pause'
        setTimeout(stopPlaying, (duration ?? 0.5) * 1000);
    }, [duration, stopPlaying]);

    useEffect(() => stopPlaying(), [stopPlaying]);

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
            <TextInputField
                {...durationValidation}
                hint="Value in seconds"
                label="Duration"
                onChange={onDurationChange}
                value={durationDisplayValue}
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
                    onClick={handlePlay}
                    toggleIsPlaying={toggleIsPlaying}
                    type="button"
                    width="100%"
                />
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
                onCancel={onCancel}
                onConfirm={handleSubmit}
            />
        </React.Fragment>
    );
};

export { InstrumentSettings };
