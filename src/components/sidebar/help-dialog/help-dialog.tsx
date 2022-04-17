import React, { useCallback, useRef, useState } from "react";
import { Dialog, DialogProps } from "components/dialog";
import {
    Spinner,
    Tablist,
    Tab,
    IconButton,
    CrossIcon,
    MinimizeIcon,
    MaximizeIcon,
    majorScale,
    ShareIcon,
} from "evergreen-ui";
import { Markdown, MarkdownComponentMap } from "components/markdown";
import { Flex } from "components/flex";
import { HelpResource } from "enums/help-resource";
import { useHelpDocs } from "utils/hooks/use-help-docs";
import { useBoolean } from "utils/hooks/use-boolean";
import { Link as ReactRouterLink } from "react-router-dom";
import { Sitemap } from "sitemap";
import { absolutePath, joinPaths, toPathCase } from "utils/route-utils";
import { HelpDialogLink } from "components/sidebar/help-dialog/help-dialog-link";
import { omitIs } from "utils/markdown-utils";
import { CopyableHeading } from "components/copyable-heading";
import { HelpResourceTabs } from "constants/help-resource-tabs";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const contentContainerRef = useRef<HTMLDivElement | null>(null);
    const [selectedTab, setSelectedTab] = useState<HelpResource>(
        HelpResource.Overview
    );
    const { value: isFullscreen, toggle: handleFullscreenClick } = useBoolean();
    const { isLoading, content } = useHelpDocs({ resource: selectedTab });
    const sharePath = joinPaths(Sitemap.help.home, selectedTab);
    const handleTabSelected = useCallback(
        (tab: HelpResource) => () => {
            setSelectedTab(tab);
            contentContainerRef.current?.scrollTo({ top: 0 });
        },
        []
    );

    return (
        <Dialog
            containerProps={
                isFullscreen
                    ? {
                          marginY: majorScale(2),
                          maxHeight: `calc(100% - ${majorScale(4)}px)`,
                      }
                    : undefined
            }
            contentContainerProps={{ ref: contentContainerRef }}
            hasFooter={false}
            header={({ close }) => (
                <Flex.Row alignItems="center" width="100%">
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
                    <IconButton
                        appearance="minimal"
                        icon={isFullscreen ? MinimizeIcon : MaximizeIcon}
                        marginLeft={majorScale(1)}
                        onClick={handleFullscreenClick}
                    />
                    <IconButton
                        appearance="minimal"
                        icon={CrossIcon}
                        marginLeft={majorScale(1)}
                        onClick={close}
                    />
                </Flex.Row>
            )}
            isShown={true}
            onCloseComplete={onCloseComplete}
            width={isFullscreen ? "100%" : undefined}>
            {isLoading && <Spinner />}
            {!isLoading && (
                <Markdown
                    components={getComponentMap(selectedTab, setSelectedTab)}
                    transformLinkUri={transformLinkUri(selectedTab)}>
                    {content}
                </Markdown>
            )}
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
            {...omitIs(props)}
            marginY={majorScale(2)}
            selectedTab={selectedTab}
            size={700}
        />
    ),
    h3: (props) => (
        <CopyableHeading
            {...omitIs(props)}
            marginY={majorScale(2)}
            selectedTab={selectedTab}
            size={600}
        />
    ),
    h4: (props) => (
        <CopyableHeading
            {...omitIs(props)}
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

    return joinPaths(absolutePath(Sitemap.help.home), path);
};

export { HelpDialog };
