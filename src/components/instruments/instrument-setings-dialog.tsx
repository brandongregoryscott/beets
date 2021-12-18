import { FormDialog } from "components/form-dialog";
import {
    Dialog,
    DialogProps,
    Pane,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { useCreateOrUpdateInstrument } from "generated/hooks/domain/instruments/use-create-or-update-instrument";
import { InstrumentRecord } from "models/instrument-record";
import React, { useCallback } from "react";
import { useInput } from "utils/hooks/use-input";
import { useNumberInput } from "utils/hooks/use-number-input";

interface InstrumentSettingsDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {
    instrument?: InstrumentRecord;
}

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
                required={true}
                value={name}
            />
            <TextInputField
                label="Release"
                onChange={onReleaseChange}
                value={release ?? ""}
            />
        </FormDialog>
    );
};

export { InstrumentSettingsDialog };
