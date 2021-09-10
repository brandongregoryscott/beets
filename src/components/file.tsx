import {
    EditIcon,
    IconButton,
    majorScale,
    Pane,
    TextInput,
} from "evergreen-ui";
import { StorageProviderFile } from "interfaces/storage-provider-file";

interface FileListItemProps {
    storageProviderFile: StorageProviderFile;
}

const height = majorScale(3);

const FileListItem: React.FC<FileListItemProps> = (
    props: FileListItemProps
) => {
    const { storageProviderFile } = props;
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
                icon={EditIcon}
                height={height}
                borderTopLeftRadius={0}
                borderBottomLeftRadius={0}
            />
        </Pane>
    );
};

export { FileListItem };
