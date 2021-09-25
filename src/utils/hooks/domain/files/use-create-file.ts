import { BucketName } from "enums/bucket-name";
import { StorageProviderFile } from "interfaces/supabase/storage-provider-file";
import _ from "lodash";
import { useMutation, useQueryClient } from "react-query";
import slugify from "slugify";
import { useStorageProvider } from "utils/hooks/supabase/use-storage-provider";
import { filesKey, storageProviderFilesKey } from "utils/query-key-utils";
import { definitions } from "types/supabase";
import { useDatabase } from "utils/hooks/supabase/use-database";
import { useGlobalState } from "utils/hooks/use-global-state";

const useCreateFile = (bucketName: BucketName) => {
    const { globalState } = useGlobalState();
    const userId = globalState.userId();
    const { from: fromBucket } = useStorageProvider();
    const { from: fromTable } = useDatabase();
    const queryClient = useQueryClient();
    const fileTable = fromTable("files");
    const bucket = fromBucket(bucketName);

    const toFileEntity = (
        file: File,
        storageProviderFile: StorageProviderFile
    ): Partial<definitions["files"]> => ({
        bucketid: bucketName,
        name: storageProviderFile.name.replace(/[0-9]+-/, ""), // Strip the generated timestamp off
        path: storageProviderFile.name,
        id: storageProviderFile.id,
        size: file.size,
        type: file.type,
    });

    const upload = async (file: File) => {
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

        const { data: fileEntity, error: fileEntityError } =
            await fileTable.insert(toFileEntity(file, storageProviderFile));

        if (fileEntityError != null) {
            throw fileEntityError;
        }

        return fileEntity![0];
    };

    const uploadMutation = useMutation(upload, {
        onSettled: () => {
            queryClient.invalidateQueries(filesKey());
            queryClient.invalidateQueries(storageProviderFilesKey());
        },
    });

    return { ...uploadMutation };
};

export { useCreateFile };
