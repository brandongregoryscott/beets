import { FileRecord } from "models/file-record";
import { useDatabase } from "utils/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { File } from "types/file";
import { filesKey } from "utils/query-key-utils";

interface UseListFilesOptions {}

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<FileRecord[], Error> => {
    const { from } = useDatabase();
    const fileTable = from("files");
    const listQuery = useQuery<FileRecord[], Error>({
        key: filesKey(),
        fn: async () => {
            const result = await fileTable.select("*");
            const { data, error } = result;
            if (error != null) {
                throw error;
            }

            return data?.map((file: File) => new FileRecord(file)) ?? [];
        },
    });

    return { ...listQuery };
};

export { useListFiles };
