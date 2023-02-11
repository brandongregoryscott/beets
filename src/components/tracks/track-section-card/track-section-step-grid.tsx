import { TrackSectionStepColumn } from "components/tracks/track-section-card/track-section-step-column";
import type { List } from "immutable";
import { range } from "lodash";
import type { TrackSectionRecord } from "models/track-section-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { memo, useMemo } from "react";
import { getStepColor } from "utils/theme-utils";

interface TrackSectionStepGridProps {
    stepCount: number;
    stepCountOffset: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const TrackSectionStepGrid: React.FC<TrackSectionStepGridProps> = memo(
    (props: TrackSectionStepGridProps) => {
        const { stepCount, stepCountOffset, trackSection, trackSectionSteps } =
            props;

        const groupedTrackSectionSteps = useMemo(
            () =>
                trackSectionSteps
                    .groupBy((e) => e.index)
                    .map((collection) => collection.toList()),
            [trackSectionSteps]
        );

        const backgroundColorsByIndex = useMemo(
            () =>
                groupedTrackSectionSteps.mapEntries(
                    ([index, trackSectionSteps]) => [
                        index,
                        trackSectionSteps.map((trackSectionStep) =>
                            getStepColor(trackSectionStep.file_id)
                        ),
                    ]
                ),
            [groupedTrackSectionSteps]
        );

        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                {range(0, trackSection.step_count).map((index: number) => (
                    <TrackSectionStepColumn
                        backgroundColors={backgroundColorsByIndex.get(index)}
                        index={index}
                        key={index}
                        stepCount={stepCount}
                        stepCountOffset={stepCountOffset}
                    />
                ))}
            </div>
        );
    }
);

TrackSectionStepGrid.displayName = "TrackSectionStepGrid";

export { TrackSectionStepGrid };
