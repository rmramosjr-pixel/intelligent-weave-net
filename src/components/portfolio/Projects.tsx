import { motion } from "framer-motion";
import { SectionHeading, TiltCard, Reveal, accentMap } from "./primitives";
import { PROJECTS } from "@/lib/portfolio-data";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Featured Builds"
        title="Every automation is a product launch"
        subtitle="Real systems shipped for real businesses — each one removing hours of manual work."
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2">
        {PROJECTS.map((p, i) => {
          const a = accentMap[p.accent];
          const featured = i === 0;
          return (
            <Reveal key={p.title} delay={i * 0.08} className={featured ? "lg:col-span-2" : ""}>
              <TiltCard intensity={6} className="group h-full">
                <div className="glass-strong relative h-full overflow-hidden rounded-3xl p-7">
                  {/* accent glow */}
                  <div
                    className={`absolute -right-16 -top-16 size-48 rounded-full blur-[70px] opacity-40 ${a.bg}`}
                  />
                  <div className="relative flex h-full flex-col" style={{ transform: "translateZ(30px)" }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className={`font-mono text-xs uppercase tracking-wider ${a.text}`}>
                          {p.category}
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-bold">{p.title}</h3>
                      </div>
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-glass-border bg-background/40 transition-colors group-hover:bg-secondary/60">
                        <ArrowUpRight className={`size-5 ${a.text}`} />
                      </span>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {p.summary}
                    </p>

                    {/* flow steps */}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {p.steps.map((s, si) => (
                        <div key={s} className="flex items-center gap-2">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: si * 0.06 }}
                            className="rounded-lg border border-glass-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-foreground/90"
                          >
                            {s}
                          </motion.span>
                          {si < p.steps.length - 1 && (
                            <span className={`text-xs ${a.text}`}>→</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center gap-2 rounded-xl border border-glass-border bg-background/30 px-4 py-3">
                        <TrendingUp className={`size-4 ${a.text}`} />
                        <span className="text-sm text-foreground/90">{p.impact}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-secondary/60 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
