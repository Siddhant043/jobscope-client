import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Checkbox } from "#/components/ui/checkbox";

export const Route = createFileRoute("/_app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const prefs = {
    emailDigest: true,
    newMatches: true,
    savedJobAlerts: true,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, password, and notifications.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your display name and avatar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Name</Label>
                <Input
                  id="profile-name"
                  defaultValue={user?.name ?? ""}
                  placeholder="Your name"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Your account email address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  type="email"
                  defaultValue={user?.email ?? ""}
                  disabled
                  className="opacity-80"
                />
                <p className="text-xs text-muted-foreground">
                  Contact support to change your email.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update your password.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button>Update password</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center gap-2">
                <Checkbox defaultChecked={prefs.emailDigest} />
                <span className="text-sm">Daily email digest</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox defaultChecked={prefs.newMatches} />
                <span className="text-sm">New high-match jobs</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox defaultChecked={prefs.savedJobAlerts} />
                <span className="text-sm">Saved job updates</span>
              </label>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
