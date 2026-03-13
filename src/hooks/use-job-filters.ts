import { useShallow } from "zustand/react/shallow";
import { useJobFiltersStore } from "#/stores/job-filters-store";
import type { JobFilters } from "#/types/job";

export function useJobFilters(): {
  filters: JobFilters;
  setFilter: <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => void;
  reset: () => void;
} {
  const filters = useJobFiltersStore(
    useShallow((state) => ({
      search: state.search,
      matchScoreMin: state.matchScoreMin,
      location: state.location,
      remote: state.remote,
      platform: state.platform,
    }))
  );
  const setFilter = useJobFiltersStore((state) => state.setFilter);
  const reset = useJobFiltersStore((state) => state.reset);
  return { filters, setFilter, reset };
}
