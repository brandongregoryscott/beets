import { majorScale, Pane, Text } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";

interface TrackTimeCardProps {
    index: number;
}

const TrackTimeCard: React.FC<TrackTimeCardProps> = (
    props: TrackTimeCardProps
) => {
    const { index } = props;
    const is4thBeat = index % 4 === 0;
    const { colors } = useTheme();
    return (
        <Pane
            alignItems="center"
            borderLeft={index !== 0}
            borderLeftColor={colors.gray900}
            borderLeftWidth={2}
            display="flex"
            flexDirection="row"
            height={majorScale(2)}
            justifyContent="center"
            width={majorScale(2)}>
            {is4thBeat && <Text fontSize="x-small">{index + 1}</Text>}
        </Pane>
    );
};

export { TrackTimeCard };
