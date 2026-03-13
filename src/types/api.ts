import type { Job } from "./job";
import type { JobSource } from "./source";
import type { ResumeProfile } from "./resume";
import type { User } from "./user";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string | null;
}

export interface AuthUser extends Pick<User, "id" | "email"> {}

export interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface RegisterResponseBody {
  token: string;
  user: AuthUser;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  token: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RefreshRequestBody {
  refreshToken: string;
}

export interface RefreshResponseBody {
  token: string;
}

export interface LogoutRequestBody {
  refreshToken: string;
}

export interface LogoutResponseBody {
  ok: boolean;
}

export interface HealthStatusOkResponseBody {
  status: "ok";
  ts: string;
}

export interface HealthStatusUnhealthyResponseBody {
  status: "unhealthy";
  ts: string;
  db: "ok" | "down";
  redis: "ok" | "down";
}

export type HealthResponseBody =
  | HealthStatusOkResponseBody
  | HealthStatusUnhealthyResponseBody;

export interface JobFeedItem {
  id: string;
  title: string;
  company: string;
  location: string | null;
  salary: string | null;
  applyUrl: string;
  skills: string[];
  seniority: string | null;
  score: number;
}

export type JobFeedResponseBody = JobFeedItem[];

export interface JobDetailResponseBody extends Job {
  description: string;
  techStack: string[];
  createdAt: string;
}

export interface ResumeUploadResponseBody {
  resumeId: string;
  status: "pending" | "ready" | "error";
}

export interface ResumeStatusResponseBody {
  id: string;
  status: "pending" | "ready" | "error";
  skills: string[] | null;
  techStack: string[] | null;
  seniority: string | null;
  createdAt: string;
}

export type ResumeStatusOrNullResponseBody = ResumeStatusResponseBody | null;

export interface ResumeDownloadUrlResponseBody {
  url: string;
}

export interface SourceListItem extends JobSource {
  lastScrapedAt: string | null;
}

export type SourcesListResponseBody = SourceListItem[];

export interface CreateSourceRequestBody {
  url: string;
}

export interface CreateSourceResponseBody {
  sourceId: string;
  platform: string;
}

export interface ApiErrorResponseBody {
  error: string;
  field?: string;
}

