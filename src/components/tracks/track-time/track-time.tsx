import { Playhead } from "components/tracks/track-time/playhead";
import { TrackTimeCard } from "components/tracks/track-time/track-time-card";
import { majorScale, Pane } from "evergreen-ui";
import { range } from "lodash";

interface TrackTimeProps {
    bpm: number;
    isPlaying: boolean;
    stepCount: number;
}

const TrackTime: React.FC<TrackTimeProps> = (props: TrackTimeProps) => {
    const { bpm, isPlaying, stepCount } = props;
    return (
        <Pane display="flex" flexDirection="row" marginLeft={majorScale(24)}>
            <Playhead bpm={bpm} isPlaying={isPlaying} stepCount={stepCount} />
            {range(0, stepCount).map((index: number) => (
                <TrackTimeCard index={index} key={index} />
            ))}
        </Pane>
    );
};

export { TrackTime };
