import React, { useCallback, useRef, useState } from "react";
import type { DialogProps } from "components/dialog";
import { Dialog } from "components/dialog";
import {
    Spinner,
    Tablist,
    Tab,
    IconButton,
    majorScale,
    ShareIcon,
    Pane,
    Tooltip,
    CircleArrowUpIcon,
} from "evergreen-ui";
import type { MarkdownComponentMap } from "components/markdown";
import { Markdown } from "components/markdown";
import { HelpResource } from "enums/help-resource";
import { useHelpDocs } from "utils/hooks/use-help-docs";
import { useBoolean } from "utils/hooks/use-boolean";
import { Link as ReactRouterLink } from "react-router-dom";
import { Sitemap } from "sitemap";
import {
    absolutePath,
    generateHelpPath,
    joinPaths,
    toPathCase,
} from "utils/route-utils";
import { HelpDialogLink } from "components/sidebar/help-dialog/help-dialog-link";
import { omitProps } from "utils/markdown-utils";
import { CopyableHeading } from "components/copyable-heading";
import { HelpResourceTabs } from "constants/help-resource-tabs";
import { useTheme } from "utils/hooks/use-theme";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const { colors } = useTheme();
    const contentContainerRef = useRef<HTMLDivElement | null>(null);
    const [selectedTab, setSelectedTab] = useState<HelpResource>(
        HelpResource.Overview
    );
    const { value: isFullscreen, toggle: handleFullscreenClick } = useBoolean();
    const { isLoading, content } = useHelpDocs({ resource: selectedTab });
    const sharePath = generateHelpPath(selectedTab);

    const handleReturnToTop = useCallback(() => {
        contentContainerRef.current?.scrollTo({ top: 0 });
    }, []);

    const handleTabSelected = useCallback(
        (tab: HelpResource) => () => {
            setSelectedTab(tab);
            handleReturnToTop();
        },
        [handleReturnToTop]
    );

    return (
        <Dialog
            allowFullscreen={true}
            contentContainerProps={{ ref: contentContainerRef }}
            hasFooter={false}
            header={
                <React.Fragment>
                    <Tablist>
                        {HelpResourceTabs.map((tab) => (
                            <Tab
                                isSelected={tab === selectedTab}
                                key={tab}
                                onSelect={handleTabSelected(tab)}>
                                {tab}
                            </Tab>
                        ))}
                    </Tablist>
                    <IconButton
                        appearance="minimal"
                        icon={ShareIcon}
                        is={ReactRouterLink}
                        marginLeft="auto"
                        target="_blank"
                        to={sharePath}
                    />
                </React.Fragment>
            }
            onCloseComplete={onCloseComplete}
            onFullscreenClick={handleFullscreenClick}>
            {isLoading && <Spinner />}
            {!isLoading && (
                <Pane maxWidth={isFullscreen ? majorScale(90) : undefined}>
                    <Markdown
                        components={getComponentMap(
                            selectedTab,
                            setSelectedTab
                        )}
                        transformLinkUri={transformLinkUri(selectedTab)}>
                        {content}
                    </Markdown>
                </Pane>
            )}
            <Pane
                bottom={majorScale(1)}
                position="absolute"
                right={majorScale(3)}>
                <Tooltip content="Return to top">
                    <IconButton
                        appearance="minimal"
                        background={colors.white}
                        icon={CircleArrowUpIcon}
                        onClick={handleReturnToTop}
                    />
                </Tooltip>
            </Pane>
        </Dialog>
    );
};

const getComponentMap = (
    selectedTab: HelpResource,
    setSelectedTab: (tab: HelpResource) => void
): MarkdownComponentMap => ({
    a: (props) => <HelpDialogLink {...props} setSelectedTab={setSelectedTab} />,
    h2: (props) => (
        <CopyableHeading
            {...omitProps(props)}
            marginY={majorScale(2)}
            selectedTab={selectedTab}
            size={700}
        />
    ),
    h3: (props) => (
        <CopyableHeading
            {...omitProps(props)}
            marginY={majorScale(2)}
            selectedTab={selectedTab}
            size={600}
        />
    ),
    h4: (props) => (
        <CopyableHeading
            {...omitProps(props)}
            marginY={majorScale(2)}
            selectedTab={selectedTab}
            size={500}
        />
    ),
});

const transformLinkUri = (selectedTab: HelpResource) => (href: string) => {
    const isHashLink = href.startsWith("#");
    const isRelativeLink = href.startsWith("./");
    if (!isRelativeLink && !isHashLink) {
        return href;
    }

    href = href.replace("./", "");
    const path = isHashLink ? `${toPathCase(selectedTab)}${href}` : href;

    return joinPaths(absolutePath(Sitemap.help.root), path);
};

export { HelpDialog };
