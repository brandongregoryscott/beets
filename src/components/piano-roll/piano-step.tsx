import { Elevation, majorScale, Pane } from "evergreen-ui";
import { useCallback } from "react";
import { MidiNote } from "@brandongregoryscott/reactronica";
import { useTheme } from "utils/hooks/use-theme";

interface PianoStepProps {
    index: number;
    isFirst: boolean;
    isLast: boolean;
    isPlaying: boolean;
    isSelected: boolean;
    note: MidiNote;
    onClick: (index: number, note: MidiNote) => void;
}

const PianoStep: React.FC<PianoStepProps> = (props: PianoStepProps) => {
    const { colors } = useTheme();
    const { index, isPlaying, isSelected, note, onClick, isFirst, isLast } =
        props;
    const height = majorScale(3);
    const width = majorScale(6);
    const handleClick = useCallback(
        () => onClick(index, note),
        [index, note, onClick]
    );

    const activeProps = isPlaying
        ? {
              elevation: 1 as Elevation,
              transform: "translateY(-4px)",
          }
        : {};

    return (
        <Pane
            {...activeProps}
            alignItems="center"
            background={isSelected ? colors.gray700 : colors.gray300}
            borderBottom={isPlaying && isLast}
            borderColor={isPlaying ? colors.blue300 : undefined}
            borderLeft={isPlaying}
            borderRight={isPlaying}
            borderTop={isPlaying && isFirst}
            borderWidth={1}
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
