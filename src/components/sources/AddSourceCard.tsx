import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { useCreateSource } from "#/hooks/use-sources";

export function AddSourceCard() {
  const [url, setUrl] = useState("");
  const createSourceMutation = useCreateSource();

  function handleAdd() {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      return;
    }

    createSourceMutation.mutate(
      { url: trimmedUrl },
      {
        onSuccess: () => {
          setUrl("");
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add job source</CardTitle>
        <CardDescription>
          Enter a job board or platform URL (e.g. LinkedIn Jobs, Wellfound, YC
          Jobs, Remotive).
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <div className="flex-1 space-y-2">
          <Label htmlFor="source-url" className="sr-only">
            Source URL
          </Label>
          <Input
            id="source-url"
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button onClick={handleAdd}>Add</Button>
      </CardContent>
    </Card>
  );
}
