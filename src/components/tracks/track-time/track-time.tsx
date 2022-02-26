import { TrackTimeCard } from "components/tracks/track-time/track-time-card";
import { Pane } from "evergreen-ui";
import { range } from "lodash";
import { useToneControls } from "utils/hooks/use-tone-controls";

interface TrackTimeProps {
    stepCount: number;
}

const TrackTime: React.FC<TrackTimeProps> = (props: TrackTimeProps) => {
    const { stepCount } = props;
    const { endIndex, startIndex } = useToneControls();
    return (
        <Pane
            data-end-index={endIndex}
            data-start-index={startIndex}
            data-step-count={stepCount}
            display="flex"
            flexDirection="row">
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
