"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { CURSOR } from "./constants";
import type { CursorRefs } from "./types";

const HOVER_SELECTOR = "a, button, input, textarea, [data-cursor-hover]";

export default function useCursorGSAP() {
  const refs = useRef<CursorRefs>({
    dot: null,
    ring: null,
    label: null,
  });

  useGSAP(() => {
    const { dot } = refs.current;

    if (!dot) return;

    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
    });

    const move = (e: MouseEvent) => {
  gsap.set(dot, {
    x: e.clientX,
    y: e.clientY,
  });
};

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(HOVER_SELECTOR)) {
        gsap.to(dot, {
          scale: CURSOR.HOVER_SCALE,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(HOVER_SELECTOR)) {
        gsap.to(dot, {
          scale: 1,
          duration: 0.35,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  });

  return refs;
}