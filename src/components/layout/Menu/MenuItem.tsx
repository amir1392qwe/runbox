"use client";

import Link from "next/link";

interface MenuItemProps {
  title: string;
  href: string;
  onNavigate?: () => void;
}

export default function MenuItem({
  title,
  href,
  onNavigate,
}: MenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-center justify-between border-b border-white/10 py-4 transition-all duration-300 hover:pl-6"
    >
      <span className="text-2xl font-semibold transition group-hover:text-violet-400 lg:text-3xl">
        {title}
      </span>

      <span className="text-neutral-500 transition group-hover:-translate-x-2">
        ←
      </span>
    </Link>
  );
}