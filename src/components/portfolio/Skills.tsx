import { motion } from "framer-motion";
import { SectionHeading } from "./primitives";
import { SKILLS, type Skill } from "@/lib/portfolio-data";
import { accentMap } from "./primitives";

function Orb({ skill, index }: { skill: Skill; index: number }) {
  const a = accentMap[skill.accent];
  const Icon = skill.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 120, damping: 14 }}
      whileHover={{ scale: 1.08, y: -6 }}
      className="group relative"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + (index % 4), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        className="glass relative flex flex-col items-center gap-3 rounded-3xl p-6 text-center transition-shadow"
        style={{ boxShadow: "var(--shadow-glass)" }}
      >
        <span
          className="grid size-14 place-items-center rounded-2xl bg-background/40 transition-shadow group-hover:shadow-[var(--glow-blue)]"
          style={{ boxShadow: `0 0 0 1px oklch(0.7 0.06 260 / 0.15)` }}
        >
          <Icon className={`size-6 ${a.text}`} />
        </span>
        <span className="font-display text-sm font-semibold">{skill.name}</span>

        {/* hover detail */}
        <span className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-3 rounded-xl bg-background/80 px-2 py-2 font-mono text-[10px] leading-tight text-muted-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {skill.detail}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <SectionHeading
        eyebrow="Tech Arsenal"
        title="Technology orbs, always in orbit"
        subtitle="Hover any capability to see how it plugs into real automation systems."
      />
      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {SKILLS.map((skill, i) => (
          <Orb key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
