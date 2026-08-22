import Link from "next/link";
import { personalInfo } from "@/content/site";
import Reveal from "@/components/Reveal";
import ShaderBackground from "@/components/ShaderBackground";
import HeroAvatar from "@/components/HeroAvatar";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink pb-24 pt-32">
      <ShaderBackground />

      <div
        className="hidden sm:flex absolute inset-y-0 right-0 lg:right-4 items-end pointer-events-none z-[1] pb-0"
        aria-hidden
      >
        <HeroAvatar />
      </div>

      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to top, rgba(11,12,14,0.85) 0%, rgba(11,12,14,0.35) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-container mx-auto w-full px-5 lg:px-8 flex flex-col md:flex-row justify-between items-end gap-12">
        <div className="max-w-[800px] flex flex-col gap-6">
          <Reveal>
            <p className="label-eyebrow flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              AI SYSTEMS ENGINEER — {personalInfo.location.toUpperCase()}
            </p>
          </Reveal>
          <h1 className="text-[12vw] leading-[1.02] tracking-[-0.04em] font-semibold sm:text-[56px] md:text-[72px] max-w-4xl">
            {personalInfo.heroLines.map((line, i) => (
              <Reveal key={line} as="span" delay={i * 80} className="block">
                {line}
              </Reveal>
            ))}
          </h1>
          <Reveal delay={280}>
            <p className="font-body max-w-[52ch] text-base md:text-lg text-text-muted">
              {personalInfo.heroSub}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/work" className="pill-primary">
                See the work
              </Link>
              <Link href="/notes" className="pill-secondary">
                Read the notes
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="hidden md:flex flex-col items-end gap-6 label-eyebrow shrink-0">
          <p className="flex items-center gap-2 text-text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            Available for work
          </p>
          <p>Scroll ↓</p>
        </div>
      </div>
    </section>
  );
}
