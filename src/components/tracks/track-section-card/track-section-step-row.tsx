import { TrackSectionStepColumnWidth } from "components/tracks/track-section-card/track-section-step-column";
import { majorScale, Pane } from "evergreen-ui";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { getStepColor } from "utils/theme-utils";

interface TrackSectionStepRowProps {
    index: number;
    trackSectionStep?: TrackSectionStepRecord;
}

const height = majorScale(2);

const TrackSectionStepRow: React.FC<TrackSectionStepRowProps> = (
    props: TrackSectionStepRowProps
) => {
    const { trackSectionStep } = props;
    return (
        <Pane
            backgroundColor={getStepColor(trackSectionStep?.file_id)}
            height={height}
            minHeight={height}
            minWidth={TrackSectionStepColumnWidth}
            width={TrackSectionStepColumnWidth}
        />
    );
};

export { TrackSectionStepRow };
