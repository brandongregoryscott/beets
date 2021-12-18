import { FileSelectMenu } from "components/file-select-menu";
import { FormDialog } from "components/form-dialog";
import { FormField } from "components/form-field";
import { SelectMenu, SelectMenuItem } from "components/select-menu";
import { Button, DialogProps, TextInputField } from "evergreen-ui";
import { InstrumentCurve } from "generated/enums/instrument-curve";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
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
    const { value: release, onChange: onReleaseChange } = useNumberInput({
        initialValue: initialInstrument?.release,
    });
    const [selectedSample, setSelectedSample] = useState<
        FileRecord | undefined
    >();
    const [curve, setCurve] = useState<InstrumentCurve>(
        InstrumentCurve.Exponential
    );

    const handleSubmit = useCallback(() => {
        if (nameValidation.isInvalid) {
            return;
        }

        const instrument =
            initialInstrument?.merge({ name, release }) ??
            new InstrumentRecord({ name, release });
    }, [name, release]);

    return (
        <FormDialog
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
                    <Button width="100%">{capitalize(curve)}</Button>
                </SelectMenu>
            </FormField>
            <FormField label="Sample">
                <FileSelectMenu
                    hasTitle={false}
                    onDeselect={setSelectedSample}
                    onSelect={setSelectedSample}
                    selected={selectedSample}>
                    <Button width="100%">
                        {selectedSample?.name ?? "No sample selected"}
                    </Button>
                </FileSelectMenu>
            </FormField>
        </FormDialog>
    );
};

export { InstrumentSettingsDialog };
