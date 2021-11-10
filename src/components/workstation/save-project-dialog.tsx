import {
    Alert,
    Dialog,
    DialogProps,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { ProjectRecord } from "models/project-record";
import React, { useState } from "react";
import { useInput } from "rooks";
import { isNilOrEmpty } from "utils/core-utils";
import { useSyncProject } from "utils/hooks/domain/projects/use-sync-project";
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

    const handleSuccess = (project: ProjectRecord) => {
        toaster.success(`Successfully created Project '${project.name}'`);
        console.log(
            "project instanceof ProjectRecord",
            project instanceof ProjectRecord
        );
        setState((prev) =>
            prev.merge({ initialProject: project, currentProject: project })
        );
        onCloseComplete?.();
    };

    const { mutate, isLoading, error } = useSyncProject({
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

        mutate(
            state.currentProject
                .merge({ name: value })
                .setTracks(state.currentProject.getTracks())
        );
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
