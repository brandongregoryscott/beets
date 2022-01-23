import { Form, FormProps } from "components/forms/form";
import React, { useCallback } from "react";
import { Dialog, DialogProps } from "components/dialog";
import { DialogFooter } from "components/dialog-footer";

interface FormDialogProps
    extends Omit<DialogProps, "onConfirm">,
        Omit<FormProps, "children" | "onSubmit" | "width" | "title"> {
    onSubmit?: (close: () => void) => void;
}

const handleClose = (close: () => void) => close();

const FormDialog: React.FC<FormDialogProps> = (props: FormDialogProps) => {
    const { children } = props;
    const {
        cancelLabel = "Cancel",
        confirmLabel = "Confirm",
        hasCancel = true,
        hasFooter = true,
        intent,
        isConfirmDisabled,
        isConfirmLoading,
        onCancel = handleClose,
        onSubmit = handleClose,
    } = props;

    const handleCancel = useCallback(
        (close: () => void) => () => onCancel?.(close),
        [onCancel]
    );

    const handleFormSubmit = useCallback(
        (close: () => void) => (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            onSubmit?.(close);
        },
        [onSubmit]
    );

    const handleSubmit = useCallback(
        (close: () => void) => () => onSubmit?.(close),
        [onSubmit]
    );

    return (
        <Dialog {...props} hasFooter={false}>
            {({ close }) => (
                <Form onSubmit={handleFormSubmit(close)}>
                    {children}
                    {hasFooter && (
                        <DialogFooter
                            cancelLabel={cancelLabel}
                            confirmLabel={confirmLabel}
                            hasCancel={hasCancel}
                            intent={intent}
                            isConfirmDisabled={isConfirmDisabled}
                            isConfirmLoading={isConfirmLoading}
                            onCancel={handleCancel(close)}
                            onConfirm={handleSubmit(close)}
                        />
                    )}
                </Form>
            )}
        </Dialog>
    );
};

export { FormDialog };
