import { Markdown } from "components/markdown";
import { HelpResource } from "enums/help-resource";
import { Spinner } from "evergreen-ui";
import React from "react";
import { useHelpDocs } from "utils/hooks/use-help-docs";
import { useScrollToHash } from "utils/hooks/use-scroll-to-hash";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";

interface ContributingPageProps {}

const ContributingPage: React.FC<ContributingPageProps> = (
    props: ContributingPageProps
) => {
    const { isLoading, content } = useHelpDocs({
        resource: HelpResource.Contributing,
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

export { ContributingPage };
