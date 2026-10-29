"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ShowcaseCard from "./ShowcaseCard";
import { showcase } from "./data";

export default function ShowcaseList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 100,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-24"
    >
      {showcase.map((project) => (
        <ShowcaseCard
          key={project.id}
          title={project.title}
          category={project.category}
          image={project.image}
        />
      ))}
    </div>
  );
}