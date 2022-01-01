import { InstrumentRecord } from "models/instrument-record";
import { Instrument } from "generated/interfaces/instrument";
import { UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { List } from "immutable";
import { FileRecord } from "models/file-record";
import { useListInstruments as useGeneratedListInstruments } from "generated/hooks/domain/instruments/use-list-instruments";
import { useGlobalState } from "utils/hooks/use-global-state";
import { buildDemoInstruments } from "utils/build-demo-instruments";
import { stubUseQueryResult } from "utils/use-query-utils";

interface UseListInstrumentsOptions {
    enabled?: boolean;
    files?: List<FileRecord>;
    filter?: (
        query: PostgrestFilterBuilder<Instrument>
    ) => PostgrestFilterBuilder<Instrument>;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: InstrumentRecord[]) => void;
}

const useListInstruments = (
    options?: UseListInstrumentsOptions
): UseQueryResult<InstrumentRecord[], Error> => {
    const { files } = options ?? {};
    const { globalState } = useGlobalState();
    const result = useGeneratedListInstruments(options);
    const demoInstruments = buildDemoInstruments(files).toArray();

    return globalState.isAuthenticated()
        ? result
        : stubUseQueryResult(demoInstruments);
};

export { useListInstruments };
