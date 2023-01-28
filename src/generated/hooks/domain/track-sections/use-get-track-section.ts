import { TrackSectionRecord } from "models/track-section-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";

interface UseGetTrackSectionOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetTrackSection = (
    options: UseGetTrackSectionOptions
): UseQueryResult<TrackSectionRecord | undefined, Error> => {
    const { fromTrackSections } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromTrackSections()
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

        return new TrackSectionRecord(data);
    };

    const result = useQuery<TrackSectionRecord | undefined, Error>({
        enabled,
        key: [Tables.TrackSections, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetTrackSection };
