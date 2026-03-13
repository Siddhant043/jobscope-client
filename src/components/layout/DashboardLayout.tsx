import { Outlet } from "@tanstack/react-router";
import { useJobFiltersStore } from "#/stores/job-filters-store";
import { AppSidebar } from "./AppSidebar";
import { AppNavbar } from "./AppNavbar";

export function DashboardLayout() {
  const search = useJobFiltersStore((s) => s.search);
  const setFilter = useJobFiltersStore((s) => s.setFilter);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AppSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <AppNavbar
          searchValue={search ?? ""}
          onSearchChange={(value) => setFilter("search", value || undefined)}
          searchPlaceholder="Search jobs..."
        />
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
