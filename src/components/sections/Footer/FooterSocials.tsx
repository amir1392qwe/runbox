"use client";

import { socials } from "./data";

export default function FooterSocials() {
  return (
    <div className="flex gap-6">
      {socials.map((social) => (
        <a
          key={social.title}
          href={social.href}
          className="text-sm uppercase tracking-[0.3em] text-neutral-500 transition-colors duration-300 hover:text-violet-400"
        >
          {social.title}
        </a>
      ))}
    </div>
  );
}
