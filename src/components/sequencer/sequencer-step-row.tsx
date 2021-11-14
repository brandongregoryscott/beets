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
import { MouseEvent } from "react";
import { getBorderYProps } from "utils/core-utils";

interface SequencerStepRowProps {
    file: FileRecord;
    files: List<FileRecord>;
    onClick: (file: FileRecord) => void;
}

const borderRadius = minorScale(1);
const height = majorScale(3);

const SequencerStepRow: React.FC<SequencerStepRowProps> = (
    props: SequencerStepRowProps
) => {
    const { file, files, onClick } = props;
    const isFirst = files.indexOf(file) === 0;
    const isLast = files.indexOf(file) === files.count() - 1;

    const borderProps = getBorderYProps({
        isFirst,
        isLast,
        borderRadius,
    });

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClick(file);
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
