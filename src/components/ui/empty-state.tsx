import type React from "react";
import { cn } from "#/lib/utils";
import { Button } from "#/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
  secondaryActionLabel?: string;
  onSecondaryActionClick?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onActionClick,
  secondaryActionLabel,
  onSecondaryActionClick,
  className,
}: EmptyStateProps) {
  const hasPrimaryAction = Boolean(actionLabel && onActionClick);
  const hasSecondaryAction = Boolean(secondaryActionLabel && onSecondaryActionClick);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      {icon ? <div className="mb-1 text-foreground [&_svg]:size-6">{icon}</div> : null}
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description ? <p className="max-w-md text-sm text-muted-foreground">{description}</p> : null}
      {(hasPrimaryAction || hasSecondaryAction) && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          {hasPrimaryAction && actionLabel && onActionClick ? (
            <Button type="button" size="sm" onClick={onActionClick}>
              {actionLabel}
            </Button>
          ) : null}
          {hasSecondaryAction && secondaryActionLabel && onSecondaryActionClick ? (
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onSecondaryActionClick}
            >
              {secondaryActionLabel}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  );
}

