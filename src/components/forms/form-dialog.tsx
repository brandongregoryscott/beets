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
                        paddingTop={majorScale(3)}
                        paddingBottom={majorScale(4)}>
                        {hasFooter && (
                            <React.Fragment>
                                {hasCancel && (
                                    <Button
                                        tabIndex={0}
                                        onClick={handleCancel(close)}>
                                        {cancelLabel}
                                    </Button>
                                )}
                                <Button
                                    tabIndex={0}
                                    marginLeft={majorScale(1)}
                                    appearance="primary"
                                    intent={intent}
                                    isLoading={isConfirmLoading}
                                    disabled={isConfirmDisabled}
                                    onClick={handleSubmit(close)}>
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
