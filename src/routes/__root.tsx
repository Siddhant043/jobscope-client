import type React from "react";
import { Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "#/lib/query-client";
import "../styles.css";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">404 - Not found</h1>
        <p className="text-muted-foreground">
          The page you&apos;re looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}
