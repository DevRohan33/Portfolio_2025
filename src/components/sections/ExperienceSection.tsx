import { education, experience, priorRole } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function ExperienceSection() {
  return (
    <section className="bg-ink py-24 md:py-[120px] border-t border-hairline">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="label-eyebrow mb-12">
            <span className="text-accent">03</span> — TRACK RECORD
          </p>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Reveal className="md:sticky md:top-32">
              <h3 className="text-[28px] md:text-[32px] font-semibold tracking-tight leading-tight">
                Backend and AI, shipped end to end.
              </h3>
              <p className="mt-4 text-[15px] text-text-muted max-w-[40ch]">
                RAG pipelines, agent systems, and the architecture underneath them —
                designed, built, and shipped by the same person.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="relative border-l border-hairline pl-8 space-y-12">
              {experience.map((item, i) => (
                <Reveal key={item.role + item.period} delay={i * 80} className="relative">
                  <span className="absolute -left-[calc(2rem+4.5px)] top-1.5 w-[9px] h-[9px] bg-accent" />
                  <p className="label-eyebrow">{item.period}</p>
                  <h4 className="mt-2 text-[20px] font-medium">{item.role}</h4>
                  <p className="label-eyebrow text-text-muted mt-1">{item.company}</p>
                  <p className="mt-2 text-[15px] text-text-muted max-w-[52ch]">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={experience.length * 80}
              className="mt-8 grid sm:grid-cols-2 gap-4"
            >
              <div className="border border-hairline rounded-card p-6">
                <p className="label-eyebrow mb-2">Education</p>
                <p className="text-[16px] font-medium">{education.degree}</p>
                <p className="text-[14px] text-text-muted mt-1">
                  {education.institution} · {education.period}
                </p>
              </div>
              <div className="border border-hairline rounded-card p-6">
                <p className="label-eyebrow mb-2">Prior</p>
                <p className="text-[16px] font-medium">{priorRole.role}</p>
                <p className="text-[14px] text-text-muted mt-1">{priorRole.period}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
