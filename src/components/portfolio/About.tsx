import { motion } from "framer-motion";
import { Reveal, SectionHeading, TiltCard } from "./primitives";
import { CheckCircle2, Cpu, Sparkles, Activity } from "lucide-react";

const HIGHLIGHTS = [
  "Production issue investigation",
  "Python automation",
  "SQL troubleshooting",
  "Workflow optimization",
  "Reporting automation",
  "Business process improvement",
  "Technical documentation",
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Command Center"
        title={<>The operator behind the automations</>}
        subtitle="A control room built around one goal — turning repetitive, error-prone work into reliable, self-running systems."
      />

      <div className="mx-auto mt-16 grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_1.1fr]">
        {/* Holographic profile card */}
        <Reveal>
          <TiltCard className="glass-strong glow-border relative overflow-hidden rounded-3xl p-8">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue/20 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent 0 6px, oklch(0.78 0.15 200 / 0.06) 6px 7px)",
              }}
            />
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
              <div className="flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-blue via-purple to-cyan font-display text-2xl font-bold text-primary-foreground shadow-[var(--glow-purple)]">
                  RR
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Redento M. Ramos, Jr.</h3>
                  <p className="font-mono text-xs text-cyan">
                    Automation Engineer · Python Dev
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-glass-border bg-background/30 px-4 py-2.5">
                <span className="size-2 animate-pulse-glow rounded-full bg-emerald" />
                <span className="font-mono text-xs text-muted-foreground">
                  STATUS: <span className="text-emerald">Available for projects</span>
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Activity, k: "Uptime", v: "99.9%" },
                  { icon: Cpu, k: "Systems", v: "20+" },
                  { icon: Sparkles, k: "AI Agents", v: "12+" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-xl border border-glass-border bg-background/20 p-3 text-center"
                  >
                    <s.icon className="mx-auto size-4 text-cyan" />
                    <div className="mt-1.5 font-display text-lg font-bold">{s.v}</div>
                    <div className="font-mono text-[10px] uppercase text-muted-foreground">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>

        {/* Current role + highlights */}
        <div className="space-y-6">
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold">
                  Application Support Specialist
                </h3>
                <span className="rounded-full bg-emerald/15 px-3 py-1 font-mono text-xs text-emerald">
                  2021 — Present
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Orchid Cybertech Services Inc.
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {HIGHLIGHTS.map((h, i) => (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-cyan" />
                    {h}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass rounded-3xl p-7">
              <p className="text-base leading-relaxed text-muted-foreground">
                I bridge <span className="text-foreground">engineering and operations</span> —
                translating messy manual processes into resilient, observable automations.
                From SQL diagnostics to AI-powered agents, I build systems that quietly do
                the work so teams can focus on what matters.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
