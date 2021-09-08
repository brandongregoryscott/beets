import { BucketName } from "enums/bucket-name";
import { StorageProviderFile } from "interfaces/storage-provider-file";
import _ from "lodash";
import { useMutation, useQueryClient } from "react-query";
import slugify from "slugify";
import { useStorageProvider } from "utils/hooks/use-storage-provider";
import { QueryKeyUtils } from "utils/query-key-utils";

const useUploadFile = (bucketName: BucketName) => {
    const { from } = useStorageProvider();
    const queryClient = useQueryClient();
    const bucket = from(bucketName);

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

        return storageProviderFile;
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
