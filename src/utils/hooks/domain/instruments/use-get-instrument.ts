import { InstrumentRecord } from "models/instrument-record";
import { UseQueryResult } from "utils/hooks/use-query";
import { useGetInstrument as useGeneratedGetInstrument } from "generated/hooks/domain/instruments/use-get-instrument";
import { FileRecord } from "models/file-record";
import { List } from "immutable";
import { isUuid } from "utils/id-utils";
import { stubUseQueryResult } from "utils/use-query-utils";
import { buildDemoInstruments } from "utils/build-demo-instruments";

interface UseGetInstrumentOptions {
    enabled?: boolean;
    files?: List<FileRecord>;
    id: string;
}

const useGetInstrument = (
    options: UseGetInstrumentOptions
): UseQueryResult<InstrumentRecord | undefined, Error> => {
    const { id, enabled, files } = options;
    const result = useGeneratedGetInstrument({
        id,
        enabled: isUuid(id) ? enabled : false,
    });

    const demoInstrument = buildDemoInstruments(files).find(
        (instrument) => id === instrument.id
    );

    return isUuid(id) ? result : stubUseQueryResult(demoInstrument);
};

export { useGetInstrument };
