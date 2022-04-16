import { useQuery } from "utils/hooks/use-query";
import OverviewMarkdown from "docs/overview.md";
import { HelpResource } from "enums/help-resource";

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

const resourceToModule = (resource: HelpResource): typeof OverviewMarkdown => {
    switch (resource) {
        case HelpResource.Overview:
        default:
            return OverviewMarkdown;
    }
};

const sanitizeContent = (content: string): string =>
    content.replace("# Overview", "");

export { useHelpDocs };
