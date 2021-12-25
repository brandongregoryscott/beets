import { majorScale, Pane } from "evergreen-ui";
import { useCallback } from "react";
import { MidiNote } from "reactronica";
import { useTheme } from "utils/hooks/use-theme";

interface PianoStepProps {
    index: number;
    isSelected: boolean;
    note: MidiNote;
    onClick: (index: number, note: MidiNote) => void;
}

const PianoStep: React.FC<PianoStepProps> = (props: PianoStepProps) => {
    const theme = useTheme();
    const { index, isSelected, note, onClick } = props;
    const height = majorScale(3);
    const width = majorScale(6);
    const handleClick = useCallback(
        () => onClick(index, note),
        [index, note, onClick]
    );
    return (
        <Pane
            alignItems="center"
            background={
                isSelected ? theme.colors.gray700 : theme.colors.gray300
            }
            cursor="pointer"
            display="flex"
            flexGrow={1}
            height={height}
            hoverElevation={1}
            justifyContent="center"
            maxHeight={height}
            maxWidth={width}
            minHeight={height}
            minWidth={width}
            onClick={handleClick}
            width={width}
        />
    );
};

export { PianoStep };
