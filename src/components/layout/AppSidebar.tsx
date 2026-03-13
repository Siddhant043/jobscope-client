import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import { Button } from "#/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "#/components/ui/sheet";
import {
  LayoutDashboard,
  Rss,
  Link2,
  FileText,
  Bookmark,
  Settings,
  Menu,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/job-feed", label: "Job Feed", icon: Rss },
  { to: "/sources", label: "Sources", icon: Link2 },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/saved", label: "Saved Jobs", icon: Bookmark },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1 px-2">
      {navItems.map(({ to, label, icon: Icon }) => {
        const isActive = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col">
        <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
          <Link to="/dashboard" className="font-semibold text-sidebar-foreground">
            JobRadar AI
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <SidebarNav />
        </div>
      </aside>

      {/* Mobile: menu button + sheet */}
      <div className="flex items-center gap-2 md:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b px-4 py-3">
              <SheetTitle>JobRadar AI</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <SidebarNav onNavigate={() => setSheetOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
