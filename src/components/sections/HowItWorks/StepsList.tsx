"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { steps } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function StepsList() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const circleFillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!wrapperRef.current || !pinRef.current || !lineFillRef.current)
        return;

      // initial state
      gsap.set(lineFillRef.current, { scaleY: 0 });
      gsap.set(circleFillRefs.current, { scale: 0, opacity: 0 });
      gsap.set(textRefs.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () =>
            `+=${wrapperRef.current!.offsetHeight - window.innerHeight}`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      steps.forEach((_, i) => {
        tl.to(
          lineFillRef.current,
          { scaleY: (i + 1) / steps.length, ease: "none" },
          i
        )
          .to(circleFillRefs.current[i], { scale: 1, opacity: 1 }, i + 0.3)
          .to(numberRefs.current[i], { color: "#ffffff" }, i + 0.3)
          .to(textRefs.current[i], { opacity: 1, y: 0 }, i + 0.4);
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${(steps.length + 1) * 100}vh` }}
    >
      <div
        ref={pinRef}
        className="relative flex h-screen items-center overflow-hidden pt-32 lg:pt-40"
      >
        <div className="relative mx-auto w-full max-w-3xl">
          <div className="absolute right-5 top-0 h-full w-px bg-white/10 lg:right-6" />

          <div
            ref={lineFillRef}
            className="absolute right-5 top-0 h-full w-px origin-top bg-gradient-to-b from-violet-400 to-cyan-400 lg:right-6"
          />

          <div className="flex flex-col gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex gap-6 lg:gap-12">
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#0a0a0a] lg:h-12 lg:w-12">
                  <div
                    ref={(el) => {
                      circleFillRefs.current[index] = el;
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400"
                  />

                  <span
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                    className="relative z-10 text-sm font-bold text-white/70 lg:text-base"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div
                  ref={(el) => {
                    textRefs.current[index] = el;
                  }}
                  className="pt-1"
                >
                  <h3 className="text-xl font-black leading-tight lg:text-2xl">
                    {step.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-base leading-7 text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}