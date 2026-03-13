import { Navigate, useRouterState } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const authState = useAuthStore();
  const isAuthenticated = Boolean(authState.accessToken);
  const routerState = useRouterState();

  if (!isAuthenticated) {
    const redirectTo = routerState.location.href;
    return <Navigate to="/login" search={{ redirect: redirectTo }} />;
  }

  return children;
}

