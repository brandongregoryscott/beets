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
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import gfm from "remark-gfm";
import { last, merge, omit } from "lodash";
import { NormalComponents } from "react-markdown/lib/complex-types";
import {
    SpecialComponents,
    TransformImage,
} from "react-markdown/lib/ast-to-react";
import ReactMarkdown from "react-markdown";
import { useMemo } from "react";

export type MarkdownComponentMap = Partial<
    Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
>;

export interface MarkdownProps {
    children: string;
    components?: MarkdownComponentMap;
    transformImageUri?: (src: string) => string;
}

const defaultComponents: MarkdownComponentMap = {
    a: (props) => (
        <Link
            {...omitIs(props)}
            target={props.href?.includes("#") ? undefined : "_blank"}
        />
    ),
    h3: (props) => (
        <Heading {...omitIs(props)} marginY={majorScale(2)} size={600} />
    ),
    h4: (props) => (
        <Heading {...omitIs(props)} marginY={majorScale(2)} size={500} />
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
    li: (props) => <ListItem {...omitIs(props)} />,
    p: (props) => <Paragraph {...omitIs(props)} />,
    ul: (props) => <UnorderedList {...omitIs(props)} />,
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
            transformImageUri={props.transformImageUri ?? transformImageUri}>
            {children}
        </ReactMarkdown>
    );
};

const omitIs = <T extends { is?: string | undefined }>(props: T) =>
    omit(props, "is");

const transformImageUri: TransformImage = (src: string) =>
    src.replace("../../public", "");

export { Markdown };
