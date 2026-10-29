"use client";

interface Props {
  onClick?: () => void;
  open?: boolean;
}

export default function NavButton({
  onClick,
  open = false,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="باز و بسته کردن منو"
      aria-expanded={open}
      className="group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 uppercase tracking-[0.28em] text-sm text-white transition-all duration-300 hover:border-violet-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(168,85,247,.18)] active:scale-95"
    >
      {/* Animated text */}
      <span
        className={`
          transition-colors
          duration-300
          ${open ? "text-violet-300" : "group-hover:text-violet-300"}
        `}
      >
        {open ? "بستن" : "منو"}
      </span>

      {/* Icon */}
      <div className="relative flex h-4 w-6 flex-col justify-between">
        <span
          className={`
            h-[2px]
            rounded-full
            bg-current
            transition-all
            duration-300
            ${
              open
                ? "translate-y-[7px] rotate-45"
                : "w-6 group-hover:w-4"
            }
          `}
        />

        <span
          className={`
            h-[2px]
            rounded-full
            bg-current
            transition-all
            duration-300
            ${open ? "opacity-0" : "w-6"}
          `}
        />

        <span
          className={`
            h-[2px]
            rounded-full
            bg-current
            transition-all
            duration-300
            ${
              open
                ? "-translate-y-[7px] -rotate-45"
                : "w-6 group-hover:w-5"
            }
          `}
        />
      </div>

      {/* Glow */}
      <span
        className="absolute inset-0 rounded-full bg-violet-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />
    </button>
  );
}