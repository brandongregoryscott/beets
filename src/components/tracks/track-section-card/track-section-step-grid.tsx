import { TrackSectionStepColumn } from "components/tracks/track-section-card/track-section-step-column";
import { Pane } from "evergreen-ui";
import { List } from "immutable";
import { range } from "lodash";
import type { TrackSectionRecord } from "models/track-section-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import { useMemo } from "react";

interface TrackSectionStepGridProps {
    stepCount: number;
    stepCountOffset: number;
    trackSection: TrackSectionRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const TrackSectionStepGrid: React.FC<TrackSectionStepGridProps> = (
    props: TrackSectionStepGridProps
) => {
    const { stepCount, stepCountOffset, trackSection, trackSectionSteps } =
        props;
    const groupedTrackSectionSteps = useMemo(
        () => trackSectionSteps.groupBy((e) => e.index),
        [trackSectionSteps]
    );
    return (
        <Pane display="flex" flexDirection="row">
            {range(0, trackSection.step_count).map((index: number) => (
                <TrackSectionStepColumn
                    index={index}
                    key={`${TrackSectionStepColumn.name}${index}`}
                    stepCount={stepCount}
                    stepCountOffset={stepCountOffset}
                    trackSectionSteps={groupedTrackSectionSteps
                        .get(index, List<TrackSectionStepRecord>())
                        .toList()}
                />
            ))}
        </Pane>
    );
};

export { TrackSectionStepGrid };
