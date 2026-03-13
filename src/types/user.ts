/**
 * Authenticated user and notification preferences.
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
}

export interface NotificationPreferences {
  emailDigest: boolean;
  newMatches: boolean;
  savedJobAlerts: boolean;
}
