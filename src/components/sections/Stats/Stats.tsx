"use client";

import Container from "@/components/ui/Container";
import StatsList from "./StatsList";

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-[#050505] py-24">
      <Container>
        <StatsList />
      </Container>
    </section>
  );
}