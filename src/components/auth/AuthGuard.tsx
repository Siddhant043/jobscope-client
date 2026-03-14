import { useEffect } from "react";
import { Navigate, useRouterState } from "@tanstack/react-router";
import { Loader2Icon } from "lucide-react";
import { useAuthStore } from "#/stores/auth-store";

const REHYDRATE_FALLBACK_MS = 1500;

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const authState = useAuthStore();
  const hasHydrated = authState._hasHydrated;
  const isAuthenticated = Boolean(authState.accessToken);
  const routerState = useRouterState();

  useEffect(() => {
    if (hasHydrated) return;
    const timeoutId = window.setTimeout(() => {
      useAuthStore.getState().setHasHydrated();
    }, REHYDRATE_FALLBACK_MS);
    return () => window.clearTimeout(timeoutId);
  }, [hasHydrated]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2Icon className="size-8 animate-spin text-muted-foreground" aria-hidden />
        <span className="sr-only">Loading</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectTo = routerState.location.href;
    return <Navigate to="/login" search={{ redirect: redirectTo }} />;
  }

  return children;
}

