import { useEffect, useRef } from "react";

/**
 * Cursor follower + soft glow. Desktop / fine-pointer only.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const loop = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX - 160}px, ${glowY - 160}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden size-80 rounded-full bg-blue/10 blur-[80px] md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[61] hidden size-2 rounded-full bg-cyan mix-blend-screen md:block"
      />
    </>
  );
}
