import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListTracksOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Track>
    ) => PostgrestFilterBuilder<Track>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackRecord[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<Track>) => query;

const useListTracks = (
    options?: UseListTracksOptions
): UseQueryResult<TrackRecord[], Error> => {
    const { fromTracks } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
    } = options ?? {};

    const list = async () => {
        const query = fromTracks().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((track) => new TrackRecord(track)) ?? [];
    };

    const result = useQuery<TrackRecord[], Error>({
        enabled,
        key: [Tables.Tracks, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListTracks };
