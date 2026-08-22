import { flagshipProjects } from "@/content/site";
import FlagshipCard from "@/components/FlagshipCard";
import Reveal from "@/components/Reveal";

export default function SelectedWork() {
  return (
    <section className="bg-ink py-24 md:py-[120px]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal className="flex items-center justify-between mb-12 flex-wrap gap-3">
          <p className="label-eyebrow">
            <span className="text-accent">01</span> — SELECTED WORK
          </p>
          <p className="label-eyebrow">FOUR SYSTEMS, IN PRODUCTION</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {flagshipProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <FlagshipCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
