import React, { useCallback, useState } from "react";
import { Dialog, DialogProps } from "components/dialog";
import UsageMarkdown from "docs/usage.md";
import { useQuery } from "utils/hooks/use-query";
import { Spinner, Tablist, Tab, IconButton, CrossIcon } from "evergreen-ui";
import { Markdown } from "components/markdown";
import { Flex } from "components/flex";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

enum HelpTab {
    Usage = "Usage",
}

const tabs = [HelpTab.Usage];

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const [selectedTab, setSelectedTab] = useState<HelpTab>(HelpTab.Usage);
    const { resultObject: markdownContent, isLoading } = useQuery<string>({
        fn: async () => {
            const response = await fetch(UsageMarkdown);
            const content = await response.text();
            return sanitizeContent(content);
        },
    });

    const handleTabSelected = useCallback(
        (tab: HelpTab) => () => setSelectedTab(tab),
        []
    );

    return (
        <Dialog
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
                        icon={CrossIcon}
                        marginLeft="auto"
                        onClick={close}
                    />
                </Flex.Row>
            )}
            isShown={true}
            onCloseComplete={onCloseComplete}
            title="Usage"
            width="60%">
            {isLoading && <Spinner />}
            {!isLoading && <Markdown>{markdownContent!}</Markdown>}
        </Dialog>
    );
};

const sanitizeContent = (content: string): string =>
    content.replace("# Usage", "");

export { HelpDialog };
