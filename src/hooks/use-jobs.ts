import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "#/lib/query-keys";
import { apiRequest } from "#/lib/api-client";
import type { JobFeedResponseBody, JobDetailResponseBody } from "#/types/api";
import type { Job, JobFilters } from "#/types/job";

function mapFeedItemToJob(
  item: JobFeedResponseBody["items"][number]
): Job {
  return {
    id: item.id,
    title: item.title,
    company: item.company,
    location: item.location ?? "",
    salary: item.salary,
    platform: "other" as const,
    matchScore: item.score,
    keySkills: item.skills,
    description: "",
    url: item.applyUrl,
    isRemote: item.location?.toLowerCase().includes("remote") ?? false,
  };
}

function buildFeedQueryString(
  filters: JobFilters,
  page: number,
  limit: number
): string {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (filters.search?.trim()) params.set("search", filters.search.trim());
  if (filters.matchScoreMin != null)
    params.set("minScore", String(filters.matchScoreMin));
  if (filters.location?.trim()) params.set("location", filters.location.trim());
  if (filters.remote === true) params.set("remote", "true");
  if (filters.remote === false) params.set("remote", "false");
  if (filters.platform) params.set("platform", filters.platform);
  return params.toString();
}

export interface UseJobsResult {
  data: Job[] | undefined;
  total: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useJobs(
  filters: JobFilters = {},
  page = 1,
  limit = 20
): UseJobsResult {
  const query = useQuery({
    queryKey: queryKeys.jobs.list(filters, page, limit),
    queryFn: async () => {
      const qs = buildFeedQueryString(filters, page, limit);
      const path = qs ? `/jobs/feed?${qs}` : "/jobs/feed";
      const response = await apiRequest<JobFeedResponseBody>({
        path,
        method: "GET",
      });
      return {
        jobs: response.items.map(mapFeedItemToJob),
        total: response.total,
      };
    },
  });

  const data = query.data?.jobs;
  const total = query.data?.total ?? 0;

  return {
    data,
    total,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.jobs.detail(id ?? ""),
    queryFn: async () => {
      const job = await apiRequest<JobDetailResponseBody>({
        path: `/jobs/${id}`,
        method: "GET",
      });
      return job;
    },
    enabled: Boolean(id),
  });
}

export function useRecentMatches(limit = 5) {
  return useQuery({
    queryKey: [...queryKeys.recentMatches, limit],
    queryFn: async () => {
      const response = await apiRequest<JobFeedResponseBody>({
        path: `/jobs/feed?page=1&limit=${limit}`,
        method: "GET",
      });
      return response.items.slice(0, limit).map(mapFeedItemToJob);
    },
  });
}

