import { TableRow, minorScale, TextTableCell, majorScale } from "evergreen-ui";
import type { List } from "immutable";
import type { FileRecord } from "models/file-record";
import type { TrackSectionStepRecord } from "models/track-section-step-record";
import type { MouseEvent } from "react";
import { useCallback } from "react";
import { getBorderYProps } from "utils/core-utils";

interface SequencerStepRowProps {
    file: FileRecord;
    onClick: (trackSectionStep: TrackSectionStepRecord) => void;
    trackSectionStep: TrackSectionStepRecord;
    trackSectionSteps: List<TrackSectionStepRecord>;
}

const borderRadius = minorScale(1);
const height = majorScale(3);

const SequencerStepRow: React.FC<SequencerStepRowProps> = (
    props: SequencerStepRowProps
) => {
    const { trackSectionStep, trackSectionSteps, file, onClick } = props;
    const isFirst = trackSectionSteps.indexOf(trackSectionStep) === 0;
    const isLast =
        trackSectionSteps.indexOf(trackSectionStep) ===
        trackSectionSteps.count() - 1;

    const borderProps = getBorderYProps({
        isFirst,
        isLast,
        borderRadius,
    });

    const handleClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            onClick(trackSectionStep);
        },
        [onClick, trackSectionStep]
    );

    return (
        <TableRow
            {...borderProps}
            height={height}
            isSelectable={true}
            onClick={handleClick}>
            <TextTableCell
                alignItems="center"
                display="flex"
                textProps={{ fontSize: "x-small" }}>
                {file.name}
            </TextTableCell>
        </TableRow>
    );
};

export { SequencerStepRow };
