/**
 * Job listing from aggregated platforms.
 */
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string | null;
  platform: JobPlatform;
  matchScore: number;
  keySkills: string[];
  description: string;
  url: string;
  isRemote: boolean;
  postedAt?: string;
}

export type JobPlatform =
  | "linkedin"
  | "wellfound"
  | "yc-jobs"
  | "remotive"
  | "other";

/** Filters for job feed. */
export interface JobFilters {
  search?: string;
  matchScoreMin?: number;
  location?: string;
  remote?: boolean | null;
  platform?: JobPlatform | null;
}
