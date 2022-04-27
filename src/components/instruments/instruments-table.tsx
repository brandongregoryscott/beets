import {
    Table,
    Spinner,
    EmptyState,
    TableRowProps,
    StepChartIcon,
} from "evergreen-ui";
import { useListInstruments } from "utils/hooks/domain/instruments/use-list-instruments";
import { InstrumentRecord } from "models/instrument-record";
import { hasValues } from "utils/collection-utils";
import { formatUpdatedOn } from "utils/date-utils";
import { getFileById } from "utils/file-utils";
import { useListFiles } from "utils/hooks/domain/files/use-list-files";
import { useTheme } from "utils/hooks/use-theme";

interface InstrumentsTableProps extends Pick<TableRowProps, "isSelectable"> {
    onDeselect?: (instrument: InstrumentRecord) => void;
    onSelect?: (instrument: InstrumentRecord) => void;
    selected?: InstrumentRecord;
}

const InstrumentsTable: React.FC<InstrumentsTableProps> = (
    props: InstrumentsTableProps
) => {
    const { colors } = useTheme();
    const { isSelectable, onDeselect, onSelect, selected } = props;
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
                {!hasInstruments && !isLoading && (
                    <EmptyState
                        description="Save a new Instrument to begin"
                        icon={<StepChartIcon color={colors.gray500} />}
                        iconBgColor={colors.gray200}
                        title="No Instruments Found"
                    />
                )}
            </Table.Body>
        </Table>
    );
};

export { InstrumentsTable };
