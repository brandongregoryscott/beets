import {
    Alert,
    Code,
    Link,
    majorScale,
    Pane,
    Paragraph,
    Spinner,
} from "evergreen-ui";
import React from "react";
import { formatUpdatedOn } from "utils/date-utils";
import { useLatestRelease } from "utils/hooks/use-latest-release";
import { Dialog, DialogProps } from "components/dialog";
import { isDevelopment } from "utils/env";

enum Environment {
    Development = "Development",
    Local = "Local",
    Production = "Production",
}

interface AboutDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const AboutDialog: React.FC<AboutDialogProps> = (props: AboutDialogProps) => {
    const { onCloseComplete } = props;
    const { isLoading, resultObject: release } = useLatestRelease();
    const environment = getCurrentEnvironment();
    return (
        <Dialog
            confirmLabel="Close"
            hasCancel={false}
            isShown={true}
            onCloseComplete={onCloseComplete}
            title="About">
            {isLoading && <Spinner />}
            {!isLoading && (
                <React.Fragment>
                    <Paragraph>
                        <Code>beets</Code> is a web-based DAW (Digital Audio
                        Workstation) written in React for making music.
                    </Paragraph>
                    <Pane borderBottom={true} marginY={majorScale(2)} />
                    <Paragraph marginBottom={majorScale(1)}>
                        Version <Code>{release?.name}</Code>{" "}
                        <Link href={release?.html_url} target="_blank">
                            (Release notes)
                        </Link>
                    </Paragraph>
                    {release?.published_at != null && (
                        <Paragraph marginBottom={majorScale(1)}>
                            {`Released on ${formatUpdatedOn(
                                release?.published_at
                            )}`}
                        </Paragraph>
                    )}
                    <Paragraph marginBottom={majorScale(1)}>
                        <Link
                            href="https://github.com/brandongregoryscott/beets"
                            target="_blank">
                            Repository
                        </Link>
                    </Paragraph>
                    {environment !== Environment.Production && (
                        <Alert
                            intent="warning"
                            marginBottom={majorScale(1)}
                            title="Environment">
                            {environment}
                        </Alert>
                    )}
                </React.Fragment>
            )}
        </Dialog>
    );
};

const getCurrentEnvironment = (): Environment => {
    if (isDevelopment()) {
        return Environment.Local;
    }

    if (
        process.env.NODE_ENV === "production" &&
        window.location.hostname.startsWith("development")
    ) {
        return Environment.Development;
    }

    return Environment.Production;
};

export { AboutDialog };
