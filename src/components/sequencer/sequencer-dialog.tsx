import { Sequencer } from "components/sequencer/sequencer";
import { Dialog } from "evergreen-ui";
import { useTrackState } from "utils/hooks/use-track-state";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { useState } from "react";

interface SequencerDialogProps {
    files: Array<FileRecord>;
    onChange: (value: List<List<FileRecord>>) => void;
    onClose: () => void;
    trackId: string;
    value: List<List<FileRecord>>;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const { onChange, onClose, files, trackId, value: initialValue } = props;
    const { name } = useTrackState(trackId);
    const [value, setValue] = useState<List<List<FileRecord>>>(initialValue);

    const handleChange = (index: number, value: List<FileRecord>) =>
        setValue((prev) => prev.set(index, value));

    const handleConfirm = () => {
        onChange(value);
        onClose();
    };

    return (
        <Dialog
            confirmLabel="Save"
            isShown={true}
            onCloseComplete={onClose}
            onConfirm={handleConfirm}
            title={`Sequencer for ${name}`}>
            <Sequencer
                files={files}
                onChange={handleChange}
                trackId={trackId}
                value={value}
            />
        </Dialog>
    );
};

export { SequencerDialog };
