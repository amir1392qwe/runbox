"use client";

import Container from "@/components/ui/Container";

import AboutContent from "./AboutContent";
import AboutStats from "./AboutStats";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#050505] py-40"
    >
      {/* Background Glow */}
      <div
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[220px]"
      />

      <Container>
        <div
          className="relative z-10 grid gap-20 lg:grid-cols-2 lg:items-center"
        >
          <AboutContent />

          <AboutStats />
        </div>
      </Container>
    </section>
    
  );
}