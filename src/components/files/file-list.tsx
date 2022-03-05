import { BucketName } from "enums/bucket-name";
import { SortOrder } from "enums/sort-order";
import { useListStorageProviderFiles } from "utils/hooks/supabase/use-list-storage-provider-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { groupBy } from "utils/collection-utils";
import { useListFiles } from "generated/hooks/domain/files/use-list-files";
import { FileCard } from "components/files/file-card";
import { Flex } from "components/flex";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";
import { Spinner } from "evergreen-ui";

interface FileListProps {
    bucketName: BucketName;
}

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { bucketName } = props;
    const { globalState } = useGlobalState();
    const {
        resultObject: storageProviderFiles,
        isLoading: isLoadingStorageProviderFiles,
    } = useListStorageProviderFiles({
        bucketName,
        path: globalState.userId(),
        sortBy: {
            column: "created_at",
            order: SortOrder.DESC,
        },
    });
    const { resultObject: files, isLoading: isLoadingFiles } = useListFiles();
    useTimeoutRender();

    const groupedFiles = groupBy(
        storageProviderFiles,
        files,
        (a, b) => a.id === b.id
    );

    return (
        <Flex.Row flexWrap="wrap" width="100%">
            {isLoadingFiles || (isLoadingStorageProviderFiles && <Spinner />)}
            {groupedFiles.map(({ left: storageProviderFile, right: file }) => (
                <FileCard
                    file={file}
                    key={file.id}
                    storageProviderFile={storageProviderFile}
                />
            ))}
        </Flex.Row>
    );
};

export { FileList };
