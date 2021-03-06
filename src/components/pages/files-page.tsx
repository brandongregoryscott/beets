import React from "react";
import { useGlobalState } from "utils/hooks/use-global-state";
import { FileList } from "components/files/file-list";
import { BucketName } from "enums/bucket-name";
import {
    BanCircleIcon,
    EmptyState,
    Icon,
    majorScale,
    Pane,
} from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { RouteProps } from "interfaces/route-props";
import { FileUploader } from "components/files/file-uploader";
import { Flex } from "components/flex";

interface FilesPageProps extends RouteProps {}

const FilesPage: React.FC<FilesPageProps> = (props: FilesPageProps) => {
    const { globalState } = useGlobalState();
    const theme = useTheme();
    return (
        <React.Fragment>
            {globalState.isAuthenticated() && (
                <Flex.Row marginBottom={majorScale(2)}>
                    <Flex.Column marginRight={majorScale(4)}>
                        <FileUploader bucketName={BucketName.Samples} />
                    </Flex.Column>
                    <Flex.Column width="100%">
                        <FileList bucketName={BucketName.Samples} />
                    </Flex.Column>
                </Flex.Row>
            )}
            <Pane marginTop={majorScale(1)}>
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
        </React.Fragment>
    );
};

export { FilesPage };
