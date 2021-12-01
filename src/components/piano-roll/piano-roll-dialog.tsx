import { Dialog, DialogProps } from "evergreen-ui";

interface PianoRollDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const PianoRollDialog: React.FC<PianoRollDialogProps> = (
    props: PianoRollDialogProps
) => {
    const { onCloseComplete } = props;
    return (
        <Dialog
            isShown={true}
            onCloseComplete={onCloseComplete}
            title="Piano Roll"></Dialog>
    );
};

export { PianoRollDialog };
