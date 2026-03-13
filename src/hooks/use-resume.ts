import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "#/lib/query-keys";
import { apiRequest } from "#/lib/api-client";
import type {
  ResumeStatusOrNullResponseBody,
  ResumeUploadResponseBody,
} from "#/types/api";

export function useResumeStatus() {
  return useQuery({
    queryKey: queryKeys.resume,
    queryFn: () =>
      apiRequest<ResumeStatusOrNullResponseBody>({
        path: "/resume/status",
        method: "GET",
      }),
  });
}

export async function uploadResume(formData: FormData): Promise<ResumeUploadResponseBody> {
  const baseUrl = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("VITE_API_URL is not configured");
  }

  const response = await fetch(`${baseUrl}/resume/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Resume upload failed");
  }

  return (await response.json()) as ResumeUploadResponseBody;
}

