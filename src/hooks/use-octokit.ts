import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

interface UseOctokitResult {
    octokit: Octokit;
}

const useOctokit = (): UseOctokitResult => {
    return { octokit };
};

export { useOctokit };
