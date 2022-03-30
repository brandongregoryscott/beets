import { Markdown } from "components/markdown";
import { HelpResource } from "enums/help-resource";
import { Spinner } from "evergreen-ui";
import React from "react";
import { useHelpDocs } from "utils/hooks/use-help-docs";

interface UsagePageProps {}

const UsagePage: React.FC<UsagePageProps> = (props: UsagePageProps) => {
    const { isLoading, content } = useHelpDocs({
        resource: HelpResource.Usage,
    });

    return (
        <React.Fragment>
            {isLoading && <Spinner />}
            {!isLoading && <Markdown>{content}</Markdown>}
        </React.Fragment>
    );
};

export { UsagePage };
