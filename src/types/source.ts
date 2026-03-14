/**
 * Connected job source (platform).
 */
export interface JobSource {
  id: string;
  platform: string;
  url: string;
  status: "processing" | "completed" | "failed";
}
