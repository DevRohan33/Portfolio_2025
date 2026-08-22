import { proofStats } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function ProofStrip() {
  return (
    <section className="border-y border-hairline bg-ink">
      <div className="max-w-container mx-auto px-5 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-hairline">
        {proofStats.map((stat, i) => (
          <Reveal key={stat.caption} delay={i * 80} className="md:px-8 first:md:pl-0">
            <p className="text-[40px] md:text-[48px] font-semibold tracking-tight leading-none">
              {stat.value}
              <span className="text-accent">{stat.suffix}</span>
            </p>
            <p className="label-eyebrow mt-3">{stat.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
