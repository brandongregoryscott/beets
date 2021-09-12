import { FileUpload } from "components/file-upload";
import { BucketName } from "enums/bucket-name";
import { majorScale, Pane } from "evergreen-ui";
import { FileList } from "components/file-list";

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = (props: LibraryPageProps) => {
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

export { LibraryPage };
