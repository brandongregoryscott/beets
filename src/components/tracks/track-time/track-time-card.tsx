import { majorScale, Pane, Text } from "evergreen-ui";
import { useTheme } from "hooks/use-theme";
import { useCallback } from "react";
import { useToneControls } from "hooks/use-tone-controls";
import type { SelectorMap } from "ui-box";

interface TrackTimeCardProps {
    index: number;
    stepCount: number;
}

const selectors: SelectorMap = {
    "&:hover": {
        transform: "translateY(-2px)",
    },
};

const TrackTimeCard: React.FC<TrackTimeCardProps> = (
    props: TrackTimeCardProps
) => {
    const { index } = props;
    const { colors } = useTheme();
    const { onIndexClick, isSelected } = useToneControls();

    const handleClick = useCallback(
        () => onIndexClick(index),
        [index, onIndexClick]
    );

    const step = index + 1 >= 100 ? getLastTwoDigits(index) : index + 1;

    return (
        <Pane
            alignItems="center"
            backgroundColor={isSelected(index) ? colors.blue200 : undefined}
            cursor="pointer"
            data-index={index}
            display="flex"
            flexDirection="row"
            height={majorScale(2)}
            justifyContent="center"
            maxWidth={majorScale(2)}
            minWidth={majorScale(2)}
            onClick={handleClick}
            selectors={selectors}
            width={majorScale(2)}>
            <Text cursor="pointer" fontSize="x-small" userSelect="none">
                {step}
            </Text>
        </Pane>
    );
};

const getLastTwoDigits = (index: number): string => {
    const string = (index + 1).toString();
    const values = string.split("");
    return [values.pop(), values.pop()].reverse().join("");
};

export { TrackTimeCard };
