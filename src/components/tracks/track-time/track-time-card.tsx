import { majorScale, Pane, Text } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { css, hover } from "glamor";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";

interface TrackTimeCardProps {
    index: number;
    isPlaying: boolean;
    stepCount: number;
}

const TrackTimeCard: React.FC<TrackTimeCardProps> = (
    props: TrackTimeCardProps
) => {
    const { index, isPlaying } = props;
    const { colors } = useTheme();
    const { onIndexClick, isSelected } = useReactronicaState();
    const activeProps = isPlaying
        ? {
              transform: "translateY(-2px)",
          }
        : {};

    const className = css(hover({ transform: "translateY(-2px)" })).toString();

    return (
        <Pane
            {...activeProps}
            alignItems="center"
            backgroundColor={isSelected(index) ? colors.blue200 : undefined}
            className={className}
            cursor="pointer"
            display="flex"
            flexDirection="row"
            height={majorScale(2)}
            justifyContent="center"
            onClick={onIndexClick(index)}
            width={majorScale(2)}>
            <Text cursor="pointer" fontSize="x-small" userSelect="none">
                {index + 1}
            </Text>
        </Pane>
    );
};

export { TrackTimeCard };
