import { TrackSectionStepRow } from "components/tracks/track-section-card/track-section-step-row";
import { Elevation, majorScale, Pane } from "evergreen-ui";
import { List } from "immutable";
import { useAtomValue } from "jotai/utils";
import { range } from "lodash";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";
import { useCurrentIndex } from "utils/hooks/use-current-index";

interface TrackSectionStepColumnProps {
    index: number;
    stepCount: number;
    stepCountOffset: number;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const TrackSectionStepColumnWidth = majorScale(2);

const TrackSectionStepColumn: React.FC<TrackSectionStepColumnProps> = (
    props: TrackSectionStepColumnProps
) => {
    const { index, stepCount, stepCountOffset, trackSectionSteps } = props;
    const { isPlaying, startIndex, endIndex } = useAtomValue(ToneStateAtom);
    const currentIndex = useCurrentIndex({
        startIndex,
        endIndex: endIndex ?? stepCount - 1,
    });
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
