import {
    Alert,
    Dialog,
    DialogProps,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useState } from "react";
import { useInput } from "rooks";
import { isNilOrEmpty } from "utils/core-utils";
import { useSyncWorkstationState } from "utils/hooks/use-sync-workstation-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface SaveProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const ERROR_NAME_IS_REQUIRED = "Name is required";

const SaveProjectDialog: React.FC<SaveProjectDialogProps> = (
    props: SaveProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const { state, setState } = useWorkstationState();
    const title = "New Project";
    const { value, onChange } = useInput();
    const [validationMessage, setValidationMessage] = useState<
        string | undefined
    >(undefined);

    const handleSuccess = (workstationState: WorkstationStateRecord) => {
        toaster.success(
            `Successfully created Project '${workstationState.project.name}'`
        );
        setState(workstationState);
        onCloseComplete?.();
    };

    const { mutate, isLoading, error } = useSyncWorkstationState({
        onSuccess: handleSuccess,
    });

    const validate = (): boolean => {
        if (isNilOrEmpty(value)) {
            setValidationMessage(ERROR_NAME_IS_REQUIRED);
            return false;
        }

        setValidationMessage(undefined);
        return true;
    };

    const handleConfirm = () => {
        if (!validate()) {
            return;
        }

        mutate(state);
    };

    return (
        <Dialog
            confirmLabel="Save"
            isConfirmLoading={isLoading}
            isShown={isShown}
            onConfirm={handleConfirm}
            onCloseComplete={onCloseComplete}
            shouldCloseOnOverlayClick={false}
            title={title}>
            <TextInputField
                label="Name"
                onChange={onChange}
                required={true}
                value={value}
                isInvalid={validationMessage != null}
                validationMessage={validationMessage}
            />
            {error != null && <Alert intent="danger">{error.message}</Alert>}
        </Dialog>
    );
};

export { SaveProjectDialog };
