import { Track } from "generated/interfaces/track";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useListTracks = (): UseQueryResult<Track[], Error> => {
    const { fromTracks } = useDatabase();
    const listQuery = useQuery<Track[], Error>({
        key: Tables.Tracks,
        fn: async () => {
            const result = await fromTracks().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return listQuery;
};

export { useListTracks };
