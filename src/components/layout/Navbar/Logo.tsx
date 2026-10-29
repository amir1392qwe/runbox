"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="رانباکس، صفحه اصلی"
      className="group relative flex items-center justify-center select-none"
    >
      {/* Glow */}
      <span
        className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Logo */}
      <span
        className="relative z-10 text-2xl font-black tracking-[0.25em] uppercase text-white transition-all duration-300 group-hover:scale-105 group-hover:text-violet-300"
      >
        رانباکس
      </span>
    </Link>
  );
}