import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "#/components/layout";
import { AuthGuard } from "#/components/auth/AuthGuard";

export const Route = createFileRoute("/_app")({
  component: AppLayoutPage,
});

function AppLayoutPage() {
  return (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  );
}
