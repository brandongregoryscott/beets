import { useQuery } from "hooks/use-query";
import OverviewMarkdown from "docs/overview.md";
import ContributingMarkdown from "docs/contributing.md";
import HowToMarkdown from "docs/how-to.md";
import { HelpResource } from "enums/help-resource";
import { kebabCase } from "lodash";

interface UseHelpDocsOptions {
    resource?: HelpResource;
}

interface UseHelpDocsResult {
    content: string;
    isLoading: boolean;
}

const useHelpDocs = (options?: UseHelpDocsOptions): UseHelpDocsResult => {
    const { resource = HelpResource.Overview } = options ?? {};
    const { resultObject: content = "", isLoading } = useQuery<string>({
        fn: async () => {
            const module = resourceToModule(resource);
            const response = await fetch(module);
            const content = await response.text();
            return sanitizeContent(content);
        },
        key: [resource],
    });

    return { content, isLoading };
};

const resourceToModule = (
    resource: HelpResource
):
    | typeof ContributingMarkdown
    | typeof HowToMarkdown
    | typeof OverviewMarkdown => {
    switch (kebabCase(resource)) {
        case kebabCase(HelpResource.Contributing):
            return ContributingMarkdown;
        case kebabCase(HelpResource.HowTo):
            return HowToMarkdown;
        case kebabCase(HelpResource.Overview):
        default:
            return OverviewMarkdown;
    }
};

const sanitizeContent = (content: string): string =>
    content.replace(/# [a-zA-Z ]+/, "");

export { useHelpDocs };
