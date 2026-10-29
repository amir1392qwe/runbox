"use client";

import { useRef } from "react";
import gsap from "gsap";

import GameIcon, { type GameIconId } from "@/components/icons/GameIcons";

interface Props {
  title: string;
  category: string;
  icon: GameIconId;
}

export default function FeaturedGameCard({
  title,
  category,
  icon,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
      transformOrigin: "center",
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

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      style={{ transformStyle: "preserve-3d" }}
      className="group relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900"
    >
      {/* Icon Art */}
      <GameIcon
        id={icon}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"
      />

      {/* Top Glow */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-400/10"
      />

      {/* Shine */}
      <div
        className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/10 blur-2xl transition-all duration-700 group-hover:left-[120%]"
      />

      {/* Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] border border-violet-400/0 transition-all duration-500 group-hover:border-violet-400/40"
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 z-10 w-full p-8"
        style={{
          transform: "translateZ(50px)",
        }}
      >
        <p
          className="mb-3 text-xs font-medium uppercase tracking-[0.45em] text-violet-300"
        >
          {category}
        </p>

        <h3
          className="text-3xl font-black leading-tight text-white"
        >
          {title}
        </h3>

        <div
          className="mt-4 h-[2px] w-0 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-500 ease-out group-hover:w-16"
        />
      </div>

      {/* Bottom Glow */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[90px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </article>
  );
}