import { Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-glass-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-blue to-purple text-primary-foreground">
            <Terminal className="size-4" />
          </span>
          <span className="font-display text-sm font-semibold">
            Redento M. Ramos, Jr.
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} · Building intelligent automations.
        </p>
      </div>
    </footer>
  );
}
