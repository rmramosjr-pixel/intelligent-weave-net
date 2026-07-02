import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LINES = [
  "INITIALIZING...",
  "Loading AI Modules...",
  "Connecting Workflows...",
  "Loading Python Engine...",
  "Loading Automation Projects...",
  "Access Granted.",
];

/* Small AI network animation shown during boot */
function BootNetwork() {
  const nodes = [
    { x: 50, y: 20 },
    { x: 20, y: 50 },
    { x: 80, y: 45 },
    { x: 35, y: 82 },
    { x: 72, y: 80 },
    { x: 50, y: 52 },
  ];
  const edges = [
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
    [0, 2],
    [1, 3],
  ];
  return (
    <svg viewBox="0 0 100 100" className="size-40 sm:size-48">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="oklch(0.66 0.2 258)"
          strokeWidth={0.6}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.1 * i }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 5 ? 3.2 : 2.2}
          fill="oklch(0.78 0.15 200)"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.5, delay: 0.12 * i }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  );
}

export function Preloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState(0);

  useEffect(() => {
    if (line >= LINES.length - 1) {
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 700);
      }, 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLine((l) => l + 1), 480);
    return () => clearTimeout(t);
  }, [line, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          <BootNetwork />
          <div className="mt-8 h-6 font-mono text-sm text-cyan sm:text-base">
            <AnimatePresence mode="wait">
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-muted-foreground">&gt;</span>{" "}
                {LINES[line]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-6 h-1 w-56 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue via-cyan to-emerald"
              initial={{ width: "0%" }}
              animate={{ width: `${((line + 1) / LINES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
