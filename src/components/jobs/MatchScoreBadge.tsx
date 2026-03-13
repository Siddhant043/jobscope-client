import { cn } from "#/lib/utils";
import {
  getMatchScoreTier,
  getMatchScoreBadgeClassName,
} from "#/lib/match-score";

interface MatchScoreBadgeProps {
  score: number;
  className?: string;
}

export function MatchScoreBadge({ score, className }: MatchScoreBadgeProps) {
  const tier = getMatchScoreTier(score);
  const variantClass = getMatchScoreBadgeClassName(tier);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        variantClass,
        className
      )}
    >
      {score}% match
    </span>
  );
}
