import { Markdown } from "components/markdown";
import type { HelpResource } from "enums/help-resource";
import { Spinner } from "evergreen-ui";
import React from "react";
import { useHelpDocs } from "utils/hooks/use-help-docs";
import { useScrollToHash } from "utils/hooks/use-scroll-to-hash";
import { useTimeoutRender } from "utils/hooks/use-timeout-render";

interface HelpPageProps {
    resource: HelpResource;
}

const HelpPage: React.FC<HelpPageProps> = (props: HelpPageProps) => {
    const { resource } = props;
    const { isLoading, content } = useHelpDocs({
        resource,
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

export { HelpPage };
