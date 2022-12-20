import { TrackSectionStepColumnWidth } from "components/tracks/track-section-card/track-section-step-column";
import { majorScale } from "evergreen-ui";
import { memo } from "react";

interface TrackSectionStepRowProps {
    backgroundColor: string | undefined;
}

const height = majorScale(2);

const _TrackSectionStepRow: React.FC<TrackSectionStepRowProps> = (
    props: TrackSectionStepRowProps
) => {
    const { backgroundColor } = props;
    return (
        <div
            style={{
                backgroundColor,
                height,
                minHeight: height,
                minWidth: TrackSectionStepColumnWidth,
                width: TrackSectionStepColumnWidth,
            }}
        />
    );
};

const TrackSectionStepRow = memo(_TrackSectionStepRow);
TrackSectionStepRow.displayName = "TrackSectionStepRow";

export { TrackSectionStepRow };
