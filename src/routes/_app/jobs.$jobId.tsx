import { createFileRoute } from "@tanstack/react-router";
import { useJob } from "#/hooks/use-jobs";
import {
  JobDetailsHeader,
  AIMatchExplanationCard,
} from "#/components/jobs";
import { Skeleton } from "#/components/ui/skeleton";

export const Route = createFileRoute("/_app/jobs/$jobId")({
  component: JobDetailsPage,
});

function JobDetailsPage() {
  const { jobId } = Route.useParams();
  const { data: job, isLoading } = useJob(jobId);

  if (isLoading || !job) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <JobDetailsHeader job={job} />
      <AIMatchExplanationCard />
      <div>
        <h2 className="mb-2 text-lg font-semibold">Job description</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none rounded-lg border border-border bg-muted/30 p-4">
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {job.description}
          </p>
        </div>
      </div>
    </div>
  );
}
