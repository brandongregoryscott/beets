import { Markdown } from "components/markdown";
import type { HelpResource } from "enums/help-resource";
import { Spinner } from "evergreen-ui";
import React from "react";
import { useHelpDocs } from "hooks/use-help-docs";
import { useRouter } from "hooks/use-router";
import { useScrollToHash } from "hooks/use-scroll-to-hash";
import { useTimeoutRender } from "hooks/use-timeout-render";

const HelpPage: React.FC = () => {
    const { params } = useRouter();
    const { resource } = params;
    const { isLoading, content } = useHelpDocs({
        resource: resource as HelpResource,
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
