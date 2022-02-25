import { TrackSectionStepRow } from "components/tracks/track-section-card/track-section-step-row";
import { majorScale, Pane } from "evergreen-ui";
import { List } from "immutable";
import { range } from "lodash";
import { TrackSectionStepRecord } from "models/track-section-step-record";

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
    const { index, stepCountOffset, trackSectionSteps } = props;

    return (
        <Pane
            display="flex"
            flexDirection="column"
            minWidth={TrackSectionStepColumnWidth}
            width={TrackSectionStepColumnWidth}>
            <div data-index={index + stepCountOffset}>
                {range(0, 4).map((row: number) => (
                    <TrackSectionStepRow
                        index={row}
                        key={`${TrackSectionStepRow.name}${row}`}
                        trackSectionStep={trackSectionSteps.get(row)}
                    />
                ))}
            </div>
        </Pane>
    );
};

export { TrackSectionStepColumn, TrackSectionStepColumnWidth };
