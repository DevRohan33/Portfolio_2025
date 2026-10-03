import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { flagshipProjects, tier2Projects, tier3Projects } from "@/content/site";
import FlagshipCard from "@/components/FlagshipCard";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { PERSON_ID, WEBSITE_ID, abs, breadcrumbs, graph, pageMeta } from "@/lib/seo";
import HandNote from "@/components/HandNote";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Production systems, live products and open-source projects by SK Rohan Parveag: RYBO, an agentic engineering assistant, a real-time voice coach, data pipelines and more.",
  path: "/work",
});

const jsonLd = graph(
  {
    "@type": "CollectionPage",
    "@id": abs("/work#page"),
    url: abs("/work"),
    name: "Work - SK Rohan Parveag",
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": PERSON_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: flagshipProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: abs(`/work/${p.slug}`),
        name: p.name,
      })),
    },
  },
  breadcrumbs([{ name: "Work", path: "/work" }]),
);

export default function WorkPage() {
  return (
    <div className="pt-40 pb-24 md:pb-[120px]">
      <JsonLd data={jsonLd} />
      <div className="max-w-container mx-auto px-5 lg:px-8">
        <Reveal>
          <p className="label-eyebrow mb-4">WORK</p>
          <h1 className="font-serif text-[48px] md:text-[72px] font-medium tracking-[-0.03em] leading-[1.0] max-w-3xl">
            Systems I&apos;ve built <em className="italic text-accent">and run.</em>
          </h1>
          <HandNote className="mt-5">every one of these ran with real users or real data ↓</HandNote>
        </Reveal>

        <div className="mt-16">
          <Reveal>
            <p className="label-eyebrow mb-8 text-accent">FLAGSHIP</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            {flagshipProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <FlagshipCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="label-eyebrow mb-8">SUPPORTING WORK</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {tier2Projects.map((project, i) => (
              <Reveal
                key={project.title}
                delay={i * 60}
                className="group border border-hairline rounded-card p-6 hover:border-white/20 transition-colors"
              >
                <div className="relative aspect-[16/9] mb-5 rounded-control overflow-hidden border border-hairline bg-surface-raised">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="font-serif text-[22px] font-medium">{project.title}</h3>
                <p className="mt-2 text-[14px] text-text-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="label-eyebrow flex items-center gap-1 hover:text-accent"
                    >
                      Live <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="label-eyebrow flex items-center gap-1 hover:text-accent"
                    >
                      Code <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="label-eyebrow mb-6">ARCHIVE</p>
          </Reveal>
          <Reveal className="divide-y divide-hairline border-y border-hairline">
            {tier3Projects.map((project) => (
              <div
                key={project.title}
                className="flex flex-wrap items-center justify-between gap-3 py-4"
              >
                <div>
                  <span className="text-[15px] font-medium">{project.title}</span>
                  <span className="text-[14px] text-text-muted ml-3">{project.description}</span>
                </div>
                <div className="flex gap-4 shrink-0">
                  {project.demoLink && (
                    <Link
                      href={project.demoLink}
                      target="_blank"
                      className="label-eyebrow hover:text-accent"
                    >
                      Link
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}
