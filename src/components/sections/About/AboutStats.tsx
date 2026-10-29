"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const stats = [
  {
    value: "۱۲۰+",
    label: "پروژه‌ی تکمیل‌شده",
  },
  {
    value: "۳۵+",
    label: "مشتری راضی",
  },
  {
    value: "۶",
    label: "سال تجربه",
  },
  {
    value: "٪۹۹",
    label: "رضایت مشتریان",
  },
];

export default function AboutStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="grid gap-6 sm:grid-cols-2"
    >
      {stats.map((item) => (
        <div
          key={item.label}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-[0_25px_70px_rgba(139,92,246,.18)]"
        >
          {/* Glow */}
          <div
            className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Border Gradient */}
          <div
            className="absolute inset-0 rounded-3xl border border-violet-400/0 transition-all duration-500 group-hover:border-violet-400/30"
          />

          <div className="relative z-10">
            <h3
              className="text-5xl font-black text-white"
            >
              {item.value}
            </h3>

            <p
              className="mt-3 text-sm uppercase tracking-[0.25em] text-neutral-400"
            >
              {item.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}