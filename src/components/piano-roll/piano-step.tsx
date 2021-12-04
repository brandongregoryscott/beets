import { majorScale, Pane } from "evergreen-ui";
import { MidiNote } from "reactronica";
import { useTheme } from "utils/hooks/use-theme";

interface PianoStepProps {
    index: number;
    isSelected: boolean;
    note: MidiNote;
    onClick?: (note: MidiNote) => void;
}

const PianoStep: React.FC<PianoStepProps> = (props: PianoStepProps) => {
    const theme = useTheme();
    const { isSelected } = props;
    const height = majorScale(3);
    const width = majorScale(6);
    return (
        <Pane
            alignItems="center"
            background={
                isSelected ? theme.colors.gray700 : theme.colors.gray300
            }
            display="flex"
            flexGrow={1}
            height={height}
            hoverElevation={4}
            justifyContent="center"
            minHeight={height}
            minWidth={width}
            width={width}
        />
    );
};

export { PianoStep };
