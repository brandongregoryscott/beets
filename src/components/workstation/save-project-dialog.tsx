import {
    Alert,
    Dialog,
    DialogProps,
    TextInputField,
    toaster,
} from "evergreen-ui";
import { Project } from "generated/interfaces/project";
import { ProjectRecord } from "models/project-record";
import React, { useState } from "react";
import { useInput } from "rooks";
import { isNilOrEmpty } from "utils/core-utils";
import { useCreateProject } from "utils/hooks/domain/projects/use-create-project";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface SaveProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const ERROR_NAME_IS_REQUIRED = "Name is required";

const SaveProjectDialog: React.FC<SaveProjectDialogProps> = (
    props: SaveProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const { setState } = useWorkstationState();
    const title = "New Project";
    const { value, onChange } = useInput();
    const [error, setError] = useState<Error | undefined>(undefined);
    const [validationMessage, setValidationMessage] = useState<
        string | undefined
    >(undefined);

    const handleSuccess = (project: Project) => {
        toaster.success(`Successfully created Project '${project.name}'`);
        const record = new ProjectRecord(project);
        setState((prev) =>
            prev.merge({ initialProject: record, currentProject: record })
        );
        onCloseComplete?.();
    };

    const { mutate, isLoading } = useCreateProject({
        onError: setError,
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

        mutate(new ProjectRecord({ name: value }));
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
