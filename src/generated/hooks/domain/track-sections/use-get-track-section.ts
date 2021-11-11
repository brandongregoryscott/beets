import { TrackSectionRecord } from "models/track-section-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetTrackSectionOptions {
    enabled?: boolean;
    id: string;
}

const useGetTrackSection = (
    options: UseGetTrackSectionOptions
): UseQueryResult<TrackSectionRecord | undefined, Error> => {
    const { fromTrackSections } = useDatabase();
    const { id, enabled } = options;

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
        key: ["Get", Tables.TrackSections, id],
        fn: get,
    });

    return result;
};

export { useGetTrackSection };
