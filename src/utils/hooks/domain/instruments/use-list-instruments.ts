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
import { useMemo } from "react";

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
): UseQueryResult<List<InstrumentRecord>, Error> => {
    const { files } = options ?? {};
    const { globalState } = useGlobalState();
    const queryResult = useGeneratedListInstruments({
        ...(options ?? {}),
        enabled: globalState.isAuthenticated(),
    });
    const demoInstruments = useMemo(() => buildDemoInstruments(files), [files]);

    const authenticatedResult = useMemo(
        () => ({
            ...queryResult,
            resultObject: List(queryResult.resultObject),
        }),
        [queryResult]
    );

    const unauthenticatedResult = useMemo(
        () => stubUseQueryResult(demoInstruments),
        [demoInstruments]
    );

    const result = useMemo(
        () =>
            globalState.isAuthenticated()
                ? authenticatedResult
                : unauthenticatedResult,
        [authenticatedResult, globalState, unauthenticatedResult]
    );

    return result;
};

export { useListInstruments };
