import { createFileRoute } from "@tanstack/react-router";
import { Hero, Features, HowItWorks, LandingFooter } from "#/components/landing";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <LandingFooter />
    </div>
  );
}
