import { ConfirmButton } from "components/confirm-button";
import { ErrorMessages } from "constants/error-messages";
import { TextInputField, toaster, TrashIcon } from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useCallback, useState } from "react";
import { useInput } from "rooks";
import { isNilOrEmpty } from "utils/core-utils";
import { useDeleteWorkstationState } from "hooks/use-delete-workstation-state";
import { useProjectState } from "hooks/use-project-state";
import { useWorkstationState } from "hooks/use-workstation-state";
import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";

interface ProjectSettingsDialogProps
    extends Pick<DialogProps, "onCloseComplete"> {}

const ProjectSettingsDialog: React.FC<ProjectSettingsDialogProps> = (
    props: ProjectSettingsDialogProps
) => {
    const { onCloseComplete } = props;
    const title = "Project Settings";
    const { state, setState } = useWorkstationState();
    const { state: project, setCurrentState: setCurrentProject } =
        useProjectState();
    const [isAttemptingDelete, setIsAttemptingDelete] =
        useState<boolean>(false);
    const { value: name, onChange } = useInput(project.name);
    const [validationMessage, setValidationMessage] = useState<
        string | undefined
    >(undefined);

    const handleDeleteSuccess = useCallback(() => {
        toaster.success("Project successfully deleted");
        const newState = new WorkstationStateRecord();
        setState(newState);
        onCloseComplete?.();
    }, [onCloseComplete, setState]);

    const { mutate: deleteWorkstation, isLoading: isDeleting } =
        useDeleteWorkstationState({
            onSuccess: handleDeleteSuccess,
        });

    const handleDeleteClick = useCallback(
        () => setIsAttemptingDelete(true),
        [setIsAttemptingDelete]
    );

    const handleDeleteConfirm = useCallback(() => {
        deleteWorkstation(state);
    }, [deleteWorkstation, state]);

    const handleConfirm = useCallback(() => {
        if (isNilOrEmpty(name)) {
            setValidationMessage(ErrorMessages.REQUIRED_FIELD);
            return;
        }

        setCurrentProject((prev) => prev.merge({ name }));
        onCloseComplete?.();
    }, [name, onCloseComplete, setCurrentProject, setValidationMessage]);

    return (
        <Dialog
            isConfirmDisabled={isAttemptingDelete}
            onCloseComplete={onCloseComplete}
            onConfirm={handleConfirm}
            shouldCloseOnOverlayClick={false}
            title={title}>
            <TextInputField
                isInvalid={validationMessage != null}
                label="Name"
                onChange={onChange}
                required={true}
                validationMessage={validationMessage}
                value={name}
            />
            {project.isPersisted() && (
                <ConfirmButton
                    alertDescription="Click Delete Project again to confirm this action."
                    alertTitle="This will permanently delete your project and all of its tracks."
                    iconBefore={TrashIcon}
                    intent="danger"
                    isLoading={isDeleting}
                    onClick={handleDeleteClick}
                    onConfirm={handleDeleteConfirm}
                    width="100%">
                    Delete Project
                </ConfirmButton>
            )}
        </Dialog>
    );
};

export { ProjectSettingsDialog };
