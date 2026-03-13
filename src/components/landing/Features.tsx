import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import {
  SparklesIcon,
  LayersIcon,
  TargetIcon,
  CalendarDaysIcon,
} from "lucide-react";

const features = [
  {
    title: "AI Resume Analysis",
    description:
      "Upload your resume and our AI extracts skills, experience, and preferences to power accurate matching.",
    icon: SparklesIcon,
  },
  {
    title: "Multi-Platform Job Aggregation",
    description:
      "One place for jobs from LinkedIn, Wellfound, YC Jobs, Remotive, and more. No more tab-hopping.",
    icon: LayersIcon,
  },
  {
    title: "Smart Job Matching",
    description:
      "Every job gets a match score based on your profile. See why a job fits you before you apply.",
    icon: TargetIcon,
  },
  {
    title: "Daily Curated Job Feed",
    description:
      "Get a fresh feed of the best matches, updated daily. Save and track jobs that interest you.",
    icon: CalendarDaysIcon,
  },
];

export function Features() {
  return (
    <section className="border-t border-border bg-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
          Why JobRadar AI
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Built for developers and job seekers who want relevance, not noise.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="border-border/50">
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
