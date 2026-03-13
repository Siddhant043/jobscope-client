import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/components/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
