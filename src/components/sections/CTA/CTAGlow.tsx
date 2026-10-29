"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function CTAGlow() {
  const glowOneRef = useRef<HTMLDivElement>(null);
  const glowTwoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!glowOneRef.current || !glowTwoRef.current) return;

    gsap.to(glowOneRef.current, {
      x: 60,
      y: 40,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(glowTwoRef.current, {
      x: -50,
      y: -30,
      duration: 7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    });
  });

  return (
    <>
      <div
        ref={glowOneRef}
        className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]"
      />

      <div
        ref={glowTwoRef}
        className="pointer-events-none absolute right-1/4 bottom-0 h-[350px] w-[350px] translate-x-1/2 rounded-full bg-cyan-500/15 blur-[130px]"
      />
    </>
  );
}