import {
    DeleteIcon,
    DocumentOpenIcon,
    EditIcon,
    IconButton,
    Link,
    majorScale,
    Pane,
    TextInput,
} from "evergreen-ui";
import { FileRecord } from "models/file-record";
import { useBoolean } from "utils/hooks/use-boolean";
import { FileDialog } from "components/file-dialog";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { useDeleteFile } from "utils/hooks/domain/files/use-delete-file";
import { useCallback } from "react";

interface FileListItemProps {
    file: FileRecord;
    storageProviderFile: StorageProviderFileRecord;
}

const height = majorScale(3);

const FileListItem: React.FC<FileListItemProps> = (
    props: FileListItemProps
) => {
    const { file, storageProviderFile } = props;
    const {
        value: isOpen,
        setTrue: handleOpenDialog,
        setFalse: handleCloseDialog,
    } = useBoolean(false);
    const { mutate } = useDeleteFile();
    const handleDelete = useCallback(() => mutate(file.id), [mutate, file.id]);
    return (
        <Pane display="flex">
            <TextInput
                borderBottomRightRadius={0}
                borderTopRightRadius={0}
                height={height}
                readOnly={true}
                textOverflow="ellipsis"
                value={storageProviderFile.name}
            />
            <IconButton
                borderBottomLeftRadius={0}
                borderTopLeftRadius={0}
                height={height}
                icon={EditIcon}
                onClick={handleOpenDialog}
            />
            <IconButton
                height={height}
                icon={DeleteIcon}
                onClick={handleDelete}
            />
            {storageProviderFile.signedURL != null && (
                <Link href={storageProviderFile.signedURL} target="_blank">
                    <IconButton height={height} icon={DocumentOpenIcon} />
                </Link>
            )}
            <FileDialog
                isShown={isOpen}
                onCloseComplete={handleCloseDialog}
                file={file}
                storageProviderFile={storageProviderFile}
            />
        </Pane>
    );
};

export { FileListItem };
