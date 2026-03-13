import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useResumeStatus } from "#/hooks/use-resume";
import { useRecentMatches } from "#/hooks/use-jobs";
import { useSources } from "#/hooks/use-sources";
import {
  ResumeProfileCard,
  JobStatsCards,
  RecentMatchesList,
} from "#/components/dashboard";
import { Skeleton } from "#/components/ui/skeleton";
import { EmptyState } from "#/components/ui/empty-state";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const router = useRouter();
  const { data: resumeStatus, isLoading: resumeLoading } = useResumeStatus();
  const { data: recentMatches, isLoading: matchesLoading } = useRecentMatches(5);
  const { data: sources } = useSources();

  const jobsFoundToday = recentMatches?.length ?? 0;
  const matchesAbove80 =
    recentMatches?.filter((job) => job.matchScore >= 80).length ?? 0;
  const platformsConnected = sources?.length ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your resume profile and job matches.
        </p>
      </div>

      {resumeLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : resumeStatus ? (
        <ResumeProfileCard
          profile={{
            skills: resumeStatus.skills ?? [],
            experience: [],
            preferredRoles: [],
            techStack: resumeStatus.techStack ?? [],
            seniority: resumeStatus.seniority ?? "",
          }}
        />
      ) : (
        <EmptyState
          title="No resume on file yet"
          description="Upload your resume so we can analyze your profile and match you with better jobs."
          actionLabel="Go to resume"
          onActionClick={() => router.navigate({ to: "/resume" })}
        />
      )}

      <JobStatsCards
        jobsFoundToday={jobsFoundToday}
        matchesAbove80={matchesAbove80}
        platformsConnected={platformsConnected}
      />

      {matchesLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : recentMatches?.length ? (
        <RecentMatchesList jobs={recentMatches} />
      ) : (
        <EmptyState
          title="No job matches yet"
          description="Once you upload your resume and connect job sources, we’ll start surfacing matches here."
        />
      )}
    </div>
  );
}
