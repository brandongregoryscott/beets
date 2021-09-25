import { SequencerStepRow } from "components/sequencer/sequencer-step-row";
import { Tooltip } from "components/tooltip";
import { Card, majorScale } from "evergreen-ui";
import { List, Set } from "immutable";
import { FileRecord } from "models/file-record";

interface SequencerStepProps {
    index: number;
    selected: List<FileRecord>;
    value: List<FileRecord>;
    onChange: (index: number, files: List<FileRecord>) => void;
}

const maxCount = 4;

const SequencerStep: React.FC<SequencerStepProps> = (
    props: SequencerStepProps
) => {
    const { index, onChange, selected, value } = props;
    const hasSamples = !selected.isEmpty();
    const handleAdd = () => {
        if (
            value.count() >= maxCount ||
            value.count() + selected.count() > maxCount
        ) {
            return;
        }

        onChange(index, Set(value.push(...selected.toArray())).toList());
    };

    const handleRemove = (file: FileRecord) => {
        if (!value.includes(file)) {
            return;
        }

        onChange(index, value.remove(value.indexOf(file)));
    };

    return (
        <Tooltip
            content="Select one or more samples to drop in"
            shouldRender={!hasSamples && value.isEmpty()}>
            <Card
                border={true}
                cursor={hasSamples ? "pointer" : "not-allowed"}
                height={majorScale(12)}
                hoverElevation={1}
                margin={majorScale(1)}
                onClick={handleAdd}
                width={majorScale(12)}>
                {value.map((file) => (
                    <SequencerStepRow
                        file={file}
                        files={value}
                        onClick={handleRemove}
                    />
                ))}
            </Card>
        </Tooltip>
    );
};

export { SequencerStep };
