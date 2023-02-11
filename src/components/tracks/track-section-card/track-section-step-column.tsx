import { TrackSectionStepRow } from "components/tracks/track-section-card/track-section-step-row";
import { majorScale } from "evergreen-ui";
import type { List } from "immutable";
import { memo } from "react";

interface TrackSectionStepColumnProps {
    backgroundColors?: List<string | undefined>;
    index: number;
    stepCount: number;
    stepCountOffset: number;
}

const TrackSectionStepColumnWidth = majorScale(2);

const _TrackSectionStepColumn: React.FC<TrackSectionStepColumnProps> = (
    props: TrackSectionStepColumnProps
) => {
    const { index, backgroundColors, stepCountOffset } = props;

    return (
        <div
            data-index={index + stepCountOffset}
            style={{
                display: "flex",
                flexDirection: "column",
                minWidth: TrackSectionStepColumnWidth,
                width: TrackSectionStepColumnWidth,
            }}>
            {backgroundColors?.map((backgroundColor, index) => (
                <TrackSectionStepRow
                    backgroundColor={backgroundColor}
                    key={index}
                />
            ))}
        </div>
    );
};

const TrackSectionStepColumn = memo(_TrackSectionStepColumn);
TrackSectionStepColumn.displayName = "TrackSectionStepColumn";

export { TrackSectionStepColumn, TrackSectionStepColumnWidth };
