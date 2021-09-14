import { BucketName } from "enums/bucket-name";
import { SortOrder } from "enums/sort-order";
import { Pane } from "evergreen-ui";
import { useListStorageProviderFiles } from "utils/hooks/use-list-storage-provider-files";
import { FileListItem } from "components/file";

interface FileListProps {
    bucketName: BucketName;
}

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { bucketName } = props;
    const { data: listFilesResult } = useListStorageProviderFiles({
        bucketName,
        sortBy: {
            column: "created_at",
            order: SortOrder.DESC,
        },
    });
    return (
        <Pane>
            {listFilesResult?.data
                ?.filter((file) => file.id != null)
                .map((file) => (
                    <FileListItem key={file.id} storageProviderFile={file} />
                ))}
        </Pane>
    );
};

export { FileList };
