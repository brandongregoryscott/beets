import { BucketName } from "enums/bucket-name";
import { SortOrder } from "enums/sort-order";
import { Pane } from "evergreen-ui";
import { useListStorageProviderFiles } from "utils/hooks/use-list-storage-provider-files";
import { FileListItem } from "components/file-list-item";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useListFiles } from "utils/hooks/use-list-files";
import { groupBy } from "utils/core-utils";

interface FileListProps {
    bucketName: BucketName;
}

const FileList: React.FC<FileListProps> = (props: FileListProps) => {
    const { bucketName } = props;
    const { globalState } = useGlobalState();
    const { resultObject: storageProviderFiles } = useListStorageProviderFiles({
        bucketName,
        path: globalState.supabaseUser?.id,
        includeSignedUrl: true,
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
        <Pane>
            {groupedFiles.map(({ left: storageProviderFile, right: file }) => (
                <FileListItem
                    key={file.id}
                    file={file}
                    storageProviderFile={storageProviderFile}
                />
            ))}
        </Pane>
    );
};

export { FileList };
