import React from "react";
import { Dialog, DialogProps } from "components/dialog";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import UsageMarkdown from "docs/usage.md";
import { useQuery } from "utils/hooks/use-query";
import {
    Link,
    Spinner,
    Paragraph,
    Heading,
    majorScale,
    ListItem,
    UnorderedList,
    Image,
    defaultTheme,
    Pane,
} from "evergreen-ui";
import { last, omit } from "lodash";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { useTheme } from "utils/hooks/use-theme";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const components: Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
    a: (props) => <Link {...omitIs(props)} target="_blank" />,
    h3: (props) => (
        <Heading {...omitIs(props)} marginTop={majorScale(2)} size={600} />
    ),
    h4: (props) => (
        <Heading {...omitIs(props)} marginTop={majorScale(2)} size={500} />
    ),
    img: (props) => (
        <Pane>
            <Image
                {...omitIs(props)}
                borderRadius={majorScale(1)}
                boxShadow={last(defaultTheme.shadows)}
                maxWidth="100%"
            />
        </Pane>
    ),
    li: (props) => <ListItem {...omitIs(props)} />,
    p: (props) => <Paragraph {...omitIs(props)} />,
    ul: (props) => <UnorderedList {...omitIs(props)} />,
};

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const theme = useTheme();
    console.log("theme", theme);
    const { resultObject: markdownContent, isLoading } = useQuery<string>({
        fn: async () => {
            const response = await fetch(UsageMarkdown);
            const content = await response.text();
            return sanitizeContent(content);
        },
    });

    return (
        <Dialog
            confirmLabel="Close"
            hasCancel={false}
            isShown={true}
            onCloseComplete={onCloseComplete}
            title="Usage"
            width="60%">
            {isLoading && <Spinner />}
            {!isLoading && (
                <ReactMarkdown components={components} remarkPlugins={[gfm]}>
                    {markdownContent!}
                </ReactMarkdown>
            )}
        </Dialog>
    );
};

const omitIs = <T extends { is?: string | undefined }>(props: T) =>
    omit(props, "is");

const sanitizeContent = (content: string): string =>
    content
        .replace("# Usage", "")
        .replace(/\[([a-zA-Z0-9 ']+)\]\(#[a-zA-Z-]+\)/g, "$1");

export { HelpDialog };
