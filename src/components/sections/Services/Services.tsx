"use client";

import Container from "@/components/ui/Container";

import ServicesGrid from "./ServicesGrid";

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#050505]"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,.03),transparent_70%)]" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-[#050505]" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-screen flex-col justify-center">

          <div className="mb-24 max-w-3xl">

            <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
              خدمات
            </p>

            <h2 className="text-6xl font-black leading-[0.9] md:text-8xl">
              چه چیزی
              <br />
              می‌سازیم
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
              ما تجربه‌های دیجیتال حرفه‌ای را با حرکت سینمایی، تعاملات
              درجه‌یک و معماری مقیاس‌پذیر برای برندهای مدرن خلق می‌کنیم.
            </p>

          </div>

          <ServicesGrid />

        </div>
      </Container>
    </section>
  );
}