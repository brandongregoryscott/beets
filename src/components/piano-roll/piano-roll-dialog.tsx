import { PianoRoll } from "components/piano-roll/piano-roll";
import { PianoRollSteps } from "components/piano-roll/piano-roll-steps";
import { Dialog, DialogProps } from "evergreen-ui";
import { TrackSectionRecord } from "models/track-section-record";

interface PianoRollDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    trackSection: TrackSectionRecord;
}

const PianoRollDialog: React.FC<PianoRollDialogProps> = (
    props: PianoRollDialogProps
) => {
    const { onCloseComplete } = props;
    return (
        <Dialog
            isShown={true}
            onCloseComplete={onCloseComplete}
            title="Piano Roll">
            <PianoRoll />
            <PianoRollSteps />
        </Dialog>
    );
};

export { PianoRollDialog };
