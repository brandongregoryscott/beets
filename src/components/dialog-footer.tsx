import { Button, DialogProps, majorScale, Pane } from "evergreen-ui";
import React, { useCallback } from "react";

interface DialogFooterProps
    extends Pick<
        DialogProps,
        | "intent"
        | "hasCancel"
        | "cancelLabel"
        | "isConfirmLoading"
        | "isConfirmDisabled"
        | "confirmLabel"
    > {
    close?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
}

const DialogFooter: React.FC<DialogFooterProps> = (
    props: DialogFooterProps
) => {
    const {
        close,
        hasCancel = true,
        cancelLabel = "Cancel",
        onCancel,
        isConfirmDisabled,
        isConfirmLoading,
        onConfirm,
        intent,
        confirmLabel = "Confirm",
    } = props;

    const handleCancel = useCallback(() => {
        onCancel?.();
        close?.();
    }, [close, onCancel]);

    const handleConfirm = useCallback(() => {
        onConfirm?.();
        close?.();
    }, [close, onConfirm]);

    return (
        <Pane
            display="flex"
            justifyContent="flex-end"
            paddingBottom={majorScale(4)}
            paddingTop={majorScale(3)}>
            {hasCancel && (
                <Button marginRight={majorScale(1)} onClick={handleCancel}>
                    {cancelLabel}
                </Button>
            )}
            <Button
                appearance="primary"
                disabled={isConfirmDisabled}
                intent={intent}
                isLoading={isConfirmLoading}
                onClick={handleConfirm}>
                {confirmLabel}
            </Button>
        </Pane>
    );
};

export { DialogFooter };
