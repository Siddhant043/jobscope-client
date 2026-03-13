/**
 * Central query keys for React Query.
 */
export const queryKeys = {
  jobs: {
    all: ["jobs"] as const,
    list: (filters: unknown) => ["jobs", "list", filters] as const,
    detail: (id: string) => ["jobs", "detail", id] as const,
  },
  resume: ["resume"] as const,
  sources: ["sources"] as const,
  savedJobs: ["savedJobs"] as const,
  recentMatches: ["recentMatches"] as const,
};
