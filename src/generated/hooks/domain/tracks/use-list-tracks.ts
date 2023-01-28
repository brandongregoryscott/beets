import { TrackRecord } from "models/track-record";
import type { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";

interface UseListTracksOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Track>
    ) => PostgrestFilterBuilder<Track>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackRecord[]) => void;
    sortBy?: SortOptions<Track>;
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
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromTracks().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((track) => new TrackRecord(track)) ?? [];
    };

    const result = useQuery<TrackRecord[], Error>({
        enabled,
        key: [Tables.Tracks, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListTracks };
