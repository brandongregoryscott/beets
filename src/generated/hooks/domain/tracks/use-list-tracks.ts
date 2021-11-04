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

const useListTracks = (
    options?: UseListTracksOptions
): UseQueryResult<Track[], Error> => {
    const { fromTracks } = useDatabase();
    const { filter } = options ?? {};

    const result = useQuery<Track[], Error>({
        key: Tables.Tracks,
        fn: async () => {
            let query = fromTracks().select("*");
            if (filter != null) {
                query = filter(query);
            }

            const { data, error } = await query;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return result;
};

export { useListTracks };
