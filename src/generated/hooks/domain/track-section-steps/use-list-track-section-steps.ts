import { TrackSectionStepRecord } from "models/track-section-step-record";
import type { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "utils/hooks/use-query";
import { useQuery } from "utils/hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";

interface UseListTrackSectionStepsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<TrackSectionStep>
    ) => PostgrestFilterBuilder<TrackSectionStep>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackSectionStepRecord[]) => void;
    sortBy?: SortOptions<TrackSectionStep>;
}

const defaultFilter = (query: PostgrestFilterBuilder<TrackSectionStep>) =>
    query;

const useListTrackSectionSteps = (
    options?: UseListTrackSectionStepsOptions
): UseQueryResult<TrackSectionStepRecord[], Error> => {
    const { fromTrackSectionSteps } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromTrackSectionSteps().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return (
            data?.map(
                (tracksectionstep) =>
                    new TrackSectionStepRecord(tracksectionstep)
            ) ?? []
        );
    };

    const result = useQuery<TrackSectionStepRecord[], Error>({
        enabled,
        key: [Tables.TrackSectionSteps, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListTrackSectionSteps };
