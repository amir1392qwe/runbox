export default function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 h-full w-full object-cover opacity-30"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}