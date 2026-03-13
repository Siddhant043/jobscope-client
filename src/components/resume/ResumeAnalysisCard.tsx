import { useState } from "react";
import type { ResumeProfile } from "#/types/resume";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Badge } from "#/components/ui/badge";

interface ResumeAnalysisCardProps {
  profile: ResumeProfile;
}

export function ResumeAnalysisCard({ profile: initialProfile }: ResumeAnalysisCardProps) {
  const [skills, setSkills] = useState<string[]>(initialProfile.skills);

  function handleAddSkill() {
    const value = window.prompt("New skill:");
    if (value?.trim()) setSkills((s) => [...s, value.trim()]);
  }

  function handleRemoveSkill(skill: string) {
    setSkills((s) => s.filter((x) => x !== skill));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume analysis</CardTitle>
        <CardDescription>
          Skills, tech stack, experience, and seniority from your resume.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Skills</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleRemoveSkill(s)}
              >
                {s} ×
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="cursor-pointer border-dashed"
              onClick={handleAddSkill}
            >
              + Add
            </Badge>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Tech stack</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {initialProfile.techStack.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Experience</p>
          <ul className="mt-1 list-inside list-disc text-sm text-muted-foreground">
            {initialProfile.experience.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">Seniority</p>
          <p className="mt-1 text-sm">{initialProfile.seniority}</p>
        </div>
      </CardContent>
    </Card>
  );
}
