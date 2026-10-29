export default function HeroGlow() {
  return (
    <>
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[180px]" />
    </>
  );
}