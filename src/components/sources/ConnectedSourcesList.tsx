import type { JobSource } from "#/types/source";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";
import { Link2Icon, Trash2Icon } from "lucide-react";

interface SourceWithOptionalStatus extends Omit<JobSource, "status"> {
  status?: JobSource["status"] | null;
}

interface ConnectedSourcesListProps {
  sources: SourceWithOptionalStatus[];
  onRemove?: (id: string) => void;
}

const statusVariant = (
  status: JobSource["status"]
): "default" | "secondary" | "destructive" => {
  if (status === "completed") return "default";
  if (status === "processing") return "secondary";
  return "destructive";
};

const statusLabel: Record<JobSource["status"], string> = {
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

function normalizeStatus(
  status: JobSource["status"] | null | undefined
): JobSource["status"] {
  if (status === "processing" || status === "completed" || status === "failed")
    return status;
  return "processing";
}

export function ConnectedSourcesList({
  sources,
  onRemove,
}: ConnectedSourcesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected sources</CardTitle>
        <CardDescription>Job platforms you have connected.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {sources.map((source) => (
            <li
              key={source.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Link2Icon className="size-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{source.platform}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {source.url}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={statusVariant(normalizeStatus(source.status))}>
                  {statusLabel[normalizeStatus(source.status)]}
                </Badge>
                {onRemove && (
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Remove ${source.platform}`}
                    onClick={() => onRemove(source.id)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
