import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListProjectsOptions {
    enabled?: boolean;
    filter?: (
        query: PostgrestFilterBuilder<Project>
    ) => PostgrestFilterBuilder<Project>;
    key?: any[];
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: ProjectRecord[]) => void;
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
    } = options ?? {};

    const list = async () => {
        const query = fromProjects().select("*");
        const { data, error } = await filter(query);
        if (error != null) {
            throw error;
        }

        return data?.map((project) => new ProjectRecord(project)) ?? [];
    };

    const result = useQuery<ProjectRecord[], Error>({
        enabled,
        key: [Tables.Projects, ...key],
        fn: list,
        onError,
        onSuccess,
    });

    return result;
};

export { useListProjects };
