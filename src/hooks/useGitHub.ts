import {
  getRepoBranchesApi,
  getRepoCommitsApi,
  getRepoContributorsApi,
  getRepoDetailsApi,
  getRepoIssuesApi,
  getRepoPullsApi,
} from "@/services/gitHubServices";
import { useQuery } from "@tanstack/react-query";

export const useRepo = (repoName: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["repo", repoName],
    queryFn: async () => await getRepoDetailsApi(repoName),
    enabled,
  });
};
export const useRepoCommit = (repoName: string, branch:string, enabled: boolean) => {
  return useQuery({
    queryKey: ["commit", repoName],
    queryFn: async () => await getRepoCommitsApi(repoName,branch),
    enabled,
  });
};
export const useRepoContributors = (repoName: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["contributors", repoName],
    queryFn: async () => await getRepoContributorsApi(repoName),
    enabled,
  });
};
export const useRepoPulls = (repoName: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["pulls", repoName],
    queryFn: async () => await getRepoPullsApi(repoName),
    enabled,
  });
};
export const useRepoIssues = (repoName: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["issues", repoName],
    queryFn: async () => await getRepoIssuesApi(repoName),
    enabled,
  });
};
export const useRepoBranches = (repoName: string, enabled: boolean) => {
  return useQuery({
    queryKey: ["branches", repoName],
    queryFn: async () => await getRepoBranchesApi(repoName),
    enabled,
  });
};
