import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "#/lib/query-keys";
import { apiRequest } from "#/lib/api-client";
import type { JobFeedResponseBody, JobDetailResponseBody } from "#/types/api";
import type { JobFilters } from "#/types/job";

export function useJobs(filters: JobFilters = {}) {
  return useQuery({
    queryKey: queryKeys.jobs.list(filters),
    queryFn: async () => {
      const response = await apiRequest<JobFeedResponseBody>({
        path: "/jobs/feed",
        method: "GET",
      });

      return response.map((item) => ({
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
      }));
    },
  });
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
        path: "/jobs/feed",
        method: "GET",
      });

      return response
        .slice(0, limit)
        .map((item) => ({
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
        }));
    },
  });
}

