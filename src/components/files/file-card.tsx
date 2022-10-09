import {
    majorScale,
    MusicIcon,
    Pane,
    FileCardProps as EvergreenFileCardProps,
    Paragraph,
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
import { FileSettingsDialog } from "components/files/file-settings-dialog";
import { Flex } from "components/flex";
import { IconButton } from "components/icon-button";
import { ConfirmIconButton } from "components/confirm-icon-button";

interface FileCardProps
    extends Omit<EvergreenFileCardProps, "name" | "sizeInBytes" | "type"> {
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
            <Flex.Row
                justifyContent="flex-start"
                overflow="hidden"
                width="100%">
                <Flex.Row alignItems="center">
                    <Pane
                        marginLeft={majorScale(2)}
                        marginRight={majorScale(1)}>
                        <Flex.Row
                            alignItems="center"
                            backgroundColor={colors.gray90}
                            borderRadius={minorScale(1)}
                            height={majorScale(5)}
                            justifyContent="center"
                            width={majorScale(5)}>
                            <MusicIcon color={colors.gray600} />
                        </Flex.Row>
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
            </Flex.Row>
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
                <ConfirmIconButton
                    appearance="minimal"
                    color={colors.gray600}
                    confirmationDescription="After deleting this file, it will not be available for future and current projects."
                    confirmationTitle="Are you sure?"
                    icon={TrashIcon}
                    isLoading={isLoading}
                    marginLeft="auto"
                    marginRight={majorScale(2)}
                    onClick={handleDelete}
                    type="button"
                />
            </Flex.Row>
            {isOpen && (
                <FileSettingsDialog
                    file={file}
                    onCloseComplete={handleCloseDialog}
                    storageProviderFile={storageProviderFile}
                />
            )}
        </Flex.Row>
    );
};

export { FileCard };
