import { OctokitDefaults } from "constants/octokit-defaults";
import { useOctokit } from "utils/hooks/use-octokit";
import { useQuery, UseQueryResult } from "utils/hooks/use-query";

export interface Release {
    assets: any[];
    assets_url: string;
    author: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string;
        html_url: string;
        id: number;
        login: string;
        node_id: string;
        organizations_url: string;
        received_events_url: string;
        repos_url: string;
        site_admin: boolean;
        starred_url: string;
        subscriptions_url: string;
        type: string;
        url: string;
    };
    body: string;
    created_at: string;
    draft: boolean;
    html_url: string;
    id: number;
    mentions_count: number;
    name: string;
    node_id: string;
    prerelease: boolean;
    published_at: string;
    tag_name: string;
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
