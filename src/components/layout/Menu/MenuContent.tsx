"use client";

import { useRef } from "react";
import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Container from "@/components/ui/Container";

import MenuFooter from "./MenuFooter";
import MenuItem from "./MenuItem";
import { menuItems } from "./menu.data";

interface MenuContentProps {
  open: boolean;
  onNavigate?: () => void;
}

export default function MenuContent({ open, onNavigate }: MenuContentProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!listRef.current) return;

      if (open) {
        gsap.fromTo(
          listRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      } else {
        gsap.set(listRef.current.children, { y: 60, opacity: 0 });
      }
    },
    { dependencies: [open] }
  );

  return (
    <Container className="flex h-full items-center">
      <div ref={listRef} className="mt-24 w-full lg:mt-32">
        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            href={item.href}
            onNavigate={onNavigate}
          />
        ))}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            onClick={onNavigate}
            className="inline-flex items-center gap-3 rounded-full border border-violet-500/30 px-7 py-3 text-sm text-white transition duration-300 hover:bg-violet-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,.3)]"
          >
            <LogIn size={16} />
            ورود
          </Link>

          <Link
            href="/login"
            onClick={onNavigate}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-3 text-sm text-white transition duration-300 hover:border-cyan-400 hover:bg-cyan-500/10"
          >
            <UserPlus size={16} />
            ثبت‌نام
          </Link>
        </div>

        <MenuFooter />
      </div>
    </Container>
  );
}