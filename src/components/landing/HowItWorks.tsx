import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { UploadIcon, Link2Icon, SearchIcon } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Upload your resume",
    description:
      "Drop your PDF or paste your experience. Our AI extracts your skills, tech stack, and seniority.",
    icon: UploadIcon,
  },
  {
    step: 2,
    title: "Connect job platforms",
    description:
      "Add LinkedIn, Wellfound, YC Jobs, or other sources. We pull in jobs from one dashboard.",
    icon: Link2Icon,
  },
  {
    step: 3,
    title: "Search and discover curated jobs",
    description:
      "Browse your feed sorted by match score. See why each job fits and apply with one click.",
    icon: SearchIcon,
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-border px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Three steps to better job discovery.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(({ step, title, description, icon: Icon }) => (
            <Card key={step} className="border-border/50">
              <CardHeader>
                <div className="flex size-12 items-center justify-center rounded-full border-2 border-primary bg-primary/5 text-primary">
                  <span className="text-lg font-bold">{step}</span>
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
