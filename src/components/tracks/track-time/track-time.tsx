import { TrackTimeCard } from "components/tracks/track-time/track-time-card";
import { majorScale, Pane } from "evergreen-ui";
import { range } from "lodash";

interface TrackTimeProps {
    stepCount: number;
}

const TrackTime: React.FC<TrackTimeProps> = (props: TrackTimeProps) => {
    const { stepCount } = props;
    return (
        <Pane
            display="flex"
            flexDirection="row"
            marginLeft={majorScale(24)}
            marginTop={-16}
            position="absolute">
            {range(0, stepCount).map((index: number) => (
                <TrackTimeCard index={index} key={index} />
            ))}
        </Pane>
    );
};

export { TrackTime };
