import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SectionHeading } from "./primitives";
import { WORKFLOW_NODES } from "@/lib/portfolio-data";
import { Play, Pause, Zap } from "lucide-react";

export function Visualizer() {
  const [active, setActive] = useState<number>(-1);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % (WORKFLOW_NODES.length + 1));
    }, 1100);
    return () => clearInterval(t);
  }, [playing]);

  const detail = hovered != null ? WORKFLOW_NODES[hovered] : active >= 0 && active < WORKFLOW_NODES.length ? WORKFLOW_NODES[active] : null;

  return (
    <section id="workflow" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Live Workflow Engine"
        title="Watch an automation execute in real time"
        subtitle="Packets of light travel through each step. Hover any node to inspect the problem it solves and the business impact."
      />

      <div className="mx-auto mt-14 max-w-6xl">
        <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-5 sm:p-8">
          {/* toolbar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-destructive/70" />
                <span className="size-2.5 rounded-full bg-chart-5/70" />
                <span className="size-2.5 rounded-full bg-emerald/70" />
              </span>
              <span className="ml-2">lead-to-dashboard.flow</span>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 rounded-lg border border-glass-border bg-background/40 px-3 py-1.5 font-mono text-xs text-foreground transition-colors hover:bg-secondary/60"
            >
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {playing ? "Running" : "Paused"}
            </button>
          </div>

          {/* nodes */}
          <div className="grid gap-3 md:grid-cols-7">
            {WORKFLOW_NODES.map((n, i) => {
              const isActive = active === i;
              const isDone = active > i;
              return (
                <div key={n.id} className="flex items-center gap-3 md:flex-col">
                  <motion.button
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      borderColor: isActive
                        ? "oklch(0.78 0.15 200 / 0.8)"
                        : "oklch(0.7 0.06 260 / 0.2)",
                    }}
                    className="relative w-full rounded-2xl border bg-background/40 p-3 text-left transition-shadow"
                    style={{ boxShadow: isActive ? "var(--glow-cyan)" : "none" }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-md font-mono text-[10px] ${
                          isDone || isActive
                            ? "bg-emerald/20 text-emerald"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="truncate font-display text-xs font-semibold">
                        {n.label}
                      </span>
                    </div>
                    <span className="mt-1 block font-mono text-[10px] text-muted-foreground">
                      {n.tech}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="pulse"
                        className="absolute -right-1 -top-1 flex size-3"
                      >
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-70" />
                        <span className="relative inline-flex size-3 rounded-full bg-cyan" />
                      </motion.span>
                    )}
                  </motion.button>

                  {/* connector with packet */}
                  {i < WORKFLOW_NODES.length - 1 && (
                    <div className="relative h-6 w-px shrink-0 bg-glass-border md:h-px md:w-full">
                      {active === i && (
                        <motion.span
                          className="absolute size-1.5 rounded-full bg-cyan shadow-[var(--glow-cyan)]"
                          initial={{ top: 0, left: 0 }}
                          animate={{
                            top: ["0%", "100%"],
                            left: ["0%", "100%"],
                          }}
                          transition={{ duration: 1, ease: "easeInOut" }}
                          style={{ translateX: "-50%", translateY: "-50%" }}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* inspector */}
          <div className="mt-8 min-h-[120px] rounded-2xl border border-glass-border bg-background/30 p-5">
            <AnimatePresence mode="wait">
              {detail ? (
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 sm:grid-cols-4"
                >
                  {[
                    { k: "Problem", v: detail.problem },
                    { k: "Solution", v: detail.solution },
                    { k: "Technology", v: detail.tech },
                    { k: "Business Impact", v: detail.impact },
                  ].map((f) => (
                    <div key={f.k}>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-cyan">
                        {f.k}
                      </div>
                      <div className="mt-1 text-sm text-foreground/90">{f.v}</div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full items-center justify-center gap-2 py-6 font-mono text-sm text-muted-foreground"
                >
                  <Zap className="size-4 text-emerald" />
                  Workflow idle — hover a node or press play.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
