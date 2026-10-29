"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Container from "@/components/ui/Container";
import Logo from "./Logo";
import MenuButton from "./MenuButton";

interface NavbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ open, setOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 🎬 navbar entrance
  useGSAP(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 z-50 w-full pointer-events-none pt-6"
    >
      <Container>
        <nav
          className={`
            pointer-events-auto
            flex
            items-center
            justify-between
            mx-auto
            w-full
            rounded-full
            border
            transition-all
            duration-500
            backdrop-blur-xl

            ${
              scrolled
                ? "h-16 px-6 border-white/15 bg-black/60 shadow-lg"
                : "h-20 px-8 border-white/10 bg-black/30"
            }
          `}
        >
          <Logo />

          <div className="flex items-center pr-4 sm:pr-6 lg:pr-8">
            <MenuButton
              open={open}
              onClick={() => setOpen(!open)}
            />
          </div>
        </nav>
      </Container>
    </header>
  );
}