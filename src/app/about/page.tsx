import type { Metadata } from "next";
import { aboutStory, education, skillGroups } from "@/content/site";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "The story, the stack, and the education behind the work.",
};

export default function AboutPage() {
  const paragraphs = aboutStory.trim().split(/\n\n+/);

  return (
    <div className="pt-40 pb-24 md:pb-[120px]">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="label-eyebrow mb-4">ABOUT</p>
          <h1 className="text-h1 font-semibold tracking-tight max-w-2xl">
            From requirement to running system.
          </h1>
        </Reveal>

        <Reveal className="font-body mt-10 max-w-[62ch] space-y-5 text-[17px] leading-[1.7] text-text-muted">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-text-subtle pt-2">
            {education.degree}, {education.institution}, {education.period}
          </p>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <p className="label-eyebrow mb-8">SKILLS</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {skillGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <h3 className="text-[18px] font-semibold tracking-tight mb-4">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-[13px] text-text-muted flex gap-3">
                      <span className="text-accent shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
