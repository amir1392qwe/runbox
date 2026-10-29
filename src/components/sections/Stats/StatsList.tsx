"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import StatItem from "./StatItem";
import { stats } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function StatsList() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-8"
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.id}
          value={stat.value}
          decimals={stat.decimals}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
}