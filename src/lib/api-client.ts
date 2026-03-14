import type { ApiErrorResponseBody } from "#/types/api";
import { useAuthStore } from "#/stores/auth-store";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientRequestConfig<TBody> {
  path: string;
  method?: HttpMethod;
  body?: TBody;
  signal?: AbortSignal;
  withAuth?: boolean;
}

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errorCode?: string;

  constructor(message: string, statusCode: number, errorCode?: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export function getApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!baseUrl) {
    throw new Error("VITE_API_URL is not configured");
  }
  return baseUrl.replace(/\/+$/, "");
}

export async function refreshAccessToken(
  existingRefreshToken: string | null,
): Promise<string | null> {
  if (!existingRefreshToken) {
    return null;
  }

  const baseUrl = getApiBaseUrl();
  const response = await fetch(`${baseUrl}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken: existingRefreshToken }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { token: string };
  const newAccessToken = data.token;

  useAuthStore.getState().setAccessToken(newAccessToken);

  return newAccessToken;
}

export async function apiRequest<TResponse, TBody = unknown>(
  config: ApiClientRequestConfig<TBody>,
): Promise<TResponse> {
  const { path, method = "GET", body, signal, withAuth = true } = config;
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${path}`;

  const headers = new Headers({
    "Content-Type": "application/json",
  });

  const authState = useAuthStore.getState();
  const accessToken = withAuth ? authState.accessToken : null;

  if (withAuth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const requestInit: RequestInit = {
    method,
    headers,
    signal,
  };

  if (body !== undefined && body !== null) {
    requestInit.body = JSON.stringify(body);
  }

  let response = await fetch(url, requestInit);

  if (response.status === 401 && withAuth) {
    const newAccessToken = await refreshAccessToken(authState.refreshToken);

    if (newAccessToken) {
      headers.set("Authorization", `Bearer ${newAccessToken}`);
      response = await fetch(url, requestInit);
    }
  }

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    let errorCode: string | undefined;

    try {
      const errorBody = (await response.json()) as ApiErrorResponseBody;
      if (errorBody.error) {
        errorMessage = errorBody.error;
      }
      if (errorBody.field) {
        errorCode = errorBody.field;
      }
    } catch {
      // ignore JSON parsing issues and fall back to generic message
    }

    throw new ApiError(errorMessage, response.status, errorCode);
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}
