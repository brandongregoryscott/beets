import { FileUpload } from "components/files/file-upload";
import { BucketName } from "enums/bucket-name";
import {
    BanCircleIcon,
    EmptyState,
    Icon,
    majorScale,
    Pane,
} from "evergreen-ui";
import { FileList } from "components/files/file-list";
import { useGlobalState } from "utils/hooks/use-global-state";
import { useTheme } from "utils/hooks/use-theme";

interface LibraryPageProps {}

const LibraryPage: React.FC<LibraryPageProps> = (props: LibraryPageProps) => {
    const { globalState } = useGlobalState();
    const theme = useTheme();
    return (
        <Pane marginLeft={majorScale(2)} marginTop={majorScale(2)}>
            <Pane marginTop={majorScale(1)}>
                <FileList bucketName={BucketName.Samples} />
            </Pane>
            <Pane marginTop={majorScale(1)}>
                {globalState.isAuthenticated() && (
                    <FileUpload bucketName={BucketName.Samples} />
                )}
                {!globalState.isAuthenticated() && (
                    <Pane maxWidth={majorScale(60)}>
                        <EmptyState
                            background="dark"
                            icon={
                                <Icon
                                    color={theme.intents.danger.icon}
                                    icon={BanCircleIcon}
                                />
                            }
                            iconBgColor={theme.intents.danger.background}
                            title="Please register to upload files."
                        />
                    </Pane>
                )}
            </Pane>
        </Pane>
    );
};

export { LibraryPage };
