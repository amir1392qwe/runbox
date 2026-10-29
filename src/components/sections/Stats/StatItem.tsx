"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
}

export default function StatItem({ value, decimals, suffix, label }: Props) {
  const numberRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!numberRef.current) return;

    const counter = { value: 0 };

    gsap.to(counter, {
      value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numberRef.current,
        start: "top 85%",
        toggleActions: "restart none restart none",
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = counter.value.toFixed(decimals);
        }
      },
      onStart: () => {
        counter.value = 0;
      },
    });
  }, []);

  return (
    <div className="text-center lg:text-left">
      <h3 className="text-6xl font-black leading-none lg:text-7xl">
        <span ref={numberRef}>0</span>
        <span className="text-violet-400">{suffix}</span>
      </h3>

      <p className="mt-4 text-xs uppercase tracking-[0.4em] text-neutral-500">
        {label}
      </p>
    </div>
  );
}