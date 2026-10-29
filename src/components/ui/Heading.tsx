import { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface HeadingProps {
  children: ReactNode;
  className?: string;
}

export default function Heading({
  children,
  className,
}: HeadingProps) {
  return (
    <h2
      className={cn(
        "text-5xl font-semibold uppercase tracking-tight md:text-7xl",
        className
      )}
    >
      {children}
    </h2>
  );
}