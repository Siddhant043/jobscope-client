import { createFileRoute } from "@tanstack/react-router";
import { useResumeStatus } from "#/hooks/use-resume";
import { ResumeUploadCard, ResumeAnalysisCard } from "#/components/resume";
import { Skeleton } from "#/components/ui/skeleton";
import { EmptyState } from "#/components/ui/empty-state";

export const Route = createFileRoute("/_app/resume")({
  component: ResumePage,
});

function ResumePage() {
  const { data: resumeStatus, isLoading } = useResumeStatus();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resume</h1>
        <p className="text-muted-foreground">
          Upload and manage your resume. We use it to match you with jobs.
        </p>
      </div>

      <ResumeUploadCard />

      {isLoading ? (
        <Skeleton className="h-64 w-full rounded-xl" />
      ) : resumeStatus ? (
        <ResumeAnalysisCard
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
          title="No resume analysis yet"
          description="Upload your resume above to see skills, tech stack, and tailored insights."
        />
      )}
    </div>
  );
}
