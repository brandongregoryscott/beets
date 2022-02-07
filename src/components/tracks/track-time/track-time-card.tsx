import { majorScale, Pane, Text } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { css, hover } from "glamor";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";
import { useCallback } from "react";

interface TrackTimeCardProps {
    index: number;
}

const TrackTimeCard: React.FC<TrackTimeCardProps> = (
    props: TrackTimeCardProps
) => {
    const { index } = props;
    const { colors } = useTheme();
    const { onIndexClick, isSelected, state } = useReactronicaState();

    const handleClick = useCallback(
        () => onIndexClick(index),
        [index, onIndexClick]
    );

    const className = css(hover({ transform: "translateY(-2px)" })).toString();

    return (
        <Pane
            alignItems="center"
            backgroundColor={isSelected(index) ? colors.blue200 : undefined}
            className={className}
            cursor="pointer"
            display="flex"
            flexDirection="row"
            height={majorScale(2)}
            justifyContent="center"
            onClick={handleClick}
            transform={state.index === index ? "translateY(-2px)" : undefined}
            width={majorScale(2)}>
            <Text cursor="pointer" fontSize="x-small" userSelect="none">
                {index + 1}
            </Text>
        </Pane>
    );
};

export { TrackTimeCard };