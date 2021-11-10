import { Alert, Dialog, DialogProps, IntentTypes } from "evergreen-ui";
import React from "react";

interface ConfirmationDialogProps extends DialogProps {
    alertIntent?: IntentTypes;
    alertTitle?: string;
    alertDescription: string;
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
            onConfirm={onConfirm}
            onCloseComplete={onCloseComplete}
            shouldCloseOnOverlayClick={false}
            title={title}>
            <Alert intent={alertIntent} title={alertTitle}>
                {alertDescription}
            </Alert>
        </Dialog>
    );
};

export { ConfirmationDialog };
