import { ProjectRecord } from "models/project-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import type { UseQueryResult } from "utils/hooks/use-query";
import { useQuery } from "utils/hooks/use-query";

interface UseGetProjectOptions {
    enabled?: boolean;
    id: string;
    key?: any[];
}

const useGetProject = (
    options: UseGetProjectOptions
): UseQueryResult<ProjectRecord | undefined, Error> => {
    const { fromProjects } = SupabaseClient;
    const { id, enabled, key = [] } = options;

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
        enabled,
        key: [Tables.Projects, id, ...key],
        fn: get,
    });

    return result;
};

export { useGetProject };
