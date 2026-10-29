"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";

interface MenuButtonProps {
  open: boolean;
  onClick: () => void;
}

export default function MenuButton({
  open,
  onClick,
}: MenuButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="باز و بسته کردن منو"
      aria-expanded={open}
      className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-2xl transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] active:scale-95"
    >
      {/* Glow */}
      <span
        className="absolute inset-0 rounded-full bg-violet-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Label */}
      <span
        className="relative z-10 text-xs font-medium uppercase tracking-[0.35em] transition-colors duration-300 group-hover:text-violet-300"
      >
        {open ? "بستن" : "منو"}
      </span>

      {/* Icon */}
      <span
        className="relative z-10 transition-transform duration-300 group-hover:rotate-90"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </span>
    </button>
  );
}