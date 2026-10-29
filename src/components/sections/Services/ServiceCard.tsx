"use client";

import { useRef } from "react";
import gsap from "gsap";

interface Props {
  index: number;
  title: string;
  description: string;
  accent: string;
}

export default function ServiceCard({
  index,
  title,
  description,
  accent,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    gsap.to(cardRef.current, {
      rotateX: (0.5 - y) * 10,
      rotateY: (x - 0.5) * 10,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
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
      style={{
        transformStyle: "preserve-3d",
      }}
      className="service-card group relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_30px_100px_rgba(0,0,0,.45)]"
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
      />

      {/* Top Number */}
      <div className="relative z-10 mb-10 text-7xl font-black text-white/10 transition-all duration-500 group-hover:text-white/20">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div
        className="relative z-10"
        style={{
          transform: "translateZ(40px)",
        }}
      >
        <h3 className="text-3xl font-bold tracking-tight">
          {title}
        </h3>

        <p className="mt-6 text-lg leading-8 text-neutral-400">
          {description}
        </p>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

      {/* Corner Glow */}
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/20 blur-[90px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Border Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/5 transition-all duration-500 group-hover:ring-violet-400/30" />
    </article>
  );
}