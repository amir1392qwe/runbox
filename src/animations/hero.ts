import gsap from "gsap";

export const heroIntro = (
  title: HTMLHeadingElement,
  subtitle: HTMLParagraphElement,
  button: HTMLDivElement
) => {
  const tl = gsap.timeline();

  tl.from(title, {
    y: 120,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
  })
    .from(
      subtitle,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.7"
    )
    .from(
      button,
      {
        y: 30,
        opacity: 0,
        duration: 0.7,
      },
      "-=0.5"
    );
};