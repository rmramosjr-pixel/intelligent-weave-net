import { motion } from "framer-motion";
import { SectionHeading, Reveal } from "./primitives";
import { SERVICES } from "@/lib/portfolio-data";

export function Services() {
  return (
    <section id="services" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Capabilities"
        title="Services engineered for scale"
        subtitle="From a single script to a fully orchestrated operation — here's how I can help."
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.06}>
            <motion.div
              whileHover={{ y: -6 }}
              className="group glass relative h-full overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-0 spotlight opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <span className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-blue/20 to-purple/20 transition-shadow group-hover:shadow-[var(--glow-blue)]">
                  <s.icon className="size-5 text-cyan" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
