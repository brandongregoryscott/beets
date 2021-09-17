import { Dialog, DialogProps, Link, TextInputField } from "evergreen-ui";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { ChangeEvent, useState } from "react";

interface FileDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {
    file: FileRecord;
    isEditing?: boolean;
    storageProviderFile: StorageProviderFileRecord;
}

const FileDialog: React.FC<FileDialogProps> = (props: FileDialogProps) => {
    const {
        isEditing = false,
        isShown,
        onCloseComplete,
        file: initialFile,
        storageProviderFile,
    } = props;
    const title = isEditing ? "Edit File" : "View File";
    const [file, setFile] = useState<FileRecord>(initialFile);
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFile((prev) => prev.set("name", event.target.value));

    return (
        <Dialog
            isShown={isShown}
            onCloseComplete={onCloseComplete}
            title={title}>
            <TextInputField
                label="Name"
                onChange={handleNameChange}
                value={file.name}
            />
            <TextInputField
                label="Path"
                disabled={true}
                readOnly={true}
                value={file.getPath()}
            />
            <TextInputField
                label="Type"
                disabled={true}
                readOnly={true}
                value={file.type}
            />
            <TextInputField
                label="Size"
                disabled={true}
                readOnly={true}
                value={file.size}
            />
            {storageProviderFile?.signedURL != null && (
                <Link href={storageProviderFile.signedURL}>View File</Link>
            )}
        </Dialog>
    );
};

export { FileDialog };
