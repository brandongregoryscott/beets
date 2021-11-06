import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

interface UseListProjectsOptions {
    filter?: (
        query: PostgrestFilterBuilder<Project>
    ) => PostgrestFilterBuilder<Project>;
}

const defaultFilter = (query: PostgrestFilterBuilder<Project>) => query;

const useListProjects = (
    options?: UseListProjectsOptions
): UseQueryResult<ProjectRecord[], Error> => {
    const { fromProjects } = useDatabase();
    const { filter = defaultFilter } = options ?? {};

    const result = useQuery<ProjectRecord[], Error>({
        key: Tables.Projects,
        fn: async () => {
            const query = fromProjects().select("*");
            const { data, error } = await filter(query);
            if (error != null) {
                throw error;
            }

            return data?.map((project) => new ProjectRecord(project)) ?? [];
        },
    });

    return result;
};

export { useListProjects };
