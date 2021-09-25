import { Sequencer } from "components/sequencer";
import { Dialog } from "evergreen-ui";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { List } from "immutable";
import { SelectMenuItem } from "components/select-menu";
import { FileRecord } from "models/file-record";

interface SequencerDialogProps {
    onChange: (index: number, value: List<FileRecord>) => void;
    onClose: () => void;
    sampleOptions: Array<SelectMenuItem<FileRecord>>;
    trackId: string;
    value: List<List<FileRecord>>;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const { onChange, onClose, sampleOptions, trackId, value } = props;
    const { name } = useTrackAtom(trackId);
    return (
        <Dialog
            confirmLabel="Save"
            isShown={true}
            onCloseComplete={onClose}
            title={`Sequencer for ${name}`}>
            <Sequencer
                onChange={onChange}
                options={sampleOptions}
                trackId={trackId}
                value={value}
            />
        </Dialog>
    );
};

export { SequencerDialog };
