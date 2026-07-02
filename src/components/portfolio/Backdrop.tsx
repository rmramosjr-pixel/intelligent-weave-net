import { motion } from "framer-motion";

/**
 * Multi-layer animated background: grid, gradient blobs, floating particles,
 * blur lights and noise. Fixed behind all content, pointer-events none.
 */
export function Backdrop() {
  const particles = Array.from({ length: 26 });

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background noise">
      {/* Layer 1: animated grid */}
      <div className="absolute inset-0 grid-bg animate-grid-pan opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      {/* Layer 2: gradient blobs */}
      <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-blue/20 blur-[120px] animate-aurora" />
      <div
        className="absolute -right-40 top-1/4 size-[560px] rounded-full bg-purple/20 blur-[130px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 size-[520px] rounded-full bg-cyan/15 blur-[130px] animate-aurora"
        style={{ animationDelay: "-11s" }}
      />

      {/* Layer 3: floating particles */}
      {particles.map((_, i) => {
        const size = 1 + (i % 3);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const dur = 8 + (i % 6);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan/60"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        );
      })}

      {/* Layer 4: top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/60 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,oklch(0.1_0.02_265/0.6))]" />
    </div>
  );
}
