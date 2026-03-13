import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useJobs, useJobFilters, useDebounce } from "#/hooks";
import { JobFiltersBar, JobCard } from "#/components/jobs";
import { Skeleton } from "#/components/ui/skeleton";
import { EmptyState } from "#/components/ui/empty-state";

export const Route = createFileRoute("/_app/job-feed")({
  component: JobFeedPage,
});

function JobFeedPage() {
  const { filters, setFilter, reset } = useJobFilters();
  const debouncedSearch = useDebounce(filters.search ?? "", 300);

  const effectiveFilters = React.useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined }),
    [filters, debouncedSearch]
  );

  const { data: jobs, isLoading } = useJobs(effectiveFilters);

  const hasActiveFilters =
    Boolean(filters.search && filters.search.trim() !== "") ||
    filters.matchScoreMin !== undefined ||
    Boolean(filters.location && filters.location.trim() !== "") ||
    filters.remote !== undefined ||
    Boolean(filters.platform);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Job feed</h1>
        <p className="text-muted-foreground">
          Curated jobs ranked by match score. Filter and search below.
        </p>
      </div>

      <JobFiltersBar
        filters={filters}
        onFilterChange={setFilter}
        onReset={reset}
        searchValue={filters.search ?? ""}
        onSearchChange={(v) => setFilter("search", v || undefined)}
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : jobs?.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={hasActiveFilters ? "No jobs match your filters" : "No jobs to show yet"}
          description={
            hasActiveFilters
              ? "Try clearing some filters or broadening your search."
              : "Once you upload your resume and connect job sources, we’ll start surfacing matches here."
          }
          actionLabel={hasActiveFilters ? "Reset filters" : undefined}
          onActionClick={hasActiveFilters ? () => reset() : undefined}
        />
      )}
    </div>
  );
}
