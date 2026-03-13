import type React from "react";
import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";
import { apiRequest } from "#/lib/api-client";
import type { LoginRequestBody, LoginResponseBody } from "#/types/api";
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

export function LoginForm() {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startAuthenticating();
    setAuthError(null);
    try {
      const body: LoginRequestBody = { email, password };
      const response = await apiRequest<LoginResponseBody, LoginRequestBody>({
        path: "/auth/login",
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
        refreshToken: response.refreshToken,
        isAuthenticating: false,
        authError: null,
      });

      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect");

      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        router.navigate({ to: "/dashboard" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setAuthError(errorMessage);
      toast.error(errorMessage);
    } finally {
      finishAuthenticating();
    }
  }

  return (
    <Card className="w-full max-w-md border-border">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your email and password to continue.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
          <Button type="button" variant="outline" className="w-full">
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
