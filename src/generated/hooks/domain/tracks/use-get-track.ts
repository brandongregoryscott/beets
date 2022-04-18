import { TrackRecord } from "models/track-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetTrackOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetTrack = (
    options: UseGetTrackOptions
): UseQueryResult<TrackRecord | undefined, Error> => {
    const { fromTracks } = SupabaseClient;
    const { id, enabled, key = [] } = options;

    const get = async () => {
        const query = fromTracks().select("*").eq("id", id).limit(1).single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return new TrackRecord(data);
    };

    const result = useQuery<TrackRecord | undefined, Error>({
        enabled,
        key: [Tables.Tracks, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetTrack };
