import type { InstrumentRecord } from "models/instrument-record";
import type { UseQueryResult } from "hooks/use-query";
import { useGetInstrument as useGeneratedGetInstrument } from "generated/hooks/domain/instruments/use-get-instrument";
import type { FileRecord } from "models/file-record";
import type { List } from "immutable";
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
