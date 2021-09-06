import { majorScale, Pane, useTheme, Text } from "evergreen-ui";
import _ from "lodash";

interface TimeGridProps {
    count: number;
}

const TimeGrid: React.FC<TimeGridProps> = (props: TimeGridProps) => {
    const { count } = props;
    const theme: any = useTheme();
    console.log(theme);
    return (
        <Pane display="flex" flexDirection="row" marginBottom={majorScale(1)}>
            {_.range(0, count * 4).map((beat: number) => {
                const is4thBeat = beat % 4 === 0;
                return (
                    <Pane
                        borderLeftWidth={2}
                        borderLeft={beat !== 0}
                        borderLeftColor={
                            is4thBeat
                                ? theme.colors.gray700
                                : theme.colors.gray500
                        }
                        key={beat}
                        width={majorScale(4)}
                        height={majorScale(4)}>
                        {is4thBeat && (
                            <Text fontSize="x-small">{beat + 1}</Text>
                        )}
                    </Pane>
                );
            })}
        </Pane>
    );
};

export { TimeGrid };
