import { Table, Spinner, TableRowProps } from "evergreen-ui";
import { InstrumentRecord } from "models/instrument-record";
import { hasValues } from "utils/collection-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { getFileById } from "utils/file-utils";
import { List } from "immutable";
import { FileRecord } from "models/file-record";

interface InstrumentsTableProps extends Pick<TableRowProps, "isSelectable"> {
    emptyState?: React.ReactNode;
    files?: List<FileRecord> | FileRecord[];
    instruments?: List<InstrumentRecord> | InstrumentRecord[];
    isLoading?: boolean;
    onDeselect?: (instrument: InstrumentRecord) => void;
    onSelect?: (instrument: InstrumentRecord) => void;
    selected?: InstrumentRecord;
}

const InstrumentsTable: React.FC<InstrumentsTableProps> = (
    props: InstrumentsTableProps
) => {
    const {
        isSelectable,
        onDeselect,
        onSelect,
        selected,
        isLoading,
        emptyState,
        instruments,
        files,
    } = props;

    const hasInstruments = !isLoading && hasValues(instruments);

    return (
        <Table>
            <Table.Head>
                <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                <Table.TextHeaderCell>Sample</Table.TextHeaderCell>
                <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {isLoading && (
                    <Table.Row>
                        <Spinner margin="auto" />
                    </Table.Row>
                )}
                {hasInstruments &&
                    instruments?.map((instrument) => (
                        <Table.Row
                            isSelectable={isSelectable}
                            isSelected={instrument.equals(selected)}
                            key={instrument.id}
                            onDeselect={() => onDeselect?.(instrument)}
                            onSelect={() => onSelect?.(instrument)}>
                            <Table.TextCell>{instrument.name}</Table.TextCell>
                            <Table.TextCell>
                                {getFileById(instrument.file_id, files)?.name}
                            </Table.TextCell>
                            <Table.TextCell>
                                {formatUpdatedOn(instrument.getUpdatedOn())}
                            </Table.TextCell>
                        </Table.Row>
                    ))}
                {!hasInstruments && !isLoading && emptyState}
            </Table.Body>
        </Table>
    );
};

export { InstrumentsTable };
