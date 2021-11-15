import {
    Alert,
    Dialog,
    DialogProps,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import React, { ChangeEvent, useCallback, useState } from "react";
import { isNilOrEmpty } from "utils/core-utils";
import { useSyncWorkstationState } from "utils/hooks/use-sync-workstation-state";
import { useProjectState } from "utils/hooks/use-project-state";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface SaveProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const ERROR_NAME_IS_REQUIRED = "Name is required";

const SaveProjectDialog: React.FC<SaveProjectDialogProps> = (
    props: SaveProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const { setState: setWorkstationState } = useWorkstationState();
    const { state, setCurrentState } = useProjectState();
    const title = "New Project";
    const [validationMessage, setValidationMessage] = useState<
        string | undefined
    >(undefined);

    const handleChangeName = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            setCurrentState((prev) => prev.merge({ name: event.target.value })),
        [setCurrentState]
    );

    const handleSuccess = (workstationState: WorkstationStateRecord) => {
        toaster.success(
            `Successfully created Project '${workstationState.project.name}'`
        );
        setWorkstationState(workstationState);
        onCloseComplete?.();
    };

    const { mutate, isLoading, error } = useSyncWorkstationState({
        onSuccess: handleSuccess,
    });

    const validate = (): boolean => {
        if (isNilOrEmpty(state.name)) {
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

        mutate();
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
                onChange={handleChangeName}
                required={true}
                value={state.name}
                isInvalid={validationMessage != null}
                validationMessage={validationMessage}
            />
            {error != null && <Alert intent="danger">{error.message}</Alert>}
        </Dialog>
    );
};

export { SaveProjectDialog };
