import { Card, majorScale } from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { useTheme } from "utils/hooks/use-theme";

interface SequencerStepProps {
    index: number;
    selected: List<FileRecord>;
    value: List<FileRecord>;
    onClick: (index: number, files: List<FileRecord>) => void;
}

const SequencerStep: React.FC<SequencerStepProps> = (
    props: SequencerStepProps
) => {
    const { index, onClick, selected, value } = props;
    const theme = useTheme();
    const checkedColor = theme.colors.gray600;
    const uncheckedColor = theme.colors.dark;
    const isChecked = !value.isEmpty();
    const handleClick = () => onClick(index, selected); // This might need to be 'updated', not just selected
    return (
        <Card
            backgroundColor={isChecked ? checkedColor : undefined}
            border={true}
            borderColor={isChecked ? checkedColor : uncheckedColor}
            height={majorScale(12)}
            hoverElevation={1}
            margin={majorScale(1)}
            onClick={handleClick}
            width={majorScale(12)}>
            {value.map((file) => file.name).join(", ")}
        </Card>
    );
};

export { SequencerStep };
