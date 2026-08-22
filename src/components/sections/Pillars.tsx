import { pillars } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Pillars() {
  return (
    <section className="bg-ink py-24 md:py-[120px] border-t border-hairline">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="label-eyebrow mb-12">
            <span className="text-accent">02</span> — WHAT I ACTUALLY DO
          </p>
        </Reveal>

        <div className="divide-y divide-hairline">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 80}>
              <div className="group grid md:grid-cols-12 gap-3 md:gap-4 items-center py-8 md:py-10 px-0 md:px-2 transition-all duration-150 hover:bg-surface hover:pl-4 rounded-control">
                <span className="md:col-span-1 font-mono text-[13px] text-accent group-hover:text-text-primary transition-colors">
                  {pillar.number}
                </span>
                <h3 className="md:col-span-4 text-[24px] md:text-[32px] font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="md:col-span-3 text-[15px] text-text-muted">{pillar.tagline}</p>
                <div className="md:col-span-4 flex flex-wrap gap-2 md:justify-end">
                  {pillar.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
