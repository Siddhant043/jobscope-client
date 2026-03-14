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
  const analysisStatus = resumeStatus?.status ?? null;

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
      ) : analysisStatus === "pending" ? (
        <EmptyState
          title="Analyzing your resume"
          description="We’re extracting skills and tech stack from your resume. This usually takes a few seconds."
        />
      ) : analysisStatus === "ready" && resumeStatus ? (
        <ResumeAnalysisCard
          profile={{
            skills: resumeStatus.skills ?? [],
            experience: [],
            experienceYears: resumeStatus.experience ?? null,
            preferredRoles: resumeStatus.roles ?? [],
            techStack: resumeStatus.techStack ?? [],
            seniority: resumeStatus.seniority ?? "",
          }}
        />
      ) : analysisStatus === "error" ? (
        <EmptyState
          title="We couldn’t analyze your resume"
          description="Please try uploading your resume again, or use a different PDF or DOCX file."
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
