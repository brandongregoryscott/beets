import { defaultComponents, MarkdownComponentMap } from "components/markdown";
import { merge, omit } from "lodash";
import { TransformImage, TransformLink } from "react-markdown/lib/ast-to-react";

const mergeComponentMap = (
    componentMap: MarkdownComponentMap
): MarkdownComponentMap => merge({}, defaultComponents, componentMap);

const omitIs = <T extends { is?: string | undefined }>(
    props: T,
    ...additionalKeys: Array<keyof T>
) => omit(props, "is", ...additionalKeys);

const transformImageUri: TransformImage = (src: string) =>
    src.replace("../../public", "");

const transformLinkUri: TransformLink = (href: string) =>
    href.replace("./", "../");

export { mergeComponentMap, omitIs, transformImageUri, transformLinkUri };
