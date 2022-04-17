import {
    Link,
    Image,
    ListItem,
    Paragraph,
    UnorderedList,
    majorScale,
    defaultTheme,
} from "evergreen-ui";
import { Link as ReactRouterLink } from "react-router-dom";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import gfm from "remark-gfm";
import { last } from "lodash";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";
import { CopyableHeading } from "components/copyable-heading";
import {
    mergeComponentMap,
    omitIs,
    transformImageUri,
    transformLinkUri,
} from "utils/markdown-utils";

type MarkdownComponentMap = Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>;

interface MarkdownProps {
    children: string;
    components?: MarkdownComponentMap;
    transformImageUri?: (src: string) => string;
    transformLinkUri?: (href: string) => string;
}

const defaultComponents: MarkdownComponentMap = {
    a: (props) => (
        <Link
            {...omitIs(props)}
            is={ReactRouterLink}
            target={props.href?.includes("#") ? undefined : "_blank"}
            to={props.href!}
        />
    ),
    h2: (props) => (
        <CopyableHeading
            {...omitIs(props)}
            marginY={majorScale(2)}
            size={700}
        />
    ),
    h3: (props) => (
        <CopyableHeading
            {...omitIs(props)}
            marginY={majorScale(2)}
            size={600}
        />
    ),
    h4: (props) => (
        <CopyableHeading
            {...omitIs(props)}
            marginY={majorScale(2)}
            size={500}
        />
    ),
    img: (props) => (
        <Image
            {...omitIs(props)}
            borderRadius={majorScale(1)}
            boxShadow={last(defaultTheme.shadows)}
            display="block"
            marginY={majorScale(2)}
            maxWidth="100%"
        />
    ),
    li: (props) => <ListItem {...omitIs(props, "ordered")} />,
    p: (props) => <Paragraph {...omitIs(props)} />,
    ul: (props) => <UnorderedList {...omitIs(props, "ordered")} />,
};

const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => {
    const { children, components: componentsOverrides = {} } = props;
    const components = useMemo(
        () => mergeComponentMap(componentsOverrides),
        [componentsOverrides]
    );

    return (
        <ReactMarkdown
            components={components}
            rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
            remarkPlugins={[gfm]}
            transformImageUri={props.transformImageUri ?? transformImageUri}
            transformLinkUri={props.transformLinkUri ?? transformLinkUri}>
            {children}
        </ReactMarkdown>
    );
};

export { defaultComponents, Markdown };
export type { MarkdownProps, MarkdownComponentMap };
