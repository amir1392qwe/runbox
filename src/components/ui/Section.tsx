import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({
  children,
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative py-28 lg:py-40",
        className
      )}
    >
      {children}
    </section>
  );
}