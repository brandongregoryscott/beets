import { TrackSectionRecord } from "models/track-section-record";
import { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListTrackSectionsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<TrackSection>
    ) => PostgrestFilterBuilder<TrackSection>;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackSectionRecord[]) => void;
}

const defaultFilter = (query: PostgrestFilterBuilder<TrackSection>) => query;

const useListTrackSections = (
    options?: UseListTrackSectionsOptions
): UseQueryResult<TrackSectionRecord[], Error> => {
    const { fromTrackSections } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        onError,
        onSuccess,
    } = options ?? {};

    const list = async () => {
        const query = fromTrackSections().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return (
            data?.map((tracksection) => new TrackSectionRecord(tracksection)) ??
            []
        );
    };

    const result = useQuery<TrackSectionRecord[], Error>({
        enabled,
        key: Tables.TrackSections,
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListTrackSections };
