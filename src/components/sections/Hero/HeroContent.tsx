"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import VortexBackground from "@/components/Shader/VortexBackground";

export default function HeroContent() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🎥 zoom based on scroll
  const scale = Math.max(1 - scrollY / 1200, 0.8);
  const opacity = Math.max(1 - scrollY / 600, 0);

  // 🎬 entrance animation, INTVL-style: fade + slide + slight skew
  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        titleRef.current,
        { y: 120, opacity: 0, skewY: 6 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          buttonRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6 },
          "-=0.5"
        );
    },
    { scope: heroRef }
  );

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      style={{
        transform: `scale(${scale})`,
        opacity: opacity,
        transition: "transform 0.1s linear",
      }}
    >
      {/* 🌌 Background */}
      <VortexBackground />

      {/* 🌟 Mouse light orb */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(168,85,247,0.18),transparent_40%)]" />

      {/* ✨ Content */}
      <h1
        ref={titleRef}
        className="relative z-10 text-6xl font-bold"
      >
        رانباکس
      </h1>

      <p
        ref={subtitleRef}
        className="relative z-10 mt-4 text-lg opacity-80"
      >
        بساز. متحرک کن. راه‌اندازی کن.
      </p>

      <button
        ref={buttonRef}
        onClick={() => router.push("/login")}
        className="relative z-10 mt-8 px-6 py-3 bg-white text-black rounded-xl"
      >
        شروع کنید
      </button>
    </div>
  );
}