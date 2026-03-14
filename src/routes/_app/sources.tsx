import { createFileRoute } from "@tanstack/react-router";
import { useSources, useRemoveSource } from "#/hooks/use-sources";
import { AddSourceCard, ConnectedSourcesList } from "#/components/sources";
import { Skeleton } from "#/components/ui/skeleton";
import { EmptyState } from "#/components/ui/empty-state";

export const Route = createFileRoute("/_app/sources")({
  component: SourcesPage,
});

function SourcesPage() {
  const { data: sources, isLoading } = useSources();
  const removeSource = useRemoveSource();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Job sources</h1>
        <p className="text-muted-foreground">
          Add and manage job platforms (LinkedIn, Wellfound, YC Jobs, etc.).
        </p>
      </div>

      <AddSourceCard />

      {isLoading ? (
        <Skeleton className="h-48 w-full rounded-xl" />
      ) : sources && sources.length > 0 ? (
        <ConnectedSourcesList
          sources={sources}
          onRemove={(id) => removeSource.mutate(id)}
        />
      ) : (
        <EmptyState
          title="No job sources connected"
          description="Connect platforms like LinkedIn or YC Jobs to start importing roles."
        />
      )}
    </div>
  );
}
