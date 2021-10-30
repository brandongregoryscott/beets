import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { projectsKey } from "utils/query-key-utils";
import { useDatabase } from "generated/hooks/use-database";
import { ProjectRecord } from "models/project-record";
import { Project } from "generated/interfaces/project";

const useListProjects = (): UseQueryResult<ProjectRecord[], Error> => {
    const { fromProjects } = useDatabase();
    const listQuery = useQuery<ProjectRecord[], Error>({
        key: projectsKey(),
        fn: async () => {
            const result = await fromProjects().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return (
                data?.map((project: Project) => new ProjectRecord(project)) ??
                []
            );
        },
    });

    return listQuery;
};

export { useListProjects };
