import { majorScale, Pane, Text } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { css, hover } from "glamor";
import { useCallback } from "react";
import { useReactronicaState } from "utils/hooks/use-reactronica-state";

interface TrackTimeCardProps {
    index: number;
    isPlaying: boolean;
    isStartIndex: boolean;
    stepCount: number;
}

const TrackTimeCard: React.FC<TrackTimeCardProps> = (
    props: TrackTimeCardProps
) => {
    const { index, isPlaying, isStartIndex, stepCount } = props;
    const is4thBeat = index % 4 === 0;
    const { colors } = useTheme();
    const { setState } = useReactronicaState();
    const activeProps = isPlaying
        ? {
              transform: "translateY(-2px)",
          }
        : {};

    const className = css(hover({ transform: "translateY(-2px)" })).toString();

    const handleClick = useCallback(() => {
        setState((prev) => {
            const selectedIndex = index + 1;
            const { startIndex: prevStartIndex } = prev;
            if (selectedIndex === stepCount) {
                return prev;
            }

            if (prevStartIndex === selectedIndex) {
                return { ...prev, startIndex: undefined };
            }

            return { ...prev, startIndex: selectedIndex };
        });
    }, [index, setState, stepCount]);
    return (
        <Pane
            alignItems="center"
            borderLeft={index !== 0}
            borderLeftColor={isStartIndex ? colors.blue500 : colors.gray700}
            borderLeftWidth={2}
            cursor="pointer"
            display="flex"
            flexDirection="row"
            height={majorScale(2)}
            justifyContent="center"
            onClick={handleClick}
            width={majorScale(2)}>
            {is4thBeat && (
                <Text
                    {...activeProps}
                    className={className}
                    color={isPlaying ? colors.blue500 : undefined}
                    cursor="pointer"
                    fontSize="x-small">
                    {index + 1}
                </Text>
            )}
        </Pane>
    );
};

export { TrackTimeCard };
