import Hero from "@/components/sections/Hero";
import { pageMeta } from "@/lib/seo";
import ProofStrip from "@/components/sections/ProofStrip";
import SelectedWork from "@/components/sections/SelectedWork";
import Pillars from "@/components/sections/Pillars";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LatestNotes from "@/components/sections/LatestNotes";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata = pageMeta({
  description:
    "I build AI systems that survive contact with production: RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <SelectedWork />
      <Pillars />
      <ExperienceSection />
      <LatestNotes />
      <ContactCTA />
    </>
  );
}
