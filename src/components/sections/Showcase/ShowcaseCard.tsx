"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  title: string;
  category: string;
  image: string;
  reverse?: boolean;
}

export default function ShowcaseCard({
  title,
  category,
  image,
  reverse = false,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(cardRef.current, {
      rotateX: (0.5 - y) * 6,
      rotateY: (x - 0.5) * 6,
      scale: 1.015,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1400,
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  // 🎬 subtle image parallax while scrolling past the card
  useGSAP(
    () => {
      if (!cardRef.current || !imageWrapRef.current) return;

      gsap.set(imageWrapRef.current, { y: -60 });

      gsap.to(imageWrapRef.current, {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: cardRef }
  );

  return (
    <article
      className={`
        grid
        items-center
        gap-12
        lg:grid-cols-2
        ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
      `}
    >
      <div>
        <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
          {category}
        </p>

        <h3 className="text-5xl font-black leading-tight">
          {title}
        </h3>

        <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-400">
          ساخته‌شده با فناوری‌های مدرن، تعاملات روان و تمرکز قوی بر
          روایت‌گری و کارایی.
        </p>

        <button
          className="group/btn relative mt-10 overflow-hidden rounded-full border border-white/15 px-7 py-4 transition-all duration-300 hover:border-violet-400 hover:bg-violet-500/10"
        >
          <span className="relative">
            مشاهده پروژه
            <span
              className="absolute -bottom-1 left-0 h-[1px] w-0 bg-violet-400 transition-all duration-300 group-hover/btn:w-full"
            />
          </span>
        </button>
      </div>

      <div
        data-cursor-hover
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative aspect-[16/10] overflow-hidden rounded-[36px] border border-white/10 bg-neutral-900"
      >
        {/* 🔧 TEMP placeholder — swap this div back for <Image> once you have real photos */}
        <div
          ref={imageWrapRef}
          className="absolute inset-x-0 -top-16 -bottom-16 bg-gradient-to-br from-violet-600/40 via-neutral-800 to-cyan-500/30 transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/10"
        />

        <div
          className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl transition-all duration-700 group-hover:left-[120%]"
        />
      </div>
    </article>
  );
}