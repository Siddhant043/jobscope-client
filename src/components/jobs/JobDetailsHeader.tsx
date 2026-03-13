import type { Job } from "#/types/job";
import { Button } from "#/components/ui/button";
import { MatchScoreBadge } from "./MatchScoreBadge";

const platformLabel: Record<Job["platform"], string> = {
  linkedin: "LinkedIn",
  wellfound: "Wellfound",
  "yc-jobs": "YC Jobs",
  remotive: "Remotive",
  other: "Other",
};

interface JobDetailsHeaderProps {
  job: Job;
}

export function JobDetailsHeader({ job }: JobDetailsHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {job.title}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">{job.company}</p>
          <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <MatchScoreBadge score={job.matchScore} />
          <span className="rounded-md border border-border px-2 py-1 text-xs font-medium">
            {platformLabel[job.platform]}
          </span>
          <Button asChild>
            <a href={job.url} target="_blank" rel="noopener noreferrer">
              Apply
            </a>
          </Button>
        </div>
      </div>
      {job.salary && (
        <p className="text-sm font-medium text-muted-foreground">
          {job.salary}
        </p>
      )}
    </div>
  );
}
