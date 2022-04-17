import { Markdown } from "components/markdown";
import { HelpResource } from "enums/help-resource";
import { Spinner } from "evergreen-ui";
import React from "react";
import { useHelpDocs } from "utils/hooks/use-help-docs";
import { useScrollToHash } from "utils/hooks/use-scroll-to-hash";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";

interface HowToPageProps {}

const HowToPage: React.FC<HowToPageProps> = (props: HowToPageProps) => {
    const { isLoading, content } = useHelpDocs({
        resource: HelpResource.HowTo,
    });
    useTimeoutRender();
    useScrollToHash();

    return (
        <React.Fragment>
            {isLoading && <Spinner />}
            {!isLoading && <Markdown>{content}</Markdown>}
        </React.Fragment>
    );
};

export { HowToPage };
