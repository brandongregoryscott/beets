import { Card, majorScale } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";

interface SequencerStepProps {
    index: number;
    isChecked?: boolean;
    onClick: (index: number) => void;
}

const SequencerStep: React.FC<SequencerStepProps> = (
    props: SequencerStepProps
) => {
    const { index, isChecked = false, onClick } = props;
    const theme = useTheme();
    const checkedColor = theme.colors.gray600;
    const uncheckedColor = theme.colors.dark;
    const handleClick = () => onClick(index);
    return (
        <Card
            backgroundColor={isChecked ? checkedColor : undefined}
            border={true}
            borderColor={isChecked ? checkedColor : uncheckedColor}
            height={majorScale(12)}
            hoverElevation={1}
            margin={majorScale(1)}
            onClick={handleClick}
            width={majorScale(12)}
        />
    );
};

export { SequencerStep };
