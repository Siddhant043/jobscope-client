import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { cn } from "#/lib/utils";

/** Allow common structural/formatting attributes (e.g. dir) from API HTML. */
const SANITIZE_CONFIG: DOMPurify.Config = {
  USE_PROFILES: { html: true },
  ADD_ATTR: ["dir", "target", "rel"],
  ADD_TAGS: [],
};

function sanitize(html: string): string {
  if (typeof window === "undefined") return "";
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
}

interface SafeHtmlProps {
  html: string;
  className?: string;
}

/**
 * Renders sanitized HTML safely. Sanitization runs only on the client to avoid
 * DOMPurify relying on document/window during SSR.
 */
export function SafeHtml({ html, className }: SafeHtmlProps) {
  const [sanitized, setSanitized] = useState<string>("");

  useEffect(() => {
    setSanitized(sanitize(html ?? ""));
  }, [html]);

  if (!html?.trim()) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        No description available.
      </p>
    );
  }

  if (!sanitized) {
    return (
      <div className={cn("text-sm text-muted-foreground animate-pulse", className)}>
        Loading…
      </div>
    );
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
