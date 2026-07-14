import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { NAV } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Menu, X, Terminal } from "lucide-react";

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass-strong" : "border border-transparent"
        )}
      >
        <a href="#home" className="flex items-center gap-2.5 font-display font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-blue to-purple text-primary-foreground">
            <Terminal className="size-4" />
          </span>
          <span className="text-sm tracking-tight">
            Redentor<span className="text-cyan">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-xl bg-gradient-to-r from-blue to-purple px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--glow-blue)] transition-transform hover:scale-105 md:inline-block"
        >
          Let's talk
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="grid size-9 place-items-center rounded-lg border border-glass-border bg-glass text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-x-4 top-20 glass-strong rounded-2xl p-3 md:hidden"
        >
          <ul className="grid gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
