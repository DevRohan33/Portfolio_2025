import { personalInfo } from "@/content/site";
import Reveal from "@/components/Reveal";

const rows = [
  { label: "EMAIL", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: "LINKEDIN", value: personalInfo.linkedinHandle, href: personalInfo.linkedin },
  { label: "GITHUB", value: personalInfo.githubHandle, href: personalInfo.github },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="bg-ink py-24 md:py-[120px] border-t border-hairline">
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal>
          <h2 className="text-[36px] md:text-[64px] font-semibold tracking-tight leading-[1.05] max-w-xl">
            Building something that has to work?
          </h2>
          <p className="mt-4 text-[17px] text-text-muted">
            I reply to everything. Usually within a day.
          </p>
        </Reveal>

        <div className="mt-14 divide-y divide-hairline border-y border-hairline">
          {rows.map((row, i) => (
            <Reveal key={row.label} delay={i * 60}>
              <a
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between py-6"
              >
                <span className="label-eyebrow">{row.label}</span>
                <span className="text-[18px] md:text-[24px] font-medium group-hover:text-accent transition-colors underline decoration-transparent group-hover:decoration-accent underline-offset-4">
                  {row.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
