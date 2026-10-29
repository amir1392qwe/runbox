"use client";

import Container from "@/components/ui/Container";
import StepsList from "./StepsList";

export default function HowItWorks() {
  return (
    <section className="relative bg-black py-40">
      <Container>
        <div className="mb-24 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            فرآیند کار
          </p>

          <h2 className="text-6xl font-black leading-none">
            چگونه
            <br />
            کار می‌کنیم
          </h2>

          <p className="mt-8 text-lg leading-8 text-neutral-400">
            فرآیندی شفاف و مشارکتی، از اولین گفتگو تا روز راه‌اندازی.
          </p>
        </div>

        <StepsList />
      </Container>
    </section>
  );
}