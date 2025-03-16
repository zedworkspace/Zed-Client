import axios from "axios";

export const getRepoDetailsApi = async (repoName : string) => {
    const res = await axios.get(`https://api.github.com/repos/${repoName}?sha=beta`)
    return res.data;
};
export const getRepoCommitsApi = async (repoName : string, branch: string) => {
    const res = await axios.get(`https://api.github.com/repos/${repoName}/commits?sha=${branch}&per_page=${200}&page=${1}`)
    return res.data;
};
export const getRepoContributorsApi = async (repoName : string) => {
    const res = await axios.get(`https://api.github.com/repos/${repoName}/forks`)
    return res.data;
};
export const getRepoPullsApi = async (repoName : string) => {
    const res = await axios.get(`https://api.github.com/repos/${repoName}/pulls?state=all`)
    return res.data;
};
export const getRepoIssuesApi = async (repoName : string) => {
    const res = await axios.get(`https://api.github.com/repos/${repoName}/issues`)
    return res.data;
};
export const getRepoBranchesApi = async (repoName : string) => {
    const res = await axios.get(`https://api.github.com/repos/${repoName}/branches`)
    return res.data;
};
