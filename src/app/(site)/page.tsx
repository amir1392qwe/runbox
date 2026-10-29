import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats/Stats";
import FeaturedGames from "@/components/sections/FeaturedGames";
import ScrollScene from "@/components/sections/ScrollScene";
import Services from "@/components/sections/Services";
import HowItWorks from "@/components/sections/HowItWorks/HowItWorks";
import Showcase from "@/components/sections/Showcase";
import CTA from "@/components/sections/CTA/";
import { listCreators } from "@/lib/actions/creators";

export const revalidate = 0;

export default async function Home() {
  const creators = await listCreators();

  return (
    <>
      <Hero />
      <Stats />
      <FeaturedGames />
      <ScrollScene creators={creators.slice(0, 4)} />
      <Services />
      <HowItWorks />
      <Showcase />
      <CTA />
    </>
  );
}
