import { ConfirmButton } from "components/confirm-button";
import { ErrorAlert } from "components/error-alert";
import { FileSelectMenu } from "components/file-select-menu";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { FormField } from "components/forms/form-field";
import { NoteSelectMenu } from "components/note-select-menu";
import { PlayButton } from "components/workstation/play-button";
import { Button, TextInputField, TrashIcon } from "evergreen-ui";
import { capitalize } from "lodash";
import React, { useMemo } from "react";
import {
    Song,
    Track,
    Instrument as ReactronicaInstrument,
    MidiNote,
} from "@brandongregoryscott/reactronica";
import { InstrumentRecord } from "models/instrument-record";
import { ValidationState } from "interfaces/validation-state";
import { SetStateAction } from "jotai";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { enumToSelectMenuItems } from "utils/select-menu-utils";
import { FileRecord } from "models/file-record";
import { toInstrumentMap } from "utils/file-utils";
import { useBoolean } from "utils/hooks/use-boolean";

interface InstrumentSettingsProps {
    curve: InstrumentCurve;
    error?: Error | null;
    file?: FileRecord;
    fileValidation?: ValidationState;
    instrument?: InstrumentRecord;
    isDeleting?: boolean;
    name?: string;
    nameValidation?: ValidationState;
    onCurveChange: (update: SetStateAction<InstrumentCurve>) => void;
    onDeleteClick: () => void;
    onDeleteConfirm: () => void;
    onFileChange?: (file: FileRecord) => void;
    onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onReleaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRootNoteChange: (update: SetStateAction<MidiNote>) => void;
    releaseDisplayValue?: string;
    releaseValidation?: ValidationState;
    rootNote: MidiNote;
}

const curveOptions: Array<SelectMenuItem<InstrumentCurve>> =
    enumToSelectMenuItems(InstrumentCurve);

const InstrumentSettings: React.FC<InstrumentSettingsProps> = (
    props: InstrumentSettingsProps
) => {
    const {
        instrument: initialInstrument,
        nameValidation,
        name,
        onNameChange,
        releaseDisplayValue,
        onReleaseChange,
        releaseValidation,
        rootNote,
        onRootNoteChange,
        curve,
        onCurveChange,
        file,
        fileValidation,
        onFileChange,
        isDeleting,
        onDeleteClick,
        onDeleteConfirm,
        error,
    } = props;
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
                    onDeselect={onRootNoteChange}
                    onSelect={onRootNoteChange}
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
                    onValueDeselect={onCurveChange}
                    onValueSelect={onCurveChange}
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
                    onDeselect={onFileChange}
                    onSelect={onFileChange}
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
                    onClick={onDeleteClick}
                    onConfirm={onDeleteConfirm}
                    width="100%">
                    Delete Instrument
                </ConfirmButton>
            )}
            <ErrorAlert error={error} />
        </React.Fragment>
    );
};

export { InstrumentSettings };
