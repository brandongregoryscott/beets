import { defaultComponents, MarkdownComponentMap } from "components/markdown";
import { merge, omit } from "lodash";
import { TransformImage, TransformLink } from "react-markdown/lib/ast-to-react";

const mergeComponentMap = (
    componentMap: MarkdownComponentMap
): MarkdownComponentMap => merge({}, defaultComponents, componentMap);

/**
 * Omits 'is' and other unnecessary props added by react-markdown that may conflict or cause React warnings
 */
const omitProps = <T extends { is?: string | undefined }>(
    props: T,
    ...additionalKeys: Array<keyof T>
) =>
    omit(
        props,
        "is",
        "node",
        "isHeader",
        "inline",
        "ordered",
        ...additionalKeys
    );

const transformImageUri: TransformImage = (src: string) =>
    src.replace("../../public", "");

const transformLinkUri: TransformLink = (href: string) =>
    href.replace("./", "../");

export { mergeComponentMap, omitProps, transformImageUri, transformLinkUri };
