import {
    Link,
    Image,
    Pane,
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
import { last, merge, omit } from "lodash";
import { NormalComponents } from "react-markdown/lib/complex-types";
import {
    SpecialComponents,
    TransformImage,
    TransformLink,
} from "react-markdown/lib/ast-to-react";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";
import { CopyableHeading } from "components/copyable-heading";

export type MarkdownComponentMap = Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>;

export interface MarkdownProps {
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
        <Pane marginY={majorScale(2)}>
            <Image
                {...omitIs(props)}
                borderRadius={majorScale(1)}
                boxShadow={last(defaultTheme.shadows)}
                maxWidth="100%"
            />
        </Pane>
    ),
    li: (props) => <ListItem {...omitIs(props, "ordered")} />,
    p: (props) => <Paragraph {...omitIs(props)} />,
    ul: (props) => <UnorderedList {...omitIs(props, "ordered")} />,
};

const Markdown: React.FC<MarkdownProps> = (props: MarkdownProps) => {
    const { children, components: componentsOverrides = {} } = props;
    const components = useMemo(
        () => merge({}, defaultComponents, componentsOverrides),
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

const omitIs = <T extends { is?: string | undefined }>(
    props: T,
    ...additionalKeys: Array<keyof T>
) => omit(props, "is", ...additionalKeys);

const transformImageUri: TransformImage = (src: string) =>
    src.replace("../../public", "");

const transformLinkUri: TransformLink = (href: string) =>
    href.replace("./", "../");

export { Markdown };
