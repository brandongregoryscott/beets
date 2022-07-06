import { HelpResource } from "enums/help-resource";
import { Link } from "evergreen-ui";
import { titleCase } from "humanize-plus";
import { intersection, isEmpty } from "lodash";
import type {
    AnchorHTMLAttributes,
    DetailedHTMLProps,
    PropsWithChildren,
} from "react";
import type { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import { Sitemap } from "sitemap";
import { hasValues } from "utils/collection-utils";
import { omitProps } from "utils/markdown-utils";
import { absolutePath, toPathCase } from "utils/route-utils";
import { scrollToHash } from "utils/scroll-utils";

interface HelpDialogLinkProps
    extends PropsWithChildren<
        Pick<
            DetailedHTMLProps<
                AnchorHTMLAttributes<HTMLAnchorElement>,
                HTMLAnchorElement
            >,
            keyof React.AnchorHTMLAttributes<any> | "key"
        > &
            ReactMarkdownProps
    > {
    setSelectedTab: (tab: HelpResource) => void;
}

const HelpDialogLink: React.FC<HelpDialogLinkProps> = (
    props: HelpDialogLinkProps
) => {
    const { href, setSelectedTab, ...rest } = props;
    const hash = href?.split("#")[1];
    const isHashLink = !isEmpty(hash);
    const tabs = Object.values(HelpResource).map(toPathCase);
    const isHelpResourceTab = hasValues(intersection(tabs, splitPath(href)));

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!isHashLink && !isHelpResourceTab) {
            return;
        }
        const tabPath = splitPath(href).find((pathPart) =>
            tabs.includes(pathPart)
        );

        event.preventDefault();

        const selectedTab = toHelpResource(tabPath);
        if (selectedTab == null) {
            return;
        }

        setSelectedTab(selectedTab);
        // Add a slight delay before scrolling to the hash for tab to rerender
        setTimeout(() => scrollToHash(hash), 25);
    };

    return (
        <Link
            {...omitProps(rest)}
            href={href}
            onClick={handleClick}
            target={isHashLink ? undefined : "_blank"}
        />
    );
};

/**
 * Parses a `HelpResource` value from the path part, which is lower/kebab case
 */
const toHelpResource = (path?: string): HelpResource | undefined => {
    if (path == null) {
        return undefined;
    }

    return titleCase(
        path.replace(absolutePath(Sitemap.help.home), "").replace("-", " ")
    ) as HelpResource;
};

/**
 * Split path into individual parts by hash or slash separators
 */
const splitPath = (path?: string) =>
    path?.split(/(#|\/)/).filter((value) => !isEmpty(value)) ?? [];

export { HelpDialogLink };
