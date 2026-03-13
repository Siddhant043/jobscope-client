import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "#/stores/auth-store";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "#/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import ThemeToggle from "#/components/ThemeToggle";
import { SearchIcon, BellIcon, LogOutIcon } from "lucide-react";

interface AppNavbarProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export function AppNavbar({
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search jobs...",
}: AppNavbarProps) {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex flex-1 items-center gap-4">
        {onSearchChange ? (
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
        >
          <BellIcon className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative size-8 rounded-full">
              {user ? (
                <Avatar className="size-8">
                  <AvatarImage src={user.avatarUrl ?? undefined} alt="" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name
                      .split(" ")
                      .map((namePart) => namePart[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              ) : null}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user ? (
              <>
                <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
                <div className="px-2 text-xs text-muted-foreground">{user.email}</div>
                <DropdownMenuSeparator />
              </>
            ) : null}
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
              clearSession();
              }}
            >
              <LogOutIcon className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {!user && null}
      </div>
    </header>
  );
}
