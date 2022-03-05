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
} from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import humanize from "humanize-plus";

interface FileCardProps extends EvergreenFileCardProps {}

const FileCard: React.FC<FileCardProps> = (props: FileCardProps) => {
    const { colors } = useTheme();
    const { name, sizeInBytes } = props;
    return (
        <Card
            alignItems="center"
            border={true}
            display="flex"
            flexDirection="row"
            height={majorScale(8)}
            justifyContent="space-between"
            width="100%">
            <Pane
                display="flex"
                flexDirection="row"
                justifyContent="flex-start">
                <Pane alignItems="center" display="flex" flexDirection="row">
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
                            <MusicIcon />
                        </Card>
                    </Pane>
                </Pane>
                <Pane display="flex" flexDirection="column" overflow="hidden">
                    <Paragraph
                        color={colors.gray800}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap">
                        {name}
                    </Paragraph>
                    {sizeInBytes != null && (
                        <Paragraph color={colors.gray700} size={300}>
                            {humanize.fileSize(sizeInBytes, 0)}
                        </Paragraph>
                    )}
                </Pane>
            </Pane>
            <Pane display="flex" flexDirection="row" justifyContent="flex-end">
                <IconButton
                    appearance="minimal"
                    icon={CogIcon}
                    marginLeft="auto"
                    type="button"
                />
                <IconButton
                    appearance="minimal"
                    icon={TrashIcon}
                    marginLeft="auto"
                    marginRight={majorScale(2)}
                    type="button"
                />
            </Pane>
        </Card>
    );
};

export { FileCard };
