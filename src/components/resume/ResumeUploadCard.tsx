import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { UploadIcon, FileTextIcon } from "lucide-react";
import { cn } from "#/lib/utils";
import { queryKeys } from "#/lib/query-keys";
import { uploadResume, useResumeStatus } from "#/hooks/use-resume";
import { toast } from "sonner";

const ALLOWED_EXTENSIONS = [".pdf", ".docx"];
const ACCEPT = ".pdf,.docx";
const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function isAllowedFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const hasAllowedExtension = ALLOWED_EXTENSIONS.some((ext) =>
    name.endsWith(ext),
  );
  const hasAllowedType = ALLOWED_TYPES.includes(file.type);
  return hasAllowedExtension || hasAllowedType;
}

export function ResumeUploadCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data: resumeStatus, isLoading: isStatusLoading } = useResumeStatus();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const isPending = resumeStatus?.status === "pending";

  if (isStatusLoading || isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analyzing resume</CardTitle>
          <CardDescription>
            We&apos;re processing your resume to extract skills, tech stack, and
            seniority. This usually takes a few seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-2 animate-pulse rounded-full bg-primary" />
              <span>Analyzing your resume…</span>
            </div>
            <p className="text-xs text-muted-foreground">
              You&apos;ll see updated insights as soon as analysis is complete.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  function processFile(file: File | null) {
    setError(null);
    setSelectedFile(file);
  }

  async function handleAnalyzeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    if (!selectedFile || isAnalyzing) {
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const formData = new FormData();
      formData.append("resume", selectedFile);

      await uploadResume(formData);
      await queryClient.invalidateQueries({ queryKey: queryKeys.resume });
      toast.success("Resume uploaded. We’re analyzing it now.");
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : "Resume upload failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleFileSelect(files: FileList | null) {
    if (!files?.length) return;
    if (files.length > 1) {
      setError("Please upload only one file.");
      return;
    }
    const file = files[0];
    if (!isAllowedFile(file)) {
      setError("Only PDF and DOCX files are allowed.");
      return;
    }
    processFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFileSelect(e.target.files);
    e.target.value = "";
  }

  function handleDropZoneClick() {
    inputRef.current?.click();
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files.length) return;
    if (files.length > 1) {
      setError("Please upload only one file.");
      return;
    }
    const file = files[0];
    if (!isAllowedFile(file)) {
      setError("Only PDF and DOCX files are allowed.");
      return;
    }
    processFile(file);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload resume</CardTitle>
        <CardDescription>
          Drag and drop your resume (PDF or DOCX) or click to browse. Single
          file only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          aria-hidden
          tabIndex={-1}
          onChange={handleInputChange}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={handleDropZoneClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleDropZoneClick();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex min-h-[180px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isDragging && "border-primary bg-primary/5",
            error && "border-destructive/50",
          )}
        >
          {selectedFile ? (
            <>
              <FileTextIcon className="size-10 text-primary" />
              <p className="text-sm font-medium text-foreground">
                {selectedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              <div className="mt-2 flex items-center gap-2">
                {isAnalyzing ? (
                  <Button type="button" size="sm" disabled>
                    Analyzing resume…
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAnalyzeClick}
                    >
                      Analyze resume
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        processFile(null);
                      }}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <UploadIcon className="size-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop your resume here or click the button below
              </p>
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropZoneClick();
                }}
              >
                Upload resume
              </Button>
              <p className="text-xs text-muted-foreground">
                PDF or DOCX only · One file
              </p>
            </>
          )}
        </div>
        {error && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
