import { useQuery } from "utils/hooks/use-query";
import UsageMarkdown from "docs/usage.md";
import { HelpResource } from "enums/help-resource";

interface UseHelpDocsOptions {
    resource?: HelpResource;
}

interface UseHelpDocsResult {
    content: string;
    isLoading: boolean;
}

const useHelpDocs = (options?: UseHelpDocsOptions): UseHelpDocsResult => {
    const { resource = HelpResource.Usage } = options ?? {};
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

const resourceToModule = (resource: HelpResource): typeof UsageMarkdown => {
    switch (resource) {
        case HelpResource.Usage:
        default:
            return UsageMarkdown;
    }
};

const sanitizeContent = (content: string): string =>
    content.replace("# Usage", "");

export { useHelpDocs };
