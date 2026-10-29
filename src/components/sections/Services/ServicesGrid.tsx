"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import ServiceCard from "./ServiceCard";
import { services } from "./data";

export default function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;

      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: gridRef }
  );

  return (
    <div
      ref={gridRef}
      className="grid gap-8 md:grid-cols-2"
    >
      {services.map((service, index) => (
        <ServiceCard
          key={service.id}
          index={index}
          title={service.title}
          description={service.description}
          accent={service.accent}
        />
      ))}
    </div>
  );
}