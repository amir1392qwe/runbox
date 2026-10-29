"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import VortexBackground from "@/components/Shader/VortexBackground";
import CreatorAvatar from "@/components/CreatorAvatar";

interface CreatorPreview {
  id: number;
  name: string;
  role: string;
  accent: string;
}

export default function ScrollScene({
  creators = [],
}: {
  creators?: CreatorPreview[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      // چقدر داخل خودِ این بخش اسکرول شده‌ایم (نه کل صفحه)
      const scrolledIntoSection = -rect.top;
      const p = Math.min(
        Math.max(scrolledIntoSection / scrollableDistance, 0),
        1
      );

      setProgress(p);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // 🎥 cinematic mapping
  const heroOpacity = Math.max(1 - progress * 2, 0);
  const heroScale = Math.max(1 - progress * 0.3, 0.9);

  const secondOpacity = Math.min(progress * 3, 1);
  const secondY = Math.max(100 - progress * 200, 0);

  return (
    <div ref={containerRef} className="relative w-full">

      {/* 🌌 GLOBAL BACKGROUND */}
      <div className="fixed inset-0">
        <VortexBackground />
      </div>

      {/* 🎬 HERO SCENE */}
      <section
        className="h-screen flex items-center justify-center px-4 text-white"
        style={{
          opacity: heroOpacity,
          transform: `scale(${heroScale})`,
        }}
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            تیم رانباکس
          </p>

          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            با سازنده‌ها آشنا شوید
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">
            هر بازی رانباکس دست‌ساز آدم‌های واقعیه. با تیم پشت این دنیاها
            آشنا شو.
          </p>

          <div className="mt-10 w-full max-w-sm overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.04] p-6 backdrop-blur-xl">
            {creators.length > 0 ? (
              <div className="flex items-center justify-center -space-x-3 space-x-reverse">
                {creators.map((creator) => (
                  <CreatorAvatar
                    key={creator.id}
                    name={creator.name}
                    accent={creator.accent}
                    className="h-14 w-14 border-2 border-[#050505] text-sm"
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-14 items-center justify-center text-sm text-neutral-500">
                به‌زودی سازنده‌ها معرفی می‌شوند
              </div>
            )}

            <p className="mt-4 text-xs leading-6 text-neutral-500">
              {creators.length > 0
                ? `${creators
                    .slice(0, 2)
                    .map((c) => c.name)
                    .join("، ")}${creators.length > 2 ? " و بقیه‌ی تیم" : ""}`
                : "طراحان، برنامه‌نویسان و هنرمندان استودیو"}
            </p>

            <Link
              href="/creators"
              className="group mt-6 flex items-center justify-center gap-2 rounded-full border border-violet-500/30 py-3 text-sm transition duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_30px_rgba(139,92,246,.25)]"
            >
              مشاهده همه سازنده‌ها
              <ArrowLeft
                size={16}
                className="transition group-hover:-translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* 🌟 NEXT SCENE */}
      <section
        className="h-screen flex items-center justify-center text-white"
        style={{
          opacity: secondOpacity,
          transform: `translateY(${secondY}px)`,
        }}
      >
        <div className="text-center">
          <h2 className="text-5xl font-bold">سریع. مدرن. مقیاس‌پذیر.</h2>
          <p className="opacity-70 mt-4">
            هر تعامل، حسی سینمایی دارد.
          </p>
        </div>
      </section>

    </div>
  );
}