import { Dialog, DialogProps, Link, TextInputField } from "evergreen-ui";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { useState, ChangeEvent } from "react";
import { useUpdateFile } from "utils/hooks/domain/files/use-update-file";

interface FileDialogProps
    extends Pick<DialogProps, "isShown" | "onCloseComplete"> {
    file: FileRecord;
    storageProviderFile: StorageProviderFileRecord;
}

const FileDialog: React.FC<FileDialogProps> = (props: FileDialogProps) => {
    const { isShown, onCloseComplete, file: initialFile } = props;
    const title = "Edit File";
    const [file, setFile] = useState<FileRecord>(initialFile);
    const { mutate: updateFile, isLoading } = useUpdateFile({
        onSettled: onCloseComplete,
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFile((prev) => prev.set("name", event.target.value));

    const handleSave = () => {
        updateFile(file);
    };

    return (
        <Dialog
            confirmLabel="Save"
            isConfirmLoading={isLoading}
            isShown={isShown}
            onConfirm={handleSave}
            onCloseComplete={onCloseComplete}
            shouldCloseOnOverlayClick={false}
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
                value={`${file.size} bytes`}
            />
            {file.getPublicUrl() != null && (
                <Link href={file.getPublicUrl()}>View File</Link>
            )}
        </Dialog>
    );
};

export { FileDialog };
