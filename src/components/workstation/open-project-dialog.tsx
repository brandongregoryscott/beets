import { Dialog, DialogProps } from "evergreen-ui";

interface OpenProjectDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {}

const OpenProjectDialog: React.FC<OpenProjectDialogProps> = (
    props: OpenProjectDialogProps
) => {
    const { isShown, onCloseComplete } = props;
    const title = "Open Project";
    const confirmLabel = "Open";
    return (
        <Dialog
            confirmLabel={confirmLabel}
            isConfirmLoading={false}
            isShown={isShown}
            onConfirm={() => {}}
            onCloseComplete={onCloseComplete}
            shouldCloseOnOverlayClick={false}
            title={title}></Dialog>
    );
};

export { OpenProjectDialog };
