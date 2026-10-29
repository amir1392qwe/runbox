import gsap from "gsap";
import { DURATION, EASE } from ".";

export const openMenu = (
  overlay: HTMLElement,
  items: HTMLElement[]
) => {
  const tl = gsap.timeline();

  tl.set(overlay, {
    display: "block",
  });

  tl.fromTo(
    overlay,
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      duration: DURATION.hero,
      ease: EASE.menu,
    }
  );

  tl.from(
    items,
    {
      opacity: 0,
      y: 80,
      stagger: 0.08,
      duration: DURATION.normal,
      ease: EASE.smooth,
    },
    "-=0.6"
  );
};

export const closeMenu = (overlay: HTMLElement) => {
  gsap.to(overlay, {
    yPercent: 100,
    duration: 1,
    ease: EASE.menu,
  });
};