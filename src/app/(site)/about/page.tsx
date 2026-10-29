import type { Metadata } from "next";

import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "درباره من",
  description: "درباره‌ی سازنده‌ی رانباکس",
};

export default function AboutPage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050505] pb-24 pt-40">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <Container className="relative z-10 text-center">
        <p className="mx-auto max-w-3xl text-3xl font-black leading-[1.8] text-white md:text-5xl">
          من این رو خودم از اول ساختم برای انجام میدم
        </p>
      </Container>
    </section>
  );
}
