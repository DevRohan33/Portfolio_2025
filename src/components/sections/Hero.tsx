import Link from "next/link";
import { personalInfo } from "@/content/site";
import Reveal from "@/components/Reveal";
import ShaderBackground from "@/components/ShaderBackground";
import HeroAvatar from "@/components/HeroAvatar";
import HandNote from "@/components/HandNote";

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
              AI SYSTEMS ENGINEER - {personalInfo.location.toUpperCase()}
            </p>
          </Reveal>
          <h1 className="font-serif text-[13vw] leading-[1.0] tracking-[-0.03em] font-medium sm:text-[60px] md:text-[80px] max-w-4xl">
            {personalInfo.heroLines.map((line, i) => {
              const last = i === personalInfo.heroLines.length - 1;
              const words = line.split(" ");
              return (
                <Reveal key={line} as="span" delay={i * 80} className="block">
                  {last ? (
                    <>
                      {words.slice(0, -1).join(" ")}{" "}
                      <em className="italic text-accent">{words[words.length - 1]}</em>
                    </>
                  ) : (
                    line
                  )}
                </Reveal>
              );
            })}
          </h1>
          <Reveal delay={280}>
            <p className="font-serif max-w-[50ch] text-[18px] md:text-[21px] leading-relaxed text-text-muted">
              {personalInfo.heroSub}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="/work" className="pill-primary">
                See the work
              </Link>
              <Link href="/notes" className="pill-secondary">
                Read the notes
              </Link>
              <HandNote as="span" className="hidden sm:inline ml-2">
                ← start here
              </HandNote>
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
