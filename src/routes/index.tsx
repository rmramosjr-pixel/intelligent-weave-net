import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useLenis } from "@/hooks/useLenis";
import { Preloader } from "@/components/portfolio/Preloader";
import { Backdrop } from "@/components/portfolio/Backdrop";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Visualizer } from "@/components/portfolio/Visualizer";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Stats } from "@/components/portfolio/Stats";
import { Services } from "@/components/portfolio/Services";
import { Process } from "@/components/portfolio/Process";
import { Contact } from "@/components/portfolio/Contact";
import { ProjectInquiry } from "@/components/portfolio/ProjectInquiry";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  useLenis();

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Backdrop />
      <CursorGlow />
      <div
        className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Visualizer />
          <Projects />
          <Experience />
          <Stats />
          <Services />
          <Process />
          <Contact />
          <ProjectInquiry />
        </main>
        <Footer />
      </div>
      <Toaster position="bottom-right" theme="dark" />
    </>
  );
}
