import { Sequencer } from "components/sequencer";
import { Dialog } from "evergreen-ui";
import { useTrackAtom } from "utils/hooks/use-track-atom";

interface SequencerDialogProps {
    onClose: () => void;
    trackId: string;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const { onClose, trackId } = props;
    const { name } = useTrackAtom(trackId);
    return (
        <Dialog
            confirmLabel="Save"
            isShown={true}
            onCloseComplete={onClose}
            title={`Sequencer for ${name}`}>
            <Sequencer trackId={trackId} />
        </Dialog>
    );
};

export { SequencerDialog };
