import {
    Dialog as EvergreenDialog,
    DialogProps as EvergreenDialogProps,
} from "evergreen-ui";
import React from "react";
import { attachEventSource } from "utils/event-utils";

interface DialogProps extends EvergreenDialogProps {}

const defaultProps: Partial<DialogProps> = {
    contentContainerProps: {
        onClick: attachEventSource("Dialog"),
    },
    containerProps: {
        onClick: attachEventSource("Dialog"),
    },
    overlayProps: {
        onClick: attachEventSource("Dialog"),
    },
};

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    const { children } = props;
    return <EvergreenDialog {...props}>{children}</EvergreenDialog>;
};

Dialog.defaultProps = defaultProps;

export type { DialogProps };
export { Dialog };
