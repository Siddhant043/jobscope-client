/**
 * Extracted resume profile from uploaded resume.
 */
export interface ResumeProfile {
  skills: string[];
  /** Bullet-point experience lines (if any). */
  experience: string[];
  /** Years of experience from API (numeric). */
  experienceYears?: number | null;
  preferredRoles: string[];
  techStack: string[];
  seniority: string;
}
