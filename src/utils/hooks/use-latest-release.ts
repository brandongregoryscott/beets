import { OctokitDefaults } from "constants/octokit-defaults";
import { useOctokit } from "utils/hooks/use-octokit";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

export interface Release {
    assets: any[];
    assets_url: string;
    author: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    body: string;
    html_url: string;
    name: string;
    created_at: string;
    id: number;
    mentions_count: number;
    draft: boolean;
    prerelease: boolean;
    node_id: string;
    tag_name: string;
    published_at: string;
    tarball_url: string;
    target_commitish: string;
    upload_url: string;
    url: string;
    zipball_url: string;
}

export interface UseLatestReleaseResult
    extends UseQueryResult<unknown, unknown, Release> {}

const useLatestRelease = () => {
    const { octokit } = useOctokit();

    const result = useQuery({
        fn: async () => {
            const response = await octokit.repos.getLatestRelease(
                OctokitDefaults
            );

            return response.data;
        },
    });

    return result;
};

export { useLatestRelease };
