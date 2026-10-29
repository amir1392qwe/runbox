import HeroBackground from "./HeroBackground";
import HeroOverlay from "./HeroOverlay";
import HeroGlow from "./HeroGlow";
import HeroContent from "./HeroContent";
import HeroScroll from "./HeroScroll";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <HeroOverlay />

      <HeroGlow />

      <HeroContent />

      <HeroScroll />
    </section>
  );
}