import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { flagshipProjects } from "@/content/site";
import FlagshipCard from "@/components/FlagshipCard";
import Reveal from "@/components/Reveal";
import HandNote from "@/components/HandNote";

export default function SelectedWork() {
  const featured = flagshipProjects.filter((p) => p.featured);

  return (
    <section className="bg-ink py-24 md:py-[120px]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal className="flex items-center justify-between mb-12 flex-wrap gap-3">
          <p className="label-eyebrow">
            <span className="text-accent">01</span> - SELECTED WORK
          </p>
          <HandNote tone="muted" className="!text-[22px]">designed, shipped, and actually run ↓</HandNote>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <FlagshipCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/work" className="pill-secondary gap-2">
            All {flagshipProjects.length} systems <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
