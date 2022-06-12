import { Button, DialogProps, majorScale, Pane } from "evergreen-ui";
import React from "react";

interface DialogFooterProps
    extends Pick<
        DialogProps,
        | "cancelLabel"
        | "confirmLabel"
        | "hasCancel"
        | "intent"
        | "isConfirmDisabled"
        | "isConfirmLoading"
    > {
    onCancel?: () => void;
    onConfirm?: () => void;
}

const DialogFooter: React.FC<DialogFooterProps> = (
    props: DialogFooterProps
) => {
    const {
        hasCancel = true,
        cancelLabel = "Cancel",
        onCancel,
        isConfirmDisabled,
        isConfirmLoading,
        onConfirm,
        intent,
        confirmLabel = "Confirm",
    } = props;

    return (
        <Pane
            display="flex"
            justifyContent="flex-end"
            paddingBottom={majorScale(4)}
            paddingTop={majorScale(3)}>
            {hasCancel && (
                <Button
                    marginRight={majorScale(1)}
                    onClick={onCancel}
                    type="button">
                    {cancelLabel}
                </Button>
            )}
            <Button
                appearance="primary"
                disabled={isConfirmDisabled}
                intent={intent}
                isLoading={isConfirmLoading}
                onClick={onConfirm}
                type="button">
                {confirmLabel}
            </Button>
        </Pane>
    );
};

export type { DialogFooterProps };
export { DialogFooter };
