import { TrackTimeCard } from "components/tracks/track-time/track-time-card";
import { Pane } from "evergreen-ui";
import { range } from "lodash";

interface TrackTimeProps {
    stepCount: number;
}

const TrackTime: React.FC<TrackTimeProps> = (props: TrackTimeProps) => {
    const { stepCount } = props;
    return (
        <Pane display="flex" flexDirection="row">
            {range(0, stepCount).map((index: number) => (
                <TrackTimeCard
                    index={index}
                    key={index}
                    stepCount={stepCount}
                />
            ))}
        </Pane>
    );
};

export { TrackTime };
