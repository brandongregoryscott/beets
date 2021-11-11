import { TrackSectionStepRecord } from "models/track-section-step-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetTrackSectionStepOptions {
    enabled?: boolean;
    id: string;
}

const useGetTrackSectionStep = (
    options: UseGetTrackSectionStepOptions
): UseQueryResult<TrackSectionStepRecord | undefined, Error> => {
    const { fromTrackSectionSteps } = useDatabase();
    const { id, enabled } = options;

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
        key: ["Get", Tables.TrackSectionSteps, id],
        fn: get,
    });

    return result;
};

export { useGetTrackSectionStep };
