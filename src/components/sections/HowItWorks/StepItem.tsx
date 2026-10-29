"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  index: number;
  title: string;
  description: string;
}

export default function StepItem({ index, title, description }: Props) {
  const circleRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!circleRef.current || !fillRef.current || !numberRef.current) return;

      gsap.to(fillRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: circleRef.current,
          start: "center 60%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(numberRef.current, {
        color: "#ffffff",
        duration: 0.4,
        scrollTrigger: {
          trigger: circleRef.current,
          start: "center 60%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: circleRef }
  );

  return (
    <div className="relative flex gap-8 py-10 lg:gap-16">
      <div
        ref={circleRef}
        className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#0a0a0a] lg:h-20 lg:w-20"
      >
        <div
          ref={fillRef}
          className="absolute inset-0 scale-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 opacity-0"
        />

        <span
          ref={numberRef}
          className="relative z-10 text-xl font-bold text-white/70 lg:text-2xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="pt-2">
        <h3 className="text-3xl font-black leading-tight lg:text-4xl">
          {title}
        </h3>

        <p className="mt-4 max-w-xl text-lg leading-8 text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  );
}