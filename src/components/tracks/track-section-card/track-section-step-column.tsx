import { TrackSectionStepRow } from "components/tracks/track-section-card/track-section-step-row";
import { Elevation, majorScale, Pane } from "evergreen-ui";
import { List } from "immutable";
import { useAtomValue } from "jotai/utils";
import { range } from "lodash";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { CurrentIndexAtom } from "utils/atoms/current-index-atom";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";

interface TrackSectionStepColumnProps {
    index: number;
    stepCountOffset: number;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const TrackSectionStepColumnWidth = majorScale(2);

const TrackSectionStepColumn: React.FC<TrackSectionStepColumnProps> = (
    props: TrackSectionStepColumnProps
) => {
    const { index, stepCountOffset, trackSectionSteps } = props;
    const currentIndex = useAtomValue(CurrentIndexAtom);
    const { isPlaying } = useAtomValue(ToneStateAtom);
    const activeProps =
        isPlaying && index + stepCountOffset === currentIndex
            ? {
                  elevation: 4 as Elevation,
                  transform: "translateY(-2px)",
              }
            : {};

    return (
        <Pane
            {...activeProps}
            display="flex"
            flexDirection="column"
            minWidth={TrackSectionStepColumnWidth}
            width={TrackSectionStepColumnWidth}>
            {range(0, 4).map((row: number) => (
                <TrackSectionStepRow
                    index={row}
                    key={`${TrackSectionStepRow.name}${row}`}
                    trackSectionStep={trackSectionSteps.get(row)}
                />
            ))}
        </Pane>
    );
};

export { TrackSectionStepColumn, TrackSectionStepColumnWidth };
