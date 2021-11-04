import { Project } from "generated/interfaces/project";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useListProjects = (): UseQueryResult<Project[], Error> => {
    const { fromProjects } = useDatabase();
    const listQuery = useQuery<Project[], Error>({
        key: Tables.Projects,
        fn: async () => {
            const result = await fromProjects().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return listQuery;
};

export { useListProjects };
