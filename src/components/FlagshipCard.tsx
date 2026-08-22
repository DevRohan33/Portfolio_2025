import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { FlagshipProject } from "@/content/site";

const statusStyle: Record<string, string> = {
  LIVE: "text-accent",
  SHIPPED: "text-accent",
  BUILDING: "text-text-subtle",
};

export default function FlagshipCard({ project }: { project: FlagshipProject }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative flex flex-col justify-between min-h-[420px] rounded-card border border-hairline bg-surface p-8 transition-all duration-150 hover:border-white/20 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <span className="label-eyebrow">{project.category.toUpperCase()}</span>
        <span className={`font-mono text-[11px] uppercase tracking-[0.06em] flex items-center gap-1.5 ${statusStyle[project.status]}`}>
          {(project.status === "LIVE" || project.status === "SHIPPED") && (
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          )}
          {project.status}
        </span>
      </div>

      <div className="my-6 flex-1 min-h-[140px] rounded-control bg-surface-raised border border-hairline overflow-hidden relative">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase text-text-subtle">Preview coming soon</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-end justify-between gap-4">
          <h3 className="text-[22px] md:text-[28px] font-semibold tracking-tight">{project.name}</h3>
          <span className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center shrink-0 transition-all group-hover:bg-accent group-hover:text-ink group-hover:border-accent">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p className="mt-2 text-[15px] text-text-muted max-w-[44ch]">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
