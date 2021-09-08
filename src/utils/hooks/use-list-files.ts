import { BucketName } from "enums/bucket-name";
import { SortOptions } from "interfaces/sort-options";
import { StorageProviderFile } from "interfaces/storage-provider-file";
import { useQuery } from "react-query";
import { useStorageProvider } from "utils/hooks/use-storage-provider";
import { QueryKeyUtils } from "utils/query-key-utils";

interface UseListFilesOptions {
    bucketName: BucketName;
    path?: string;
    sortBy?: SortOptions<StorageProviderFile>;
}

const useListFiles = (options: UseListFilesOptions) => {
    const { bucketName, path, sortBy } = options;
    const { storage } = useStorageProvider();
    const bucket = storage.from(bucketName);
    const listQuery = useQuery<{
        data: StorageProviderFile[] | null;
        error: Error | null;
    }>({
        queryKey: QueryKeyUtils.listFilesByBucket(bucketName),
        queryFn: () => bucket.list(path, { sortBy }),
    });

    return { ...listQuery };
};

export { useListFiles };
