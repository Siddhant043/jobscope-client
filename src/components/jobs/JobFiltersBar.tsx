import type { JobFilters as JobFiltersType } from "#/types/job";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Button } from "#/components/ui/button";

const PLATFORMS = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "wellfound", label: "Wellfound" },
  { value: "yc-jobs", label: "YC Jobs" },
  { value: "remotive", label: "Remotive" },
] as const;

interface JobFiltersBarProps {
  filters: JobFiltersType;
  onFilterChange: <K extends keyof JobFiltersType>(
    key: K,
    value: JobFiltersType[K]
  ) => void;
  onReset: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function JobFiltersBar({
  filters,
  onFilterChange,
  onReset,
  searchValue,
  onSearchChange,
}: JobFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
      {onSearchChange != null && (
        <div className="min-w-[200px] flex-1 space-y-1.5">
          <Label htmlFor="job-search" className="sr-only">
            Search
          </Label>
          <Input
            id="job-search"
            placeholder="Search jobs..."
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
      <div className="space-y-1.5">
        <Label>Match score (min)</Label>
        <Select
          value={filters.matchScoreMin?.toString() ?? "any"}
          onValueChange={(v) =>
            onFilterChange("matchScoreMin", v === "any" ? undefined : Number(v))
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="60">60%+</SelectItem>
            <SelectItem value="75">75%+</SelectItem>
            <SelectItem value="90">90%+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Remote</Label>
        <Select
          value={
            filters.remote === true
              ? "yes"
              : filters.remote === false
                ? "no"
                : "any"
          }
          onValueChange={(v) =>
            onFilterChange(
              "remote",
              v === "any" ? undefined : v === "yes"
            )
          }
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="yes">Remote</SelectItem>
            <SelectItem value="no">On-site</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>Platform</Label>
        <Select
          value={filters.platform ?? "any"}
          onValueChange={(v) =>
            onFilterChange("platform", v === "any" ? undefined : (v as JobFiltersType["platform"]))
          }
        >
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {PLATFORMS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
