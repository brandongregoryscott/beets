import { BucketName } from "enums/bucket-name";
import { StorageProviderFile } from "interfaces/storage-provider-file";
import _ from "lodash";
import { useMutation, useQueryClient } from "react-query";
import slugify from "slugify";
import { useStorageProvider } from "utils/hooks/use-storage-provider";
import { QueryKeyUtils } from "utils/query-key-utils";
import { definitions } from "types/supabase";
import { useDatabase } from "utils/hooks/use-database";

const useUploadFile = (bucketName: BucketName) => {
    const { from: fromBucket } = useStorageProvider();
    const { from: fromTable } = useDatabase();
    const queryClient = useQueryClient();
    const fileTable = fromTable("Files");
    const bucket = fromBucket(bucketName);

    const toFileEntity = (
        file: File,
        storageProviderFile: StorageProviderFile
    ): Partial<definitions["Files"]> => ({
        name: storageProviderFile.name,
        storageProviderPath: [bucketName, storageProviderFile.name].join("/"),
        storageProviderId: storageProviderFile.id,
        size: file.size,
        type: file.type,
    });

    const upload = async (file: File) => {
        const slug = `${_.now()}-${slugify(file.name)}`;
        const { error: uploadError } = await bucket.upload(slug, file);

        if (uploadError != null) {
            throw uploadError;
        }

        const { data: listResult, error: listError } = await bucket.list();

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
        onSettled: () =>
            queryClient.invalidateQueries(
                QueryKeyUtils.listFilesByBucket(bucketName)
            ),
    });

    return { ...uploadMutation };
};

export { useUploadFile };
