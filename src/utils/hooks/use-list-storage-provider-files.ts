import { BucketName } from "enums/bucket-name";
import { SortOptions } from "interfaces/sort-options";
import { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { useStorageProvider } from "utils/hooks/use-storage-provider";
import { filesByBucketKey } from "utils/query-key-utils";

interface UseListStorageProviderFilesOptions {
    bucketName: BucketName;
    path?: string;
    sortBy?: SortOptions<StorageProviderFile>;
}

const useListStorageProviderFiles = (
    options: UseListStorageProviderFilesOptions
): UseQueryResult<StorageProviderFile[], Error> => {
    const { bucketName, path, sortBy } = options;
    const { storage } = useStorageProvider();
    const bucket = storage.from(bucketName);
    const listQuery = useQuery<StorageProviderFile[], Error>({
        key: filesByBucketKey(bucketName),
        fn: async () => {
            const { data, error } = await bucket.list(path, {
                sortBy,
            });

            if (error != null) {
                throw error;
            }

            return data ?? [];
        },
    });

    return { ...listQuery };
};

export { useListStorageProviderFiles };
