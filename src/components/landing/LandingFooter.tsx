import { Link } from "@tanstack/react-router";

const footerLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
  {
    label: "GitHub",
    href: "https://github.com",
    external: true,
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobRadar AI. All rights reserved.
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map(({ label, href, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
