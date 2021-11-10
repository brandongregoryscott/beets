import { FileRecord } from "models/file-record";
import { Tables } from "generated/enums/tables";
import { useDatabase } from "generated/hooks/use-database";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

interface UseGetFileOptions {
    enabled?: boolean;
    id: string;
}

const useGetFile = (
    options: UseGetFileOptions
): UseQueryResult<FileRecord | undefined, Error> => {
    const { fromFiles } = useDatabase();
    const { id, enabled } = options;

    const get = async () => {
        const query = fromFiles().select("*").eq("id", id).limit(1).single();
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        if (data == null) {
            return undefined;
        }

        return new FileRecord(data);
    };

    const result = useQuery<FileRecord | undefined, Error>({
        enabled,
        key: ["Get", Tables.Files, id],
        fn: get,
    });

    return result;
};

export { useGetFile };
