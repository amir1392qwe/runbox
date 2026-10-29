"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gamesNumberRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !gamesNumberRef.current) return;

      const counter = { value: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(containerRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      }).to(
        counter,
        {
          value: 150,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (gamesNumberRef.current) {
              gamesNumberRef.current.textContent = `${Math.round(
                counter.value
              )}+`;
            }
          },
        },
        "-=0.5"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute bottom-16 right-16 z-20 hidden xl:flex gap-20"
    >
      <div className="text-right">
        <h3 ref={gamesNumberRef} className="text-6xl font-bold">
          0+
        </h3>

        <p className="mt-2 text-xs uppercase tracking-[0.45em] text-neutral-500">
          بازی
        </p>
      </div>

      <div className="text-right">
        <h3 className="text-6xl font-bold">۴K</h3>

        <p className="mt-2 text-xs uppercase tracking-[0.45em] text-neutral-500">
          تجربه
        </p>
      </div>
    </div>
  );
}