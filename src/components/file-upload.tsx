import { BucketName } from "enums/bucket-name";
import { FilePicker, Pane, Spinner, majorScale } from "evergreen-ui";
import { useUploadFile } from "utils/hooks/use-upload-file";

interface FileUploadProps {
    bucketName: BucketName;
}

const height = majorScale(3);

const FileUpload: React.FC<FileUploadProps> = (props: FileUploadProps) => {
    const { bucketName } = props;
    const { mutate, isLoading } = useUploadFile(bucketName);

    const handleFileChange = (files: FileList) => {
        mutate(files[0]);
    };
    return (
        <Pane alignItems="center" display="flex" flexDirection="row">
            <FilePicker
                disabled={isLoading}
                height={height}
                multiple={false}
                onChange={handleFileChange}
            />
            {isLoading && (
                <Spinner
                    display="flex"
                    marginLeft={majorScale(1)}
                    size={height}
                />
            )}
        </Pane>
    );
};

export { FileUpload };
