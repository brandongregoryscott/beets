import { BucketName } from "enums/bucket-name";
import { SortOptions } from "interfaces/sort-options";
import { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import { useQuery } from "react-query";
import { useStorageProvider } from "utils/hooks/use-storage-provider";
import { filesByBucketKey } from "utils/query-key-utils";

interface UseListStorageProviderFilesOptions {
    bucketName: BucketName;
    path?: string;
    sortBy?: SortOptions<StorageProviderFile>;
}

const useListStorageProviderFiles = (
    options: UseListStorageProviderFilesOptions
) => {
    const { bucketName, path, sortBy } = options;
    const { storage } = useStorageProvider();
    const bucket = storage.from(bucketName);
    const listQuery = useQuery<{
        data: StorageProviderFile[] | null;
        error: Error | null;
    }>({
        queryKey: filesByBucketKey(bucketName),
        queryFn: () => bucket.list(path, { sortBy }),
    });

    return { ...listQuery };
};

export { useListStorageProviderFiles };
