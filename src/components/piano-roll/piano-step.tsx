import { Flex } from "components/flex";
import { majorScale } from "evergreen-ui";
import { useCallback } from "react";
import type { MidiNote } from "types/midi-note";
import { useTheme } from "hooks/use-theme";

interface PianoStepProps {
    index: number;
    isSelected: boolean;
    note: MidiNote;
    onClick: (index: number, note: MidiNote) => void;
}

const PianoStep: React.FC<PianoStepProps> = (props: PianoStepProps) => {
    const { colors } = useTheme();
    const { index, isSelected, note, onClick } = props;
    const height = majorScale(4);
    const width = majorScale(4);
    const handleClick = useCallback(
        () => onClick(index, note),
        [index, note, onClick]
    );

    return (
        <Flex.Row
            alignItems="center"
            background={isSelected ? colors.gray700 : colors.gray300}
            borderWidth={1}
            cursor="pointer"
            data-index={index}
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
