import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "#/lib/query-keys";
import { apiRequest, getApiBaseUrl, refreshAccessToken } from "#/lib/api-client";
import { useAuthStore } from "#/stores/auth-store";
import type {
  ResumeStatusOrNullResponseBody,
  ResumeUploadResponseBody,
} from "#/types/api";

export function useResumeStatus() {
  return useQuery<ResumeStatusOrNullResponseBody, Error, ResumeStatusOrNullResponseBody>({
    queryKey: queryKeys.resume,
    queryFn: () =>
      apiRequest<ResumeStatusOrNullResponseBody>({
        path: "/resume/status",
        method: "GET",
      }),
    refetchInterval(query) {
      return query.state.data && query.state.data.status === "pending" ? 3000 : false;
    },
  });
}

export async function uploadResume(formData: FormData): Promise<ResumeUploadResponseBody> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/resume/upload`;

  const authState = useAuthStore.getState();
  const headers = new Headers();

  if (authState.accessToken) {
    headers.set("Authorization", `Bearer ${authState.accessToken}`);
  }

  let response = await fetch(url, {
    method: "POST",
    body: formData,
    headers,
  });

  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken(authState.refreshToken ?? null);

    if (newAccessToken) {
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      response = await fetch(url, {
        method: "POST",
        body: formData,
        headers,
      });
    }
  }

  if (!response.ok) {
    let errorMessage = "Resume upload failed";

    try {
      const errorBody = (await response.json()) as { error?: string };
      if (errorBody.error) {
        errorMessage = errorBody.error;
      }
    } catch {
      // ignore JSON parse errors and keep generic message
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as ResumeUploadResponseBody;
}

