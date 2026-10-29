export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[#050505]" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#080808] via-[#111111] to-[#050505]" />

      <div
        className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:80px_80px]"
      />
    </>
  );
}