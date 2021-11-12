import { Sequencer } from "components/sequencer/sequencer";
import { Dialog } from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { useState } from "react";

interface SequencerDialogProps {
    stepCount: number;
    files: Array<FileRecord>;
    onStepChange: (value: List<List<FileRecord>>) => void;
    onStepCountChange: (stepCount: number) => void;
    onClose: () => void;
    steps: List<List<FileRecord>>;
}

const SequencerDialog: React.FC<SequencerDialogProps> = (
    props: SequencerDialogProps
) => {
    const {
        onStepChange,
        onStepCountChange,
        onClose,
        files,
        steps: initialValue,
        stepCount: initialStepCount,
    } = props;
    const [steps, setSteps] = useState<List<List<FileRecord>>>(initialValue);
    const [stepCount, setStepCount] = useState<number>(initialStepCount);

    const handleStepChange = (index: number, value: List<FileRecord>) =>
        setSteps((prev) => prev.set(index, value));

    const handleConfirm = () => {
        onStepChange(steps);
        onStepCountChange(stepCount);
        onClose();
    };

    return (
        <Dialog
            confirmLabel="Save"
            isShown={true}
            onCloseComplete={onClose}
            onConfirm={handleConfirm}
            title="Sequencer">
            <Sequencer
                files={files}
                onStepChange={handleStepChange}
                stepCount={stepCount}
                onStepCountChange={setStepCount}
                steps={steps}
            />
        </Dialog>
    );
};

export { SequencerDialog };
