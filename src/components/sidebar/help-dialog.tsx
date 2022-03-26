import React from "react";
import { Dialog, DialogProps } from "components/dialog";
import UsageMarkdown from "docs/usage.md";
import { useQuery } from "utils/hooks/use-query";
import { Spinner } from "evergreen-ui";
import { Markdown } from "components/markdown";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const { resultObject: markdownContent, isLoading } = useQuery<string>({
        fn: async () => {
            const response = await fetch(UsageMarkdown);
            const content = await response.text();
            return sanitizeContent(content);
        },
    });

    return (
        <Dialog
            hasFooter={false}
            isShown={true}
            onCloseComplete={onCloseComplete}
            title="Usage"
            width="60%">
            {isLoading && <Spinner />}
            {!isLoading && <Markdown>{markdownContent!}</Markdown>}
        </Dialog>
    );
};

const sanitizeContent = (content: string): string =>
    content
        .replace("# Usage", "")
        .replace(/\[([a-zA-Z0-9 ']+)\]\(#[a-zA-Z-]+\)/g, "$1");

export { HelpDialog };
