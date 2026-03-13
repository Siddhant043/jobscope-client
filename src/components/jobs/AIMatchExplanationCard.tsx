import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

interface AIMatchExplanationCardProps {
  reasons: string[];
}

export function AIMatchExplanationCard({ reasons }: AIMatchExplanationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why this job matches you</CardTitle>
        <CardDescription>
          AI-generated match reasons based on your resume.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {reasons.map((reason, i) => (
            <li key={i}>{reason}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
