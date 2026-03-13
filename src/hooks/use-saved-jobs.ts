import { useMemo } from "react";
import { useSavedJobsStore } from "#/stores/saved-jobs-store";
import { useJobs } from "#/hooks/use-jobs";

/**
 * Returns list of jobs that are saved (bookmarked), in same shape as job feed.
 */
export function useSavedJobsList() {
  const savedIds = useSavedJobsStore((state) => state.savedIds);
  const { data: jobs = [] } = useJobs();
  const savedJobs = useMemo(
    () => jobs.filter((job) => savedIds.includes(job.id)),
    [jobs, savedIds]
  );
  return savedJobs;
}

export { useSavedJobsStore } from "#/stores/saved-jobs-store";
