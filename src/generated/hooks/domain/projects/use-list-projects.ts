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

const useListProjects = (
    options?: UseListProjectsOptions
): UseQueryResult<Project[], Error> => {
    const { fromProjects } = useDatabase();
    const { filter } = options ?? {};

    const result = useQuery<Project[], Error>({
        key: Tables.Projects,
        fn: async () => {
            let query = fromProjects().select("*");
            if (filter != null) {
                query = filter(query);
            }

            const { data, error } = await query;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return result;
};

export { useListProjects };
