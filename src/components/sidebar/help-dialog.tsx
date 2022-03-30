import React, { useCallback, useState } from "react";
import { Dialog, DialogProps } from "components/dialog";
import { Spinner, Tablist, Tab, IconButton, CrossIcon } from "evergreen-ui";
import { Markdown } from "components/markdown";
import { Flex } from "components/flex";
import { HelpResource } from "enums/help-resource";
import { useHelpDocs } from "utils/hooks/use-help-docs";

interface HelpDialogProps extends Pick<DialogProps, "onCloseComplete"> {}

const tabs = [HelpResource.Usage];

const HelpDialog: React.FC<HelpDialogProps> = (props: HelpDialogProps) => {
    const { onCloseComplete } = props;
    const [selectedTab, setSelectedTab] = useState<HelpResource>(
        HelpResource.Usage
    );
    const { isLoading, content } = useHelpDocs({ resource: selectedTab });

    const handleTabSelected = useCallback(
        (tab: HelpResource) => () => setSelectedTab(tab),
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
            title="Usage">
            {isLoading && <Spinner />}
            {!isLoading && <Markdown>{content}</Markdown>}
        </Dialog>
    );
};

export { HelpDialog };
