import { ProjectRecord } from "models/project-record";
import type { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "utils/hooks/use-query";
import { useQuery } from "utils/hooks/use-query";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SortOptions } from "interfaces/sort-options";

interface UseListProjectsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Project>
    ) => PostgrestFilterBuilder<Project>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: ProjectRecord[]) => void;
    sortBy?: SortOptions<Project>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Project>) => query;

const useListProjects = (
    options?: UseListProjectsOptions
): UseQueryResult<ProjectRecord[], Error> => {
    const { fromProjects } = SupabaseClient;
    const {
        enabled,
        filter = defaultFilter,
        key = [],
        onError,
        onSuccess,
        sortBy,
    } = options ?? {};

    const list = async () => {
        let query = fromProjects().select("*");
        if (sortBy != null) {
            query = query.order(sortBy.column, {
                ascending: sortBy.order === "asc",
            });
        }

        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((project) => new ProjectRecord(project)) ?? [];
    };

    const result = useQuery<ProjectRecord[], Error>({
        enabled,
        key: [Tables.Projects, sortBy, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListProjects };
