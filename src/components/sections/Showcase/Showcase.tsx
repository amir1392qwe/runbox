"use client";

import Container from "@/components/ui/Container";
import ShowcaseList from "./ShowcaseList";

export default function Showcase() {
  return (
    <section
      id="showcase"
      className="relative overflow-hidden bg-black py-40"
    >
      <Container>
        <div className="mb-24 max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            نمونه‌کارها
          </p>

          <h2 className="text-6xl font-black leading-none">
            پروژه‌های
            <br />
            منتخب
          </h2>

          <p className="mt-8 text-lg leading-8 text-neutral-400">
            گزیده‌ای از تجربه‌های تعاملی که با محوریت حرکت، کارایی و
            روایت‌گری غوطه‌ور طراحی شده‌اند.
          </p>
        </div>

        <ShowcaseList />
      </Container>
    </section>
  );
}