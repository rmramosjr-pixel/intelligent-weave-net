import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "./primitives";
import { EXPERIENCE } from "@/lib/portfolio-data";
import { ChevronDown, Briefcase } from "lucide-react";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Career Path"
        title="A glowing path of checkpoints"
        subtitle="Click any checkpoint to expand the responsibilities behind the role."
      />

      <div className="mx-auto mt-16 max-w-3xl">
        <div className="relative pl-10">
          {/* vertical glowing line */}
          <div className="absolute left-[14px] top-2 bottom-2 w-px bg-gradient-to-b from-blue via-purple to-cyan opacity-60" />

          {EXPERIENCE.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative mb-4"
              >
                {/* node */}
                <span className="absolute -left-[38px] top-4 grid size-7 place-items-center rounded-full border border-glass-border bg-background">
                  <motion.span
                    animate={item.current ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`size-2.5 rounded-full ${item.current ? "bg-emerald shadow-[var(--glow-cyan)]" : "bg-blue"}`}
                  />
                </span>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="glass flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left transition-colors hover:bg-secondary/40"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-bold">{item.role}</h3>
                      {item.current && (
                        <span className="rounded-full bg-emerald/15 px-2 py-0.5 font-mono text-[10px] text-emerald">
                          NOW
                        </span>
                      )}
                    </div>
                    {item.company && (
                      <p className="mt-0.5 text-sm text-muted-foreground">{item.company}</p>
                    )}
                    <p className="mt-0.5 font-mono text-xs text-cyan">{item.period}</p>
                  </div>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-2 grid gap-2 rounded-2xl border border-glass-border bg-background/20 p-5">
                        {item.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-sm text-foreground/90">
                            <Briefcase className="mt-0.5 size-3.5 shrink-0 text-cyan" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
