import {
    Text,
    TableRow,
    minorScale,
    TextTableCell,
    Pane,
    majorScale,
} from "evergreen-ui";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { MouseEvent } from "react";
import { getBorderYProps } from "utils/core-utils";

interface SequencerStepRowProps {
    step: TrackSectionStepRecord;
    steps: List<TrackSectionStepRecord>;
    file: FileRecord;
    onClick: (file: TrackSectionStepRecord) => void;
}

const borderRadius = minorScale(1);
const height = majorScale(3);

const SequencerStepRow: React.FC<SequencerStepRowProps> = (
    props: SequencerStepRowProps
) => {
    const { step, steps, file, onClick } = props;
    const isFirst = steps.indexOf(step) === 0;
    const isLast = steps.indexOf(step) === steps.count() - 1;

    const borderProps = getBorderYProps({
        isFirst,
        isLast,
        borderRadius,
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick(step);
    };

    return (
        <TableRow
            {...borderProps}
            height={height}
            isSelectable={true}
            onClick={handleClick}>
            <TextTableCell>
                <Pane alignItems="center" display="flex">
                    <Text fontSize="x-small">{file.name}</Text>
                </Pane>
            </TextTableCell>
        </TableRow>
    );
};

export { SequencerStepRow };
