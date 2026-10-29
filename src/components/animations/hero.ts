import gsap from "gsap";

export function heroIntro(
  title: HTMLElement,
  subtitle: HTMLElement,
  button: HTMLElement
) {
  const tl = gsap.timeline({
    defaults: {
      ease: "power4.out",
    },
  });

  tl.fromTo(
    title,
    {
      y: 120,
      opacity: 0,
      skewY: 6,
    },
    {
      y: 0,
      opacity: 1,
      skewY: 0,
      duration: 1.2,
    }
  )

    .fromTo(
      subtitle,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      },
      "-=0.7"
    )

    .fromTo(
      button,
      {
        scale: 0.9,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
      },
      "-=0.5"
    );

  return tl;
}