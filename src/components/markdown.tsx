import {
    Heading,
    Link,
    Image,
    Pane,
    ListItem,
    Paragraph,
    UnorderedList,
    majorScale,
    defaultTheme,
} from "evergreen-ui";
import gfmPlugin from "remark-gfm";
import { last, omit } from "lodash";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import ReactMarkdown from "react-markdown";

interface MarkdownProps {
    children: string;
}

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

const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => {
    const { children } = props;
    return (
        <ReactMarkdown components={components} remarkPlugins={[gfmPlugin]}>
            {children}
        </ReactMarkdown>
    );
};

const omitIs = <T extends { is?: string | undefined }>(props: T) =>
    omit(props, "is");

export { Markdown };
