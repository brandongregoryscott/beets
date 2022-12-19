import { OctokitDefaults } from "constants/octokit-defaults";
import { REPO_URL } from "constants/repo-url";
import { getTargetBranch } from "utils/env";
import { useOctokit } from "hooks/use-octokit";
import type { UseQueryResult } from "hooks/use-query";
import { useQuery } from "hooks/use-query";
import { joinPaths } from "utils/route-utils";

interface Release extends ReleaseMetadata {
    assets: any[];
    assets_url: string;
    author: {
        avatar_url: string;
        events_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        gravatar_id: string | null;
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
    body?: string | null;
    created_at: string;
    draft: boolean;
    html_url: string;
    id: number;
    mentions_count?: number;
    name: string | null;
    node_id: string;
    prerelease: boolean;
    published_at: string | null;
    tag_name: string;
    tarball_url: string | null;
    target_commitish: string;
    upload_url: string;
    url: string;
    zipball_url: string | null;
}

/**
 * Additional metadata that is not included in the base `getLatestRelease` API call.
 */
interface ReleaseMetadata {
    /**
     * Url to compare the current release tag vs. the target environment branch, which may be
     * useful to see if there are 'unreleased' commits present
     */
    compareUrl: string;
    /**
     * Returns true if the release tag commit is not the latest commit on the target environment branch,
     * e.g. `main` for production or `development`
     *
     * @type {boolean}
     */
    hasNewCommits: boolean;
    /**
     * Commit of the release tag
     */
    tagCommit: string;
}

interface UseLatestReleaseResult
    extends UseQueryResult<unknown, unknown, Release> {}

const useLatestRelease = (): UseLatestReleaseResult => {
    const { octokit } = useOctokit();
    const targetBranch = getTargetBranch();

    const result = useQuery<unknown, unknown, Release>({
        fn: async () => {
            const { data: release } = await octokit.repos.getLatestRelease(
                OctokitDefaults
            );

            const { data: tag } = await octokit.git.getRef({
                ref: joinPaths("tags", release.tag_name),
                ...OctokitDefaults,
            });

            const { data: branch } = await octokit.repos.getBranch({
                branch: targetBranch,
                ...OctokitDefaults,
            });

            const tagCommit = tag.object.sha;

            return {
                ...release,
                compareUrl: joinPaths(
                    REPO_URL,
                    "compare",
                    `${tagCommit}..${targetBranch}`
                ),
                hasNewCommits: branch.commit.sha !== tag.object.sha,
                tagCommit: tag.object.sha,
            };
        },
        key: ["getLatestRelease"],
    });

    return result;
};

export type { Release, UseLatestReleaseResult };
export { useLatestRelease };
