import { FileSelectMenu } from "components/file-select-menu";
import { FormDialog } from "components/form-dialog";
import { FormField } from "components/form-field";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { ValueRequiredState } from "constants/validation-states";
import { Button, DialogProps, TextInputField } from "evergreen-ui";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
import { Instrument } from "generated/interfaces/instrument";
import { ValidationState } from "interfaces/validation-state";
import { capitalize } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback, useState } from "react";
import { useInput } from "utils/hooks/use-input";
import { useNumberInput } from "utils/hooks/use-number-input";
import { enumToSelectMenuItems } from "utils/select-menu-utils";

interface InstrumentSettingsDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {
    instrument?: InstrumentRecord;
}

const curveOptions: Array<SelectMenuItem<InstrumentCurve>> =
    enumToSelectMenuItems(InstrumentCurve);

const InstrumentSettingsDialog: React.FC<InstrumentSettingsDialogProps> = (
    props: InstrumentSettingsDialogProps
) => {
    const { instrument: initialInstrument, isShown, onCloseComplete } = props;
    const { mutate: createOrUpdateInstrument, isLoading } =
        useCreateOrUpdateInstrument();
    const {
        value: name,
        onChange: onNameChange,
        ...nameValidation
    } = useInput({ initialValue: initialInstrument?.name, isRequired: true });
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
    const [file, setFile] = useState<FileRecord | undefined>();
    const [curve, setCurve] = useState<InstrumentCurve>(
        InstrumentCurve.Exponential
    );

    const handleFileSelected = useCallback(
        (file: FileRecord) => {
            setFileValidation(undefined);
            setFile(file);
        },
        [setFile, setFileValidation]
    );

    const handleSubmit = useCallback(() => {
        if (nameValidation.isInvalid || releaseValidation.isInvalid) {
            return;
        }

        if (file == null) {
            setFileValidation(ValueRequiredState);
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
        curve,
        name,
        release,
        file,
        nameValidation,
        releaseValidation,
        setFileValidation,
        createOrUpdateInstrument,
        initialInstrument,
    ]);

    return (
        <FormDialog
            isConfirmLoading={isLoading}
            isShown={isShown}
            onCloseComplete={onCloseComplete}
            title="Instrument Settings"
            onSubmit={handleSubmit}>
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
                            fileValidation?.isInvalid ? "danger" : undefined
                        }
                        type="button"
                        width="100%">
                        {file?.name ?? "No sample selected"}
                    </Button>
                </FileSelectMenu>
            </FormField>
        </FormDialog>
    );
};

export { InstrumentSettingsDialog };
