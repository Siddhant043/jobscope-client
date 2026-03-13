import { Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Find the Best Jobs for Your Resume with AI
        </h1>
        <p className="mt-6 text-lg text-muted-foreground md:text-xl">
          JobRadar AI aggregates jobs from LinkedIn, Wellfound, YC Jobs, and
          more—then ranks them by how well they match your resume. One feed,
          smarter matches.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/resume">Upload Resume</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
