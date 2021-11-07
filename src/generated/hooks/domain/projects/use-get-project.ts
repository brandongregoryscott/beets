import { ProjectRecord } from "models/project-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetProjectOptions {
    id: string;
}

const useGetProject = (
    options: UseGetProjectOptions
): UseQueryResult<ProjectRecord | undefined, Error> => {
    const { fromProjects } = useDatabase();
    const { id } = options;

    const get = async () => {
        const query = fromProjects().select("*").eq("id", id).limit(1).single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return new ProjectRecord(data);
    };

    const result = useQuery<ProjectRecord | undefined, Error>({
        key: Tables.Projects,
        fn: get,
    });

    return result;
};

export { useGetProject };
