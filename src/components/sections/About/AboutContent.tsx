"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function AboutContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(badgeRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.from(
        titleRef.current,
        {
          y: 70,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
        },
        "-=0.3"
      );

      tl.from(
        descRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.45"
      );

      tl.from(
        buttonRef.current,
        {
          y: 25,
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
        "-=0.35"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative z-10 max-w-2xl"
    >
      <p
        ref={badgeRef}
        className="mb-6 text-sm font-medium uppercase tracking-[0.45em] text-violet-400"
      >
        About Runbox
      </p>

      <h2
        ref={titleRef}
        className="text-5xl font-black uppercase leading-[0.9] md:text-6xl xl:text-7xl"
      >
        WE BUILD
        <br />
        DIGITAL
        <br />
        EXPERIENCES
      </h2>

      <p
        ref={descRef}
        className="mt-8 max-w-xl text-lg leading-8 text-neutral-400"
      >
        Runbox is a creative digital studio focused on crafting immersive
        experiences, interactive websites, and next-generation interfaces.
        Every project is designed with performance, storytelling, and motion
        at its core.
      </p>

      <button
        ref={buttonRef}
        className="group relative mt-12 overflow-hidden rounded-full border border-violet-500/30 px-8 py-4 font-semibold transition-all duration-500 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,.35)]"
      >
        <span className="relative z-10">
          Learn More
        </span>

        <span
          className="absolute inset-0 scale-x-0 origin-left bg-violet-500/20 transition-transform duration-500 group-hover:scale-x-100"
        />
      </button>
    </div>
  );
}