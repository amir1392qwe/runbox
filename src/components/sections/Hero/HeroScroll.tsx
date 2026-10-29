export default function HeroScroll() {
  return (
    <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">

      <div className="flex flex-col items-center gap-5">

        <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500">
          Scroll
        </span>

        <div className="h-16 w-px bg-white/30" />

      </div>

    </div>
  );
}