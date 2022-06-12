import { Link, TextInputField } from "evergreen-ui";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { useCallback } from "react";
import { useUpdateFile } from "utils/hooks/domain/files/use-update-file";
import { Dialog, DialogProps } from "components/dialog";
import { useInput } from "utils/hooks/use-input";
import humanize from "humanize-plus";

interface FileSettingsDialogProps extends Pick<DialogProps, "onCloseComplete"> {
    file: FileRecord;
    storageProviderFile: StorageProviderFileRecord;
}

const title = "Edit File";

const FileSettingsDialog: React.FC<FileSettingsDialogProps> = (
    props: FileSettingsDialogProps
) => {
    const { onCloseComplete, file } = props;
    const {
        value: name,
        onChange: handleNameChange,
        validation: nameValidation,
    } = useInput({ initialValue: file.name, isRequired: true });
    const { mutate: updateFile, isLoading } = useUpdateFile({
        onSettled: onCloseComplete,
    });

    const handleSave = useCallback(() => {
        if (nameValidation.isInvalid === true) {
            return;
        }

        updateFile(file.merge({ name }));
    }, [file, name, nameValidation.isInvalid, updateFile]);

    return (
        <Dialog
            confirmLabel="Save"
            isConfirmLoading={isLoading}
            onCloseComplete={onCloseComplete}
            onConfirm={handleSave}
            shouldCloseOnOverlayClick={false}
            title={title}>
            <TextInputField
                {...nameValidation}
                label="Name"
                onChange={handleNameChange}
                value={name}
            />
            <TextInputField
                disabled={true}
                label="Path"
                readOnly={true}
                value={file.getPath()}
            />
            <TextInputField
                disabled={true}
                label="Type"
                readOnly={true}
                value={file.type}
            />
            <TextInputField
                disabled={true}
                label="Size"
                readOnly={true}
                value={humanize.fileSize(file.size!, 0)}
            />
            {file.getPublicUrl() != null && (
                <Link href={file.getPublicUrl()}>View File</Link>
            )}
        </Dialog>
    );
};

export { FileSettingsDialog };
