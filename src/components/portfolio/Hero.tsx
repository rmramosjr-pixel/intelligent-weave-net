import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { ArrowRight, Download, MousePointerClick } from "lucide-react";
import { MagneticButton } from "./primitives";

const NODES = [
  { id: "python", label: "Python", x: 50, y: 12, accent: "oklch(0.66 0.2 258)" },
  { id: "api", label: "API", x: 22, y: 30, accent: "oklch(0.78 0.15 200)" },
  { id: "zapier", label: "Zapier", x: 78, y: 30, accent: "oklch(0.75 0.16 165)" },
  { id: "make", label: "Make.com", x: 15, y: 55, accent: "oklch(0.64 0.24 300)" },
  { id: "sheets", label: "Sheets", x: 85, y: 55, accent: "oklch(0.75 0.16 165)" },
  { id: "openai", label: "OpenAI", x: 50, y: 50, accent: "oklch(0.78 0.15 200)" },
  { id: "slack", label: "Slack", x: 28, y: 78, accent: "oklch(0.64 0.24 300)" },
  { id: "crm", label: "CRM", x: 72, y: 78, accent: "oklch(0.66 0.2 258)" },
  { id: "dash", label: "Dashboard", x: 50, y: 90, accent: "oklch(0.78 0.15 200)" },
];

const EDGES: [string, string][] = [
  ["python", "api"],
  ["python", "zapier"],
  ["api", "make"],
  ["api", "openai"],
  ["zapier", "sheets"],
  ["zapier", "openai"],
  ["openai", "slack"],
  ["openai", "crm"],
  ["make", "slack"],
  ["sheets", "crm"],
  ["slack", "dash"],
  ["crm", "dash"],
];

function node(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16"
      onMouseMove={handleMove}
      ref={wrapRef}
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan"
          >
            <span className="size-1.5 animate-pulse-glow rounded-full bg-emerald" />
            Automation Engineer · AI Workflow Architect
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
          >
            <span className="text-gradient">Building Intelligent</span>
            <br />
            <span className="text-foreground">Business Automation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mx-auto mt-6 max-w-xl font-mono text-sm text-muted-foreground sm:text-base lg:mx-0"
          >
            Python • AI • Zapier • Make.com • APIs • SQL
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mx-auto mt-3 max-w-xl text-base text-muted-foreground/90 lg:mx-0"
          >
            I design intelligent automations that eliminate repetitive work —
            helping businesses automate CRM, reporting, APIs, AI agents and operations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue to-purple px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-blue)] transition-transform"
            >
              Explore My Work
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/60"
            >
              <Download className="size-4" />
              Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        {/* Network */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
          className="relative mx-auto aspect-square w-full max-w-[520px] [transform-style:preserve-3d]"
        >
          <div className="absolute inset-8 rounded-full bg-blue/10 blur-[80px]" />
          <svg viewBox="0 0 100 100" className="relative size-full overflow-visible">
            {/* Edges */}
            {EDGES.map(([a, b], i) => {
              const na = node(a);
              const nb = node(b);
              return (
                <g key={i}>
                  <line
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="oklch(0.7 0.06 260 / 0.25)"
                    strokeWidth={0.35}
                  />
                  <line
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="oklch(0.78 0.15 200 / 0.5)"
                    strokeWidth={0.5}
                    strokeDasharray="2 6"
                    style={{ animation: `dash-flow ${6 + (i % 4)}s linear infinite` }}
                  />
                  {/* data packet */}
                  <motion.circle
                    r={0.9}
                    fill="oklch(0.85 0.14 195)"
                    animate={{ offsetDistance: ["0%", "100%"] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                    style={{
                      offsetPath: `path("M ${na.x} ${na.y} L ${nb.x} ${nb.y}")`,
                    }}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n, i) => (
              <g key={n.id} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={3.4}
                  fill={n.accent}
                  animate={{ scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px`, filter: "drop-shadow(0 0 3px currentColor)" }}
                />
                <circle cx={n.x} cy={n.y} r={1.4} fill="oklch(0.98 0.01 250)" />
                <text
                  x={n.x}
                  y={n.y - 5}
                  textAnchor="middle"
                  fill="oklch(0.9 0.02 250)"
                  style={{ fontSize: 2.6, fontFamily: "var(--font-mono)" }}
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-glass-border p-1">
          <motion.span
            className="size-1.5 rounded-full bg-cyan"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
