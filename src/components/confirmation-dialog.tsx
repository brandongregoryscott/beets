import { Alert, IntentTypes } from "evergreen-ui";
import { Dialog, DialogProps } from "components/dialog";
import React from "react";

interface ConfirmationDialogProps extends Omit<DialogProps, "onCancel"> {
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
        onCloseComplete,
        onConfirm,
        title = "Are you sure?",
    } = props;

    return (
        <Dialog
            confirmLabel={confirmLabel}
            isConfirmLoading={isConfirmLoading}
            onCloseComplete={onCloseComplete}
            onConfirm={onConfirm}
            shouldCloseOnOverlayClick={false}
            title={title}>
            <Alert intent={alertIntent} title={alertTitle}>
                {alertDescription}
            </Alert>
        </Dialog>
    );
};

export { ConfirmationDialog };
