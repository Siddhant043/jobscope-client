import type { ResumeProfile } from "#/types/resume";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";

interface ResumeProfileCardProps {
  profile: ResumeProfile;
}

export function ResumeProfileCard({ profile }: ResumeProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume profile</CardTitle>
        <CardDescription>Extracted from your uploaded resume</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Skills</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <Badge key={s} variant="secondary">
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Experience</p>
          <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
            {profile.experience.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">
            Preferred roles
          </p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {profile.preferredRoles.map((r) => (
              <Badge key={r} variant="outline">
                {r}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
