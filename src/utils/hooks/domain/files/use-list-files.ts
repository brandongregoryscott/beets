import { FileRecord } from "models/file-record";
import { Tables } from "generated/enums/tables";
import { SupabaseClient } from "generated/supabase-client";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";
import { useGlobalState } from "utils/hooks/use-global-state";
import { mapToList } from "utils/collection-utils";
import { useListStorageProviderFiles } from "utils/hooks/supabase/use-list-storage-provider-files";
import { useCallback, useMemo } from "react";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { BucketName } from "enums/bucket-name";
import { List } from "immutable";
import _ from "lodash";
import { mergeUseQueryProperties } from "utils/use-query-utils";

interface UseListFilesOptions {
    enabled?: boolean;
    onError?: (error: Error) => void;
    onSuccess?: (resultObjects: List<FileRecord>) => void;
}

const path = "public";

const useListFiles = (
    options?: UseListFilesOptions
): UseQueryResult<List<FileRecord>, Error> => {
    const { globalState } = useGlobalState();
    const { fromFiles } = SupabaseClient;
    const { enabled = true, onError, onSuccess } = options ?? {};

    const handleStorageProviderSuccess = useCallback(
        (files: StorageProviderFileRecord[]) =>
            onSuccess?.(mapStorageProviderFiles(files)),
        [onSuccess]
    );

    const storageProviderFilesResult = useListStorageProviderFiles({
        bucketName: BucketName.Samples,
        enabled: enabled && !globalState.isAuthenticated(),
        onError,
        onSuccess: handleStorageProviderSuccess,
        path,
    });

    const list = async () => {
        const query = fromFiles().select("*");
        const { data, error } = await query;
        if (error != null) {
            throw error;
        }

        return mapToList(data!, FileRecord);
    };

    const filesResult = useQuery<List<FileRecord>, Error>({
        enabled: enabled && globalState.isAuthenticated(),
        key: [Tables.Files],
        fn: list,
        onError,
        onSuccess,
    });

    const resultObject = useMemo(() => {
        if (globalState.isAuthenticated()) {
            return filesResult.resultObject;
        }

        return mapStorageProviderFiles(storageProviderFilesResult.resultObject);
    }, [
        filesResult.resultObject,
        globalState,
        storageProviderFilesResult.resultObject,
    ]);

    return {
        ...mergeUseQueryProperties(filesResult, storageProviderFilesResult),
        refetch: globalState.isAuthenticated()
            ? filesResult.refetch
            : storageProviderFilesResult.refetch,
        resultObject: resultObject,
    };
};

const mapStorageProviderFiles = (
    files: StorageProviderFileRecord[] | undefined
) =>
    List(
        _.map(files, (storageProviderFile) =>
            FileRecord.fromStorageProvderFile(
                storageProviderFile,
                BucketName.Samples,
                path
            )
        )
    );

export { useListFiles };
