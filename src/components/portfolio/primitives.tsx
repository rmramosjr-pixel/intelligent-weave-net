import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ---------- Reveal: staggered scroll entrance ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- TiltCard: 3D hover tilt with glare ---------- */
export function TiltCard({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn("relative [transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}

/* ---------- MagneticButton: pulls toward cursor ---------- */
export function MagneticButton({
  children,
  className,
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  const Comp: any = href ? "a" : "button";

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="inline-block"
    >
      <Comp
        href={href}
        onClick={onClick}
        className={className}
        {...(href ? {} : { type: "button" })}
      >
        {children}
      </Comp>
    </motion.div>
  );
}

/* ---------- SectionHeading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          <span className="size-1.5 animate-pulse-glow rounded-full bg-cyan" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

export const accentMap = {
  blue: { text: "text-blue", bg: "bg-blue", ring: "ring-blue/40", glow: "var(--glow-blue)" },
  purple: { text: "text-purple", bg: "bg-purple", ring: "ring-purple/40", glow: "var(--glow-purple)" },
  cyan: { text: "text-cyan", bg: "bg-cyan", ring: "ring-cyan/40", glow: "var(--glow-cyan)" },
  emerald: { text: "text-emerald", bg: "bg-emerald", ring: "ring-emerald/40", glow: "var(--glow-cyan)" },
} as const;
