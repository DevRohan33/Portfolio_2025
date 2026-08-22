import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import SelectedWork from "@/components/sections/SelectedWork";
import Pillars from "@/components/sections/Pillars";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactCTA from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <Pillars />
      <ExperienceSection />
      <ContactCTA />
    </>
  );
}
