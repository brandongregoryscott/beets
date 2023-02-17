import type { BucketName } from "enums/bucket-name";
import type { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import _ from "lodash";
import { useQueryClient } from "react-query";
import slugify from "slugify";
import { useStorageProvider } from "hooks/supabase/use-storage-provider";
import { storageProviderFilesKey } from "utils/query-key-utils";
import type { File as FileEntity } from "generated/interfaces/file";
import { useGlobalState } from "hooks/use-global-state";
import { useMutation } from "hooks/use-mutation";
import { SupabaseClient } from "generated/supabase-client";
import { Tables } from "generated/enums/tables";
import type { Auditable } from "interfaces/auditable";

interface UseCreateFileOptions {
    bucketName: BucketName;
}

const useCreateFile = (options: UseCreateFileOptions) => {
    const { bucketName } = options;
    const { globalState } = useGlobalState();
    const userId = globalState.userId();
    const { from: fromBucket } = useStorageProvider();
    const { fromFiles } = SupabaseClient;
    const queryClient = useQueryClient();
    const bucket = fromBucket(bucketName);

    const toFileEntity = (
        file: File,
        storageProviderFile: StorageProviderFile
    ): Omit<
        FileEntity,
        | "created_by_id"
        | "created_on"
        | "deleted_by_id"
        | "deleted_on"
        | "description"
        | "updated_by_id"
        | "updated_on"
    > => ({
        bucket_id: bucketName,
        name: storageProviderFile.name.replace(/[0-9]+-/, ""), // Strip the generated timestamp off
        path: storageProviderFile.name,
        id: storageProviderFile.id,
        size: file.size,
        type: file.type,
    });

    const uploadAndCreate = async (file: File) => {
        const slug = `${_.now()}-${slugify(file.name)}`;
        const { error: uploadError } = await bucket.upload(
            `${userId}/${slug}`,
            file
        );

        if (uploadError != null) {
            throw uploadError;
        }

        const { data: listResult, error: listError } = await bucket.list(
            userId
        );

        if (listError != null) {
            throw listError;
        }

        const storageProviderFile = listResult.find(
            (storageProviderFile: StorageProviderFile) =>
                storageProviderFile.name === slug
        );

        if (storageProviderFile == null) {
            throw new Error(
                `Uploaded file was not found in subsequent list call. Found: ${listResult
                    .map((e) => e.name)
                    .join(", ")}`
            );
        }

        const { data: fileEntity, error: fileEntityError } = await fromFiles()
            .insert(toFileEntity(file, storageProviderFile))
            .select("*");

        if (fileEntityError != null) {
            throw fileEntityError;
        }

        return fileEntity![0];
    };

    const uploadMutation = useMutation({
        fn: uploadAndCreate,
        onSettled: () => {
            queryClient.invalidateQueries([Tables.Files]);
            queryClient.invalidateQueries(storageProviderFilesKey());
        },
    });

    return uploadMutation;
};

export { useCreateFile };
