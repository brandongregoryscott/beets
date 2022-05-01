import {
    Code,
    Link,
    Image,
    ListItem,
    Paragraph,
    UnorderedList,
    majorScale,
    defaultTheme,
    Table,
    minorScale,
} from "evergreen-ui";
import { Link as ReactRouterLink } from "react-router-dom";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import gfm from "remark-gfm";
import { flatMap, last } from "lodash";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import ReactMarkdown from "react-markdown";
import { ReactElement, useMemo } from "react";
import { CopyableHeading } from "components/copyable-heading";
import {
    mergeComponentMap,
    omitProps,
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
    a: (props) => {
        const { href } = props;
        const isHashLink = href?.includes("#") ?? false;
        return (
            <Link
                {...omitProps(props)}
                is={isHashLink ? ReactRouterLink : Link}
                target={isHashLink ? undefined : "_blank"}
                to={isHashLink ? props.href! : undefined}
            />
        );
    },
    h2: (props) => (
        <CopyableHeading
            {...omitProps(props)}
            marginY={majorScale(2)}
            size={700}
        />
    ),
    h3: (props) => (
        <CopyableHeading
            {...omitProps(props)}
            marginY={majorScale(2)}
            size={600}
        />
    ),
    h4: (props) => (
        <CopyableHeading
            {...omitProps(props)}
            marginY={majorScale(2)}
            size={500}
        />
    ),
    img: (props) => (
        <Image
            {...omitProps(props)}
            borderRadius={majorScale(1)}
            boxShadow={last(defaultTheme.shadows)}
            display="block"
            marginY={majorScale(2)}
            maxWidth="100%"
        />
    ),
    li: (props) => <ListItem {...omitProps(props)} />,
    p: (props) => (
        <Paragraph {...omitProps(props)} marginBottom={majorScale(1)} />
    ),
    ul: (props) => <UnorderedList {...omitProps(props)} />,
    code: (props) => <Code {...omitProps(props)} size={300} />,
    table: (props) => <Table {...omitProps(props)} />,
    th: (props) => <Table.TextCell {...omitProps(props)} />,
    tr: (props) => (
        <Table.Row
            {...omitProps(props)}
            height="unset"
            minHeight={majorScale(8)}
        />
    ),
    tbody: (props) => <Table.Body {...omitProps(props)} />,
    thead: (props) => {
        // Markdown version adds an additional <tr> around the <th> list which breaks the Evergreen
        // table format, so reach into it and grab its children
        const children = flatMap(
            props.children,
            (child: ReactElement) => child.props.children
        ) as React.ReactNode[];
        return <Table.Head {...omitProps(props)}>{children}</Table.Head>;
    },
    td: (props) => (
        <Table.TextCell
            {...omitProps(props)}
            padding={minorScale(3)}
            textProps={{
                size: 400,
                whiteSpace: "break-spaces",
            }}
        />
    ),
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

export type { MarkdownProps, MarkdownComponentMap };
export { defaultComponents, Markdown };
