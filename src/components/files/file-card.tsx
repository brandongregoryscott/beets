import {
    Card,
    majorScale,
    MusicIcon,
    Pane,
    FileCardProps as EvergreenFileCardProps,
    Paragraph,
    IconButton,
    TrashIcon,
    CogIcon,
    minorScale,
} from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import humanize from "humanize-plus";
import { useDeleteFile } from "utils/hooks/domain/files/use-delete-file";
import { FileRecord } from "models/file-record";
import { StorageProviderFileRecord } from "models/storage-provider-file-record";
import { useCallback } from "react";
import { useBoolean } from "utils/hooks/use-boolean";
import { FileDialog } from "components/files/file-dialog";
import { Flex } from "components/flex";

interface FileCardProps
    extends Omit<EvergreenFileCardProps, "name" | "type" | "sizeInBytes"> {
    file: FileRecord;
    storageProviderFile: StorageProviderFileRecord;
}

const FileCard: React.FC<FileCardProps> = (props: FileCardProps) => {
    const { file, storageProviderFile } = props;
    const {
        value: isOpen,
        setTrue: handleOpenDialog,
        setFalse: handleCloseDialog,
    } = useBoolean(false);
    const { mutate, isLoading } = useDeleteFile();
    const handleDelete = useCallback(() => mutate(file.id), [file.id, mutate]);
    const { colors } = useTheme();
    const { name, size } = file;
    return (
        <Flex.Row
            alignItems="center"
            border={true}
            borderColor={colors.gray400}
            borderRadius={minorScale(1)}
            height={majorScale(8)}
            justifyContent="space-between"
            marginBottom={majorScale(2)}
            marginRight={majorScale(2)}
            maxWidth={majorScale(40)}
            width="100%">
            <Pane
                display="flex"
                flexDirection="row"
                justifyContent="flex-start">
                <Flex.Row alignItems="center">
                    <Pane
                        marginLeft={majorScale(2)}
                        marginRight={majorScale(1)}>
                        <Card
                            alignItems="center"
                            backgroundColor={colors.gray90}
                            display="flex"
                            height={majorScale(5)}
                            justifyContent="center"
                            width={majorScale(5)}>
                            <MusicIcon color={colors.gray600} />
                        </Card>
                    </Pane>
                </Flex.Row>
                <Flex.Column overflow="hidden">
                    <Paragraph
                        color={colors.gray800}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap">
                        {name}
                    </Paragraph>
                    {size != null && (
                        <Paragraph color={colors.gray700} size={300}>
                            {humanize.fileSize(size, 0)}
                        </Paragraph>
                    )}
                </Flex.Column>
            </Pane>
            <Flex.Row justifyContent="flex-end">
                <IconButton
                    appearance="minimal"
                    color={colors.gray600}
                    disabled={isLoading}
                    icon={CogIcon}
                    marginLeft="auto"
                    onClick={handleOpenDialog}
                    type="button"
                />
                <IconButton
                    appearance="minimal"
                    color={colors.gray600}
                    icon={TrashIcon}
                    isLoading={isLoading}
                    marginLeft="auto"
                    marginRight={majorScale(2)}
                    onClick={handleDelete}
                    type="button"
                />
            </Flex.Row>
            {isOpen && (
                <FileDialog
                    file={file}
                    isShown={isOpen}
                    onCloseComplete={handleCloseDialog}
                    storageProviderFile={storageProviderFile}
                />
            )}
        </Flex.Row>
    );
};

export { FileCard };