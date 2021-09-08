import { FileUpload } from "components/file-upload";
import { BucketName } from "enums/bucket-name";
import { majorScale, Pane } from "evergreen-ui";
import { FileList } from "components/file-list";

interface LibraryProps {}

const Library: React.FC<LibraryProps> = (props: LibraryProps) => {
    return (
        <Pane>
            Library
            <Pane marginTop={majorScale(1)}>
                <FileList bucketName={BucketName.Samples} />
            </Pane>
            <Pane marginTop={majorScale(1)}>
                <FileUpload bucketName={BucketName.Samples} />
            </Pane>
        </Pane>
    );
};

export { Library };
