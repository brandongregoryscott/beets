import {
    Alert,
    BanCircleIcon,
    Dialog,
    DialogProps,
    EmptyState,
    Icon,
    Pane,
    TextInputField,
    toaster,
    majorScale,
} from "evergreen-ui";
import { WorkstationStateRecord } from "models/workstation-state-record";
import React, { useState } from "react";
import { useInput } from "rooks";
import { isNilOrEmpty } from "utils/core-utils";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useSyncWorkstationState } from "utils/hooks/use-sync-workstation-state";
import { useTheme } from "utils/hooks/use-theme";
import { useWorkstationState } from "utils/hooks/use-workstation-state";

interface SaveProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const ERROR_NAME_IS_REQUIRED = "Name is required";

const SaveProjectDialog: React.FC<SaveProjectDialogProps> = (
    props: SaveProjectDialogProps
) => {
    const { isAuthenticated } = useGlobalState();
    const { isShown, onCloseComplete } = props;
    const { state, setState } = useWorkstationState();
    const theme = useTheme();
    const title = "New Project";
    const { value: name, onChange } = useInput();
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
        if (isNilOrEmpty(name)) {
            setValidationMessage(ERROR_NAME_IS_REQUIRED);
            return false;
        }

        setValidationMessage(undefined);
        return true;
    };

    const handleConfirm = () => {
        if (!isAuthenticated) {
            onCloseComplete?.();
            return;
        }

        if (!validate()) {
            return;
        }

        mutate(state.merge({ project: state.project.merge({ name }) }));
    };

    return (
        <Dialog
            confirmLabel={isAuthenticated ? "Save" : "Done"}
            hasCancel={isAuthenticated}
            isConfirmLoading={isLoading}
            isShown={isShown}
            onConfirm={handleConfirm}
            onCloseComplete={onCloseComplete}
            shouldCloseOnOverlayClick={false}
            title={title}>
            {isAuthenticated && (
                <React.Fragment>
                    <TextInputField
                        label="Name"
                        onChange={onChange}
                        required={true}
                        value={name}
                        isInvalid={validationMessage != null}
                        validationMessage={validationMessage}
                    />
                    {error != null && (
                        <Alert intent="danger">{error.message}</Alert>
                    )}
                </React.Fragment>
            )}
            {!isAuthenticated && (
                <Pane maxWidth={majorScale(60)}>
                    <EmptyState
                        title="Please register to save projects."
                        icon={
                            <Icon
                                color={theme.intents.danger.icon}
                                icon={BanCircleIcon}
                            />
                        }
                        iconBgColor={theme.intents.danger.background}
                        background="dark"
                    />
                </Pane>
            )}
        </Dialog>
    );
};

export { SaveProjectDialog };
