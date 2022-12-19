import { TrackSectionStepRecord } from "models/track-section-step-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";

interface UseGetTrackSectionStepOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetTrackSectionStep = (
    options: UseGetTrackSectionStepOptions
): UseQueryResult<TrackSectionStepRecord | undefined, Error> => {
    const { fromTrackSectionSteps } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromTrackSectionSteps()
            .select("*")
            .eq("id", id)
            .limit(1)
            .single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return new TrackSectionStepRecord(data);
    };

    const result = useQuery<TrackSectionStepRecord | undefined, Error>({
        enabled,
        key: [Tables.TrackSectionSteps, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetTrackSectionStep };
