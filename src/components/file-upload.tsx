import { BucketName } from "enums/bucket-name";
import {
    FilePicker,
    Pane,
    Spinner,
    majorScale,
    IconButton,
    UploadIcon,
    DeleteIcon,
} from "evergreen-ui";
import { Fragment, useState } from "react";
import { useCreateFile } from "utils/hooks/domain/files/use-create-file";
import * as uuid from "uuid";

interface FileUploadProps {
    bucketName: BucketName;
}

interface FilePickerState {
    id: string;
    fileList?: FileList;
}

const height = majorScale(3);

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
    const { bucketName } = props;
    const { mutate: uploadFiles, isLoading } = useCreateFile(bucketName);
    const [filePickers, setFilePickers] = useState([newFilePickerState()]);
    const updateById = (id: string) => (fileList: FileList) =>
        setFilePickers((prev: FilePickerState[]) => {
            const index = prev.findIndex((filePicker) => filePicker.id === id);
            if (index < 0) {
                return prev;
            }

            prev[index] = { id, fileList };

            return [...prev];
        });

    const removeById = (id: string) =>
        setFilePickers((prev: FilePickerState[]) => {
            const index = prev.findIndex((filePicker) => filePicker.id === id);
            if (index < 0) {
                return prev;
            }

            const updated = prev.filter((filePicker) => filePicker.id !== id);
            if (updated.length === 0) {
                return [newFilePickerState()];
            }

            return updated;
        });

    const handleFileChange = (id: string) => (files: FileList) =>
        updateById(id)(files);

    const handleUpload = (id: string) => () => {
        const files = filePickers.find(
            (filePicker) => filePicker.id === id
        )?.fileList;

        if (files == null) {
            return;
        }

        uploadFiles(files![0]);

        removeById(id);
    };

    const hasFiles = (id: string) => {
        const filePicker = filePickers.find(
            (filePicker) => filePicker.id === id
        );
        if (filePicker == null || filePicker.fileList == null) {
            return false;
        }

        return filePicker.fileList.length > 0;
    };

    const handleRemove = (id: string) => () => removeById(id);

    return (
        <Pane display="flex" flexDirection="column">
            {filePickers.map((filePicker) => (
                <Pane
                    alignItems="center"
                    display="flex"
                    flexDirection="row"
                    key={filePicker.id}>
                    <FilePicker
                        disabled={isLoading}
                        height={height}
                        multiple={false}
                        onChange={handleFileChange(filePicker.id)}
                    />
                    {isLoading && (
                        <Spinner
                            display="flex"
                            marginLeft={majorScale(1)}
                            size={height}
                        />
                    )}
                    {!isLoading && (
                        <Fragment>
                            <IconButton
                                height={height}
                                icon={DeleteIcon}
                                onClick={handleRemove(filePicker.id)}
                            />
                            {hasFiles(filePicker.id) && (
                                <IconButton
                                    height={height}
                                    icon={UploadIcon}
                                    onClick={handleUpload(filePicker.id)}
                                />
                            )}
                        </Fragment>
                    )}
                </Pane>
            ))}
        </Pane>
    );
};

const newFilePickerState = (): FilePickerState => ({
    id: uuid.v4(),
});

export { FileUpload };
