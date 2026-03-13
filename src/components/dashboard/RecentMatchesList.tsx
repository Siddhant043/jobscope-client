import { Link } from "@tanstack/react-router";
import type { Job } from "#/types/job";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { MatchScoreBadge } from "#/components/jobs/MatchScoreBadge";

interface RecentMatchesListProps {
  jobs: Job[];
}

export function RecentMatchesList({ jobs }: RecentMatchesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent matches</CardTitle>
        <CardDescription>Latest job matches by score</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <MatchScoreBadge score={job.matchScore} />
                <Button variant="outline" size="sm" asChild>
                  <Link to="/jobs/$jobId" params={{ jobId: job.id }}>
                    View
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
