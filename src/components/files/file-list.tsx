import { BucketName } from "enums/bucket-name";
import { SortOrder } from "enums/sort-order";
import { Pane } from "evergreen-ui";
import { useListStorageProviderFiles } from "utils/hooks/supabase/use-list-storage-provider-files";
import { useGlobalState } from "utils/hooks/use-global-state";
import { groupBy } from "utils/collection-utils";
import { useListFiles } from "generated/hooks/domain/files/use-list-files";
import { FileCard } from "components/files/file-card";
import { Flex } from "components/flex";

interface FileListProps {
    bucketName: BucketName;
}

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { bucketName } = props;
    const { globalState } = useGlobalState();
    const { resultObject: storageProviderFiles } = useListStorageProviderFiles({
        bucketName,
        path: globalState.userId(),
        sortBy: {
            column: "created_at",
            order: SortOrder.DESC,
        },
    });

    const { resultObject: files } = useListFiles();

    const groupedFiles = groupBy(
        storageProviderFiles,
        files,
        (a, b) => a.id === b.id
    );

    return (
        <Flex.Row flexWrap="wrap" width="100%">
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
