import { Link } from "@tanstack/react-router";
import type { Job } from "#/types/job";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { MatchScoreBadge } from "./MatchScoreBadge";
import { useSavedJobsStore } from "#/stores/saved-jobs-store";
import { BookmarkIcon } from "lucide-react";
import { cn } from "#/lib/utils";

const platformLabel: Record<Job["platform"], string> = {
  linkedin: "LinkedIn",
  wellfound: "Wellfound",
  "yc-jobs": "YC Jobs",
  remotive: "Remotive",
  other: "Other",
};

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const hasSaved = useSavedJobsStore((s) => s.has(job.id));
  const toggleSaved = useSavedJobsStore((s) => s.toggle);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-tight truncate">{job.title}</h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <MatchScoreBadge score={job.matchScore} />
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={hasSaved ? "Unsave job" : "Save job"}
            onClick={() => toggleSaved(job.id)}
          >
            <BookmarkIcon
              className={cn("size-4", hasSaved && "fill-current")}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{job.location}</p>
        {job.salary && (
          <p className="text-sm font-medium">{job.salary}</p>
        )}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary">{platformLabel[job.platform]}</Badge>
          {job.keySkills.slice(0, 3).map((s) => (
            <Badge key={s} variant="outline">
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/jobs/$jobId" params={{ jobId: job.id }}>
            View Details
          </Link>
        </Button>
        <Button size="sm" asChild>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            Apply
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

