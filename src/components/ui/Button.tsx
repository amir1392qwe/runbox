import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "rounded-full border border-white px-8 py-3 text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-black",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}