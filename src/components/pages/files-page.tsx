import React from "react";
import { useGlobalState } from "utils/hooks/use-global-state";
import { FileList } from "components/files/file-list";
import { BucketName } from "enums/bucket-name";
import { BanCircleIcon, majorScale, Pane } from "evergreen-ui";
import { useTheme } from "utils/hooks/use-theme";
import { FileUploader } from "components/files/file-uploader";
import { Flex } from "components/flex";
import { EmptyState } from "components/empty-state";

const FilesPage: React.FC = () => {
    const { globalState } = useGlobalState();
    const { intents } = useTheme();
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
                            icon={<BanCircleIcon />}
                            iconBgColor={intents.danger.background}
                            iconColor={intents.danger.icon}
                            title="Please register to upload files."
                        />
                    </Pane>
                )}
            </Pane>
        </React.Fragment>
    );
};

export { FilesPage };
