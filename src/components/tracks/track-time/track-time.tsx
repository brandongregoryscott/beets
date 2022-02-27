import { TrackTimeCard } from "components/tracks/track-time/track-time-card";
import { Pane } from "evergreen-ui";
import { range } from "lodash";
import { toDataAttributes } from "utils/data-attribute-utils";
import { useToneControls } from "utils/hooks/use-tone-controls";

interface TrackTimeProps {
    stepCount: number;
}

const TrackTime: React.FC<TrackTimeProps> = (props: TrackTimeProps) => {
    const { stepCount } = props;
    const { endIndex, startIndex } = useToneControls();
    return (
        <Pane
            {...toDataAttributes({
                endIndex,
                startIndex,
                stepCount,
            })}
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
