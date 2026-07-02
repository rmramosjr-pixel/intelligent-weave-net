import { motion } from "framer-motion";
import { SectionHeading } from "./primitives";
import { PROCESS, TECH_STACK } from "@/lib/portfolio-data";

export function Process() {
  return (
    <section className="relative px-6 py-28">
      <SectionHeading
        eyebrow="How I Work"
        title="An animated journey to automation"
        subtitle="Every engagement follows a clear, glowing path from problem to optimized system."
      />

      <div className="mx-auto mt-16 max-w-6xl">
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative flex-1"
            >
              <div className="glass h-full rounded-2xl p-5">
                <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue to-purple font-mono text-xs font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-sm font-bold">{p.step}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              </div>
              {i < PROCESS.length - 1 && (
                <span className="hidden text-cyan lg:absolute lg:-right-2 lg:top-1/2 lg:z-10 lg:block lg:-translate-y-1/2">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Tech stack chips */}
        <div className="mt-20 text-center">
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Powered by
          </h3>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 150 }}
                whileHover={{ y: -4, scale: 1.06 }}
                animate={{ y: [0, i % 2 === 0 ? -5 : 5, 0] }}
                className="glass rounded-full px-4 py-2 font-mono text-sm text-foreground/90"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
