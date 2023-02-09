import { TrackSectionRecord } from "models/track-section-record";
import type { TrackSection } from "generated/interfaces/track-section";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";
import type { PublicSchema } from "generated/database";

interface UseListTrackSectionsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<
            PublicSchema,
            Record<string, unknown>,
            TrackSection
        >
    ) => PostgrestFilterBuilder<
        PublicSchema,
        Record<string, unknown>,
        TrackSection
    >;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: TrackSectionRecord[]) => void;
    sortBy?: SortOptions<TrackSection>;
}

const defaultFilter = (
    query: PostgrestFilterBuilder<
        PublicSchema,
        Record<string, unknown>,
        TrackSection
    >
) => query;

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
