import { File } from "generated/interfaces/file";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

const useListFiles = (): UseQueryResult<File[], Error> => {
    const { fromFiles } = useDatabase();
    const listQuery = useQuery<File[], Error>({
        key: Tables.Files,
        fn: async () => {
            const result = await fromFiles().select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return listQuery;
};

export { useListFiles };
