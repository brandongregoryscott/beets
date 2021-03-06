import { TrackSectionRecord } from "models/track-section-record";
import { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { SortOptions } from "interfaces/sort-options";

interface UseListTrackSectionsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<TrackSection>
    ) => PostgrestFilterBuilder<TrackSection>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackSectionRecord[]) => void;
    sortBy?: SortOptions<TrackSection>;
}

const defaultFilter = (query: PostgrestFilterBuilder<TrackSection>) => query;

const useListTrackSections = (
    options?: UseListTrackSectionsOptions
): UseQueryResult<TrackSectionRecord[], Error> => {
    const { fromTrackSections } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromTrackSections().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

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
        key: [Tables.TrackSections, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListTrackSections };
