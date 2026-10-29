"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import GameIcon from "@/components/icons/GameIcons";
import { games as allGames } from "./data";

const games = allGames.slice(0, 3);

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedGames() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const UNDER_OFFSET = 260;
  const SIDE_OFFSET = 260;
  const ENTER_OFFSET = 420;

  useGSAP(
    () => {
      if (!wrapperRef.current || !pinRef.current) return;

      cardRefs.current.forEach((card, i) => {
        gsap.set(card, { xPercent: -50, yPercent: -50, opacity: i === 0 ? 1 : 0 });
      });

      imageRefs.current.forEach((img) => {
        gsap.set(img, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
      });

      gsap.set(imageRefs.current[0], { y: ENTER_OFFSET, opacity: 0 });

      textRefs.current.forEach((txt) => {
        gsap.set(txt, { xPercent: -50, yPercent: -50, x: 0, y: UNDER_OFFSET, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${wrapperRef.current!.offsetHeight - window.innerHeight}`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      games.forEach((_, i) => {
        const base = i * 4;

        tl.to(imageRefs.current[i], { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, base);

        tl.to(imageRefs.current[i], { x: -SIDE_OFFSET, duration: 1, ease: "power2.inOut" }, base + 1);
        tl.to(textRefs.current[i], { x: SIDE_OFFSET, y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, base + 1);

        tl.to(imageRefs.current[i], { x: 0, duration: 1, ease: "power2.inOut" }, base + 2);
        tl.to(textRefs.current[i], { x: 0, y: UNDER_OFFSET, duration: 1, ease: "power2.inOut" }, base + 2);

        tl.to(cardRefs.current[i], { y: "-=120", opacity: 0, duration: 1, ease: "power2.in" }, base + 3);

        if (i < games.length - 1) {
          tl.set(cardRefs.current[i + 1], { opacity: 1 }, base + 3);
          tl.fromTo(
            imageRefs.current[i + 1],
            { y: ENTER_OFFSET, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
            base + 3
          );
        }
      });
    },
    { scope: wrapperRef }
  );

  const totalUnits = games.length * 4;

  return (
    <div ref={wrapperRef} style={{ height: `${totalUnits * 55}vh` }}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-black">
        {games.map((game, i) => (
          <div
            key={game.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute left-1/2 top-1/2"
          >
            <div
              ref={(el) => { imageRefs.current[i] = el; }}
              className="absolute left-1/2 top-1/2 h-[440px] w-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-neutral-900"
            >
              <GameIcon id={game.icon} className="h-full w-full" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
            </div>

            <div
              ref={(el) => { textRefs.current[i] = el; }}
              className="absolute left-1/2 top-1/2 w-[320px] text-center"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.45em] text-violet-300">{game.category}</p>
              <h3 className="text-4xl font-black leading-tight text-white">{game.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}