import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useSavedJobsList } from "#/hooks/use-saved-jobs";
import { JobCard } from "#/components/jobs";
import { EmptyState } from "#/components/ui/empty-state";

export const Route = createFileRoute("/_app/saved")({
  component: SavedJobsPage,
});

function SavedJobsPage() {
  const router = useRouter();
  const savedJobs = useSavedJobsList();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved jobs</h1>
        <p className="text-muted-foreground">
          Jobs you have bookmarked. Click the bookmark on any job card to save or
          remove.
        </p>
      </div>

      {savedJobs.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No saved jobs yet"
          description="Tap the bookmark icon on any job in the feed to save it for later."
          actionLabel="Browse jobs"
          onActionClick={() => router.navigate({ to: "/job-feed" })}
        />
      )}
    </div>
  );
}
