import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

interface JobStatsCardsProps {
  jobsFoundToday: number;
  matchesAbove80: number;
  platformsConnected: number;
}

export function JobStatsCards({
  jobsFoundToday,
  matchesAbove80,
  platformsConnected,
}: JobStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard title="Jobs found today" value={jobsFoundToday} />
      <StatCard title="Matches above 80%" value={matchesAbove80} />
      <StatCard title="Platforms connected" value={platformsConnected} />
    </div>
  );
}
