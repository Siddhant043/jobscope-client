/**
 * Match score tier for styling (badge colors).
 * 90%+ = green, 75-90% = blue, 60-75% = orange, below 60% = gray.
 */
export type MatchScoreTier = "excellent" | "good" | "fair" | "low";

export function getMatchScoreTier(score: number): MatchScoreTier {
  if (score >= 90) return "excellent";
  if (score >= 75) return "good";
  if (score >= 60) return "fair";
  return "low";
}

/** Tailwind-compatible class for badge background/border by tier. */
export function getMatchScoreBadgeClassName(tier: MatchScoreTier): string {
  switch (tier) {
    case "excellent":
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
    case "good":
      return "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30";
    case "fair":
      return "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30";
    case "low":
      return "bg-muted text-muted-foreground border-border";
  }
}
