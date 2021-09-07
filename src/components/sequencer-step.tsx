import { Card, majorScale, useTheme } from "evergreen-ui";

interface SequencerStepProps {
    index: number;
    isChecked?: boolean;
    onClick: (index: number) => void;
}

const SequencerStep: React.FC<SequencerStepProps> = (
    props: SequencerStepProps
) => {
    const { isChecked = false } = props;
    const theme: any = useTheme();
    const checkedColor = theme.colors.gray600;
    const uncheckedColor = theme.colors.dark;
    return (
        <Card
            backgroundColor={isChecked ? checkedColor : undefined}
            border={true}
            borderColor={isChecked ? checkedColor : uncheckedColor}
            height={majorScale(12)}
            hoverElevation={1}
            margin={majorScale(1)}
            width={majorScale(12)}
        />
    );
};

export { SequencerStep };
