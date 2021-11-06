import { TrackRecord } from "models/track-record";
import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListTracksOptions {
    filter?: (
        query: PostgrestFilterBuilder<Track>
    ) => PostgrestFilterBuilder<Track>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Track>) => query;

const useListTracks = (
    options?: UseListTracksOptions
): UseQueryResult<TrackRecord[], Error> => {
    const { fromTracks } = useDatabase();
    const { filter = defaultFilter } = options ?? {};

    const result = useQuery<TrackRecord[], Error>({
        key: Tables.Tracks,
        fn: async () => {
            const query = fromTracks().select("*");
            const { data, error } = await filter(query);
            if (error != null) {
                throw error;
            }

            return data?.map((track) => new TrackRecord(track)) ?? [];
        },
    });

    return result;
};

export { useListTracks };
