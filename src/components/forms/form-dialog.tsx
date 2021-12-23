import { Form, FormProps } from "components/forms/form";
import { Button, Dialog, DialogProps, majorScale, Pane } from "evergreen-ui";
import React, { useCallback } from "react";

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
                    <Pane
                        display="flex"
                        justifyContent="flex-end"
                        paddingBottom={majorScale(4)}
                        paddingTop={majorScale(3)}>
                        {hasFooter && (
                            <React.Fragment>
                                {hasCancel && (
                                    <Button
                                        onClick={handleCancel(close)}
                                        tabIndex={0}
                                        type="button">
                                        {cancelLabel}
                                    </Button>
                                )}
                                <Button
                                    appearance="primary"
                                    disabled={isConfirmDisabled}
                                    intent={intent}
                                    isLoading={isConfirmLoading}
                                    marginLeft={majorScale(1)}
                                    onClick={handleSubmit(close)}
                                    tabIndex={0}>
                                    {confirmLabel}
                                </Button>
                            </React.Fragment>
                        )}
                    </Pane>
                </Form>
            )}
        </Dialog>
    );
};

export { FormDialog };
