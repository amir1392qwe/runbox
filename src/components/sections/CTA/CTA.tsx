"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "@/components/ui/Container";
import CTAGlow from "./CTAGlow";
import { cta } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!boxRef.current) return;

      gsap.from(boxRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: boxRef }
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050505] py-40"
    >
      <CTAGlow />

      <Container>
        <div
          ref={boxRef}
          className="relative rounded-[40px] border border-white/10 bg-white/[0.03] p-16 text-center backdrop-blur-xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-violet-400">
            تماس با ما
          </p>

          <h2 className="mx-auto max-w-4xl text-6xl font-black leading-tight">
            {cta.title}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-400">
            {cta.description}
          </p>

          <button className="mt-12 rounded-full border border-violet-500/30 px-8 py-4 transition duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,.3)]">
            {cta.button}
          </button>
        </div>
      </Container>
    </section>
  );
}