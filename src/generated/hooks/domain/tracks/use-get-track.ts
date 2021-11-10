import { TrackRecord } from "models/track-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetTrackOptions {
    enabled?: boolean;
    id: string;
}

const useGetTrack = (
    options: UseGetTrackOptions
): UseQueryResult<TrackRecord | undefined, Error> => {
    const { fromTracks } = useDatabase();
    const { id, enabled } = options;

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
        key: ["Get", Tables.Tracks, id],
        fn: get,
    });

    return result;
};

export { useGetTrack };
