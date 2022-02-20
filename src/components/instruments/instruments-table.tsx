import {
    Table,
    Spinner,
    EmptyState,
    StyleIcon,
    TableRowProps,
} from "evergreen-ui";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { InstrumentRecord } from "models/instrument-record";
import { theme } from "theme";
import { hasValues } from "utils/collection-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { getFileById } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";

interface InstrumentsTableProps extends Pick<TableRowProps, "isSelectable"> {
    onSelect?: (instrument: InstrumentRecord) => void;
    selected?: InstrumentRecord;
}

const InstrumentsTable: React.FC<InstrumentsTableProps> = (
    props: InstrumentsTableProps
) => {
    const { isSelectable, onSelect, selected } = props;
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles();
    const { resultObject: instruments, isLoading: isLoadingInstruments } =
        useListInstruments({ files });

    const isLoading = isLoadingFiles || isLoadingInstruments;
    const hasInstruments = !isLoading && hasValues(instruments);

    return (
        <Table>
            <Table.Head>
                <Table.TextHeaderCell>Name</Table.TextHeaderCell>
                <Table.TextHeaderCell>Sample</Table.TextHeaderCell>
                <Table.TextHeaderCell>Updated On</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {isLoading && <Spinner margin="auto" />}
                {hasInstruments &&
                    instruments?.map((instrument) => (
                        <Table.Row
                            isSelectable={isSelectable}
                            isSelected={instrument.equals(selected)}
                            key={instrument.id}
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
                {!hasInstruments && !isLoading && (
                    <EmptyState
                        description="Save a new instrument to begin"
                        icon={<StyleIcon color={theme.colors.gray800} />}
                        iconBgColor={theme.colors.gray100}
                        title="No Instruments Found"
                    />
                )}
            </Table.Body>
        </Table>
    );
};

export { InstrumentsTable };
