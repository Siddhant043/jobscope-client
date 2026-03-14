import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useJobs, useJobFilters, useDebounce } from "#/hooks";
import { JobFiltersBar, JobCard } from "#/components/jobs";
import { Skeleton } from "#/components/ui/skeleton";
import { EmptyState } from "#/components/ui/empty-state";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "#/components/ui/pagination";

const PAGE_SIZE = 20;

export const Route = createFileRoute("/_app/job-feed")({
  component: JobFeedPage,
});

function JobFeedPage() {
  const { filters, setFilter, reset } = useJobFilters();
  const [page, setPage] = React.useState(1);
  const debouncedSearch = useDebounce(filters.search ?? "", 300);

  const effectiveFilters = React.useMemo(
    () => ({ ...filters, search: debouncedSearch || undefined }),
    [filters, debouncedSearch]
  );

  const { data: jobs, total, isLoading } = useJobs(
    effectiveFilters,
    page,
    PAGE_SIZE
  );

  const handleFilterChange = React.useCallback(
    <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
      setFilter(key, value);
      setPage(1);
    },
    [setFilter]
  );

  const handleReset = React.useCallback(() => {
    reset();
    setPage(1);
  }, [reset]);

  const handleSearchChange = React.useCallback(
    (v: string) => {
      setFilter("search", v || undefined);
      setPage(1);
    },
    [setFilter]
  );

  const hasActiveFilters =
    Boolean(filters.search && filters.search.trim() !== "") ||
    filters.matchScoreMin !== undefined ||
    Boolean(filters.location && filters.location.trim() !== "") ||
    filters.remote !== undefined ||
    Boolean(filters.platform);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const showPagination = total > 0 && totalPages > 1;

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
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        searchValue={filters.search ?? ""}
        onSearchChange={handleSearchChange}
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : jobs?.length ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {showPagination && (
            <div className="border-t border-border pt-4">
              <Pagination>
                <PaginationContent className="flex-wrap justify-between gap-2 sm:justify-between">
                  <PaginationItem className="list-none">
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}
                    </span>
                  </PaginationItem>
                  <PaginationItem className="list-none">
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page > 1) setPage((p) => p - 1);
                      }}
                      className={
                        page <= 1
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      aria-disabled={page <= 1}
                    />
                  </PaginationItem>
                  <PaginationItem className="list-none">
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage((p) => p + 1);
                      }}
                      className={
                        page >= totalPages
                          ? "pointer-events-none opacity-50"
                          : undefined
                      }
                      aria-disabled={page >= totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          title={hasActiveFilters ? "No jobs match your filters" : "No jobs to show yet"}
          description={
            hasActiveFilters
              ? "Try clearing some filters or broadening your search."
              : "Once you upload your resume and connect job sources, we’ll start surfacing matches here."
          }
          actionLabel={hasActiveFilters ? "Reset filters" : undefined}
          onActionClick={hasActiveFilters ? handleReset : undefined}
        />
      )}
    </div>
  );
}
