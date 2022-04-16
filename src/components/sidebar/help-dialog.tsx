import React, { useCallback, useState } from "react";
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
import { Markdown } from "components/markdown";
import { Flex } from "components/flex";
import { HelpResource } from "enums/help-resource";
import { useHelpDocs } from "utils/hooks/use-help-docs";
import { useBoolean } from "utils/hooks/use-boolean";
import { Link } from "react-router-dom";
import { Sitemap } from "sitemap";
import { joinPaths } from "utils/route-utils";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const tabs = [HelpResource.Overview, HelpResource.HowTo];

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const [selectedTab, setSelectedTab] = useState<HelpResource>(
        HelpResource.Overview
    );
    const { value: isFullscreen, toggle: handleFullscreenClick } = useBoolean();
    const { isLoading, content } = useHelpDocs({ resource: selectedTab });
    const sharePath = joinPaths(Sitemap.help.home, selectedTab);
    const handleTabSelected = useCallback(
        (tab: HelpResource) => () => setSelectedTab(tab),
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
            hasFooter={false}
            header={({ close }) => (
                <Flex.Row alignItems="center" width="100%">
                    <Tablist>
                        {tabs.map((tab) => (
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
                        is={Link}
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
            title="Overview"
            width={isFullscreen ? "100%" : undefined}>
            {isLoading && <Spinner />}
            {!isLoading && <Markdown>{content}</Markdown>}
        </Dialog>
    );
};

export { HelpDialog };
