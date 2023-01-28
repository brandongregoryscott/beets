import {
    Alert,
    Code,
    Heading,
    InlineAlert,
    Link,
    majorScale,
    Pane,
    Paragraph,
    Spinner,
} from "evergreen-ui";
import React from "react";
import { formatUpdatedOn } from "utils/date-utils";
import { useLatestRelease } from "hooks/use-latest-release";
import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import {
    getCurrentEnvironment,
    EnvironmentName,
    getTargetBranch,
} from "utils/env";
import type { MarkdownComponentMap } from "components/markdown";
import { Markdown } from "components/markdown";
import { omitProps } from "utils/markdown-utils";
import { isString } from "lodash";
import { REPO_URL } from "constants/repo-url";

interface AboutDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const components: MarkdownComponentMap = {
    a: (props) => {
        const { children, href } = props;
        let text = children.find(isString);
        // Attempt to replace full issue or pull request link text with just the number, like Github does
        const issueNumber = text?.match(issueOrPullRequestPattern)?.[3];
        if (text != null && issueNumber != null) {
            text = `#${issueNumber}`;
        }

        return (
            <Link {...omitProps(props)} href={href} target="_blank">
                {text ?? children}
            </Link>
        );
    },
    h1: (props) => (
        <Heading {...omitProps(props)} marginY={majorScale(2)} size={500} />
    ),
    h2: (props) => (
        <Heading {...omitProps(props)} marginY={majorScale(2)} size={700} />
    ),
    h3: (props) => (
        <Heading {...omitProps(props)} marginY={majorScale(2)} size={600} />
    ),
    h4: (props) => (
        <Heading {...omitProps(props)} marginY={majorScale(2)} size={500} />
    ),
};

const issueOrPullRequestPattern =
    /(https:\/\/github.com\/brandongregoryscott\/beets)\/(pull|issues)\/([0-9]+)/;

const AboutDialog: React.FC<AboutDialogProps> = (props: AboutDialogProps) => {
    const { onCloseComplete } = props;
    const { isLoading, resultObject: release } = useLatestRelease();
    const environment = getCurrentEnvironment();
    return (
        <Dialog
            confirmLabel="Close"
            hasCancel={false}
            onCloseComplete={onCloseComplete}
            title="About">
            {isLoading && <Spinner />}
            {!isLoading && (
                <Pane maxWidth={majorScale(80)}>
                    <Paragraph>
                        <Link href={REPO_URL} target="_blank">
                            <Code size={300}>beets</Code>
                        </Link>{" "}
                        is a web-based DAW (Digital Audio Workstation) written
                        in React for making music.
                    </Paragraph>
                    {environment !== EnvironmentName.Production && (
                        <Alert
                            intent="warning"
                            marginTop={majorScale(1)}
                            title="Environment">
                            {environment}
                        </Alert>
                    )}
                    <Pane borderBottom={true} marginY={majorScale(2)} />
                    <Heading marginBottom={majorScale(1)} size={800}>
                        {release?.tag_name}
                    </Heading>
                    {release?.published_at != null && (
                        <Paragraph marginBottom={majorScale(1)}>
                            {`Released on ${formatUpdatedOn(
                                release?.published_at
                            )}`}
                        </Paragraph>
                    )}
                    {release?.body != null && (
                        <Markdown
                            autolinkHeadings={false}
                            components={components}>
                            {release.body}
                        </Markdown>
                    )}
                    {release?.hasNewCommits === true && (
                        <InlineAlert marginBottom={majorScale(1)}>
                            There may be more recent commits to{" "}
                            <Code size={300}>{getTargetBranch()}</Code> that are
                            not reflected in these release notes.{" "}
                            <Link href={release.compareUrl} target="_blank">
                                See diff
                            </Link>
                        </InlineAlert>
                    )}
                </Pane>
            )}
        </Dialog>
    );
};

export { AboutDialog };
