import { create } from "zustand";
import type { JobFilters } from "#/types/job";

interface JobFiltersState extends JobFilters {
  setFilter: <K extends keyof JobFilters>(key: K, value: JobFilters[K]) => void;
  reset: () => void;
}

const initialFilters: JobFilters = {
  search: "",
  matchScoreMin: undefined,
  location: undefined,
  remote: undefined,
  platform: undefined,
};

export const useJobFiltersStore = create<JobFiltersState>((set) => ({
  ...initialFilters,
  setFilter: (key, value) => set((state) => ({ ...state, [key]: value })),
  reset: () => set(initialFilters),
}));
