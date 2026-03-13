import { create } from "zustand";
import { persist } from "zustand/middleware";

const SAVED_JOBS_STORAGE_KEY = "jobradar-saved-jobs";

interface SavedJobsState {
  savedIds: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}

export const useSavedJobsStore = create<SavedJobsState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      add: (id) =>
        set((state) =>
          state.savedIds.includes(id)
            ? state
            : { savedIds: [...state.savedIds, id] }
        ),
      remove: (id) =>
        set((state) => ({
          savedIds: state.savedIds.filter((s) => s !== id),
        })),
      has: (id) => get().savedIds.includes(id),
      toggle: (id) => {
        const { has, add, remove } = get();
        if (has(id)) remove(id);
        else add(id);
      },
    }),
    { name: SAVED_JOBS_STORAGE_KEY }
  )
);
