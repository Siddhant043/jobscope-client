import type React from "react";
import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";
import { apiRequest } from "#/lib/api-client";
import type { RegisterRequestBody, RegisterResponseBody } from "#/types/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { toast } from "sonner";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setSession = useAuthStore((state) => state.setSession);
  const setAuthError = useAuthStore((state) => state.setAuthError);
  const startAuthenticating = useAuthStore(
    (state) => state.startAuthenticating,
  );
  const finishAuthenticating = useAuthStore(
    (state) => state.finishAuthenticating,
  );

  const authError = useAuthStore((state) => state.authError);
  const isEmailAlreadyRegistered =
    authError?.toLowerCase().includes("already registered") ?? false;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startAuthenticating();
    setAuthError(null);
    try {
      const body: RegisterRequestBody = { email, password };
      const response = await apiRequest<
        RegisterResponseBody,
        RegisterRequestBody
      >({
        path: "/auth/register",
        method: "POST",
        body,
        withAuth: false,
      });
      setSession({
        user: {
          id: response.user.id,
          email: response.user.email,
          name: response.user.email,
          avatarUrl: null,
        },
        accessToken: response.token,
        refreshToken: null,
        isAuthenticating: false,
        authError: null,
      });

      router.navigate({ to: "/dashboard" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Sign up failed";
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      finishAuthenticating();
    }
  }

  return (
    <Card className="w-full max-w-md border-border">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Enter your email and password to get started.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 mb-4">
          {authError ? (
            <div
              role="alert"
              className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {isEmailAlreadyRegistered
                ? "This email is already registered. Try signing in or use a different email."
                : authError}
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (authError) setAuthError(null);
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (authError) setAuthError(null);
              }}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
