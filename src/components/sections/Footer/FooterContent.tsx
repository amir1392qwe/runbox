"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FooterSocials from "./FooterSocials";
import { footerLinks } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function FooterContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="py-24">
      <div className="flex flex-col items-start justify-between gap-16 lg:flex-row lg:items-center">
        <div>
          <span className="text-2xl font-black uppercase tracking-[0.25em] text-white">
            رانباکس
          </span>

          <p className="mt-4 max-w-xs text-sm leading-7 text-neutral-500">
            بساز. متحرک کن. راه‌اندازی کن. تجربه‌های دیجیتال حرفه‌ای که با
            حرکت و دقت خلق می‌شوند.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-4">
          {footerLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm uppercase tracking-[0.3em] text-neutral-400 transition-colors duration-300 hover:text-white"
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-16 flex flex-col-reverse items-start justify-between gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-center">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-600">
          © {new Date().getFullYear()} رانباکس. تمامی حقوق محفوظ است.
        </p>

        <FooterSocials />
      </div>
    </div>
  );
}