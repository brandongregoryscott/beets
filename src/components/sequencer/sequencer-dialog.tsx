import { Sequencer } from "components/sequencer/sequencer";
import { Dialog } from "evergreen-ui";
import { useTrackAtom } from "utils/hooks/use-track-atom";
import { List } from "immutable";
import { SelectMenuItem } from "components/select-menu";
import { FileRecord } from "models/file-record";
import { useState } from "react";

interface SequencerDialogProps {
    onChange: (value: List<List<FileRecord>>) => void;
    onClose: () => void;
    sampleOptions: Array<SelectMenuItem<FileRecord>>;
    trackId: string;
    value: List<List<FileRecord>>;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const {
        onChange,
        onClose,
        sampleOptions,
        trackId,
        value: initialValue,
    } = props;
    const { name } = useTrackAtom(trackId);
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
                onChange={handleChange}
                options={sampleOptions}
                trackId={trackId}
                value={value}
            />
        </Dialog>
    );
};

export { SequencerDialog };
