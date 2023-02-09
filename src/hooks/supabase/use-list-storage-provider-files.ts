import type { BucketName } from "enums/bucket-name";
import type { SortOptions } from "interfaces/sort-options";
import type { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import { merge } from "lodash";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { isNilOrEmpty, mapTo } from "utils/collection-utils";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import { useStorageProvider } from "hooks/supabase/use-storage-provider";
import { storageProviderFilesKey } from "utils/query-key-utils";

interface UseListStorageProviderFilesOptions {
    bucketName: BucketName;
    enabled?: boolean;
    includeSignedUrl?: boolean;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: StorageProviderFileRecord[]) => void;
    path?: string;
    sortBy?: SortOptions<StorageProviderFile>;
}

const useListStorageProviderFiles = (
    options: UseListStorageProviderFilesOptions
): UseQueryResult<StorageProviderFileRecord[], Error> => {
    const {
        bucketName,
        enabled,
        includeSignedUrl,
        onError,
        onSuccess,
        path,
        sortBy,
    } = options;
    const { storage } = useStorageProvider();
    const bucket = storage.from(bucketName);

    const listQuery = useQuery<StorageProviderFileRecord[], Error>({
        enabled,
        key: [storageProviderFilesKey(), bucketName, path, sortBy],
        fn: async () => {
            const listResult = await bucket.list(path, {
                sortBy,
            });

            let files = listResult.data ?? [];
            const { error } = listResult;

            if (error != null) {
                throw error;
            }

            if (includeSignedUrl !== true) {
                return mapTo(files, StorageProviderFileRecord);
            }

            const signedUrlPromises = await Promise.all(
                files.map(async (file) => {
                    const { data, error } = await bucket.createSignedUrl(
                        !isNilOrEmpty(path)
                            ? `${path}/${file.name}`
                            : file.name,
                        60 * 60 * 24
                    );

                    if (error != null) {
                        throw error;
                    }

                    const { signedUrl } = data!;

                    return merge(file, { signedURL: signedUrl });
                })
            );

            return mapTo(signedUrlPromises, StorageProviderFileRecord);
        },
        onError,
        onSuccess,
    });

    return { ...listQuery };
};

export { useListStorageProviderFiles };
