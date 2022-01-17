import {
    Dialog as EvergreenDialog,
    DialogProps as EvergreenDialogProps,
} from "evergreen-ui";

interface DialogProps extends EvergreenDialogProps {}

const defaultProps: Partial<DialogProps> = {
    overlayProps: {
        onClick: (event: React.MouseEvent) => event.stopPropagation(),
    },
};

const Dialog: React.FC<DialogProps> = (props: DialogProps) => {
    const { children } = props;
    return <EvergreenDialog {...props}>{children}</EvergreenDialog>;
};

Dialog.defaultProps = defaultProps;

export type { DialogProps };
export { Dialog };
