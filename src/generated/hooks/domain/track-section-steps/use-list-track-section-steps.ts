import { TrackSectionStepRecord } from "models/track-section-step-record";
import { TrackSectionStep } from "generated/interfaces/track-section-step";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListTrackSectionStepsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<TrackSectionStep>
    ) => PostgrestFilterBuilder<TrackSectionStep>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackSectionStepRecord[]) => void;
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
    } = options ?? {};

    const list = async () => {
        const query = fromTrackSectionSteps().select("*");
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
        key: [Tables.TrackSectionSteps, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListTrackSectionSteps };
