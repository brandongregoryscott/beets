import { Sequencer } from "components/sequencer";
import { Dialog } from "evergreen-ui";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { List } from "immutable";

interface SequencerDialogProps {
    onChange: (index: number) => void;
    onClose: () => void;
    trackId: string;
    value: List<string | null>;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const { onChange, onClose, trackId, value } = props;
    const { name } = useTrackAtom(trackId);
    return (
        <Dialog
            confirmLabel="Save"
            isShown={true}
            onCloseComplete={onClose}
            title={`Sequencer for ${name}`}>
            <Sequencer onChange={onChange} trackId={trackId} value={value} />
        </Dialog>
    );
};

export { SequencerDialog };
