import { Alert, Dialog, DialogProps, IntentTypes } from "evergreen-ui";
import React from "react";

interface ConfirmationDialogProps extends DialogProps {
    alertDescription: string;
    alertIntent?: IntentTypes;
    alertTitle?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (
    props: ConfirmationDialogProps
) => {
    const {
        alertIntent = "warning",
        alertTitle,
        alertDescription,
        confirmLabel = "Confirm",
        isConfirmLoading,
        isShown,
        onCloseComplete,
        onConfirm,
        title = "Are you sure?",
    } = props;

    return (
        <Dialog
            confirmLabel={confirmLabel}
            isConfirmLoading={isConfirmLoading}
            isShown={isShown}
            onCloseComplete={onCloseComplete}
            onConfirm={onConfirm}
            shouldCloseOnOverlayClick={false}
            title={title}
        >
            <Alert intent={alertIntent} title={alertTitle}>
                {alertDescription}
            </Alert>
        </Dialog>
    );
};

export { ConfirmationDialog };
