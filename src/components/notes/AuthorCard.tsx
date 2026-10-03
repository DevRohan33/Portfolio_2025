import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/content/site";

export default function AuthorCard() {
  return (
    <div className="flex flex-col sm:flex-row gap-6 rounded-card border border-paper-text/10 bg-white/60 p-6 md:p-8">
      <Image
        src="/image/profil.jpg"
        alt={`Photo of ${personalInfo.name}`}
        width={88}
        height={88}
        className="w-[88px] h-[88px] rounded-full object-cover object-[50%_25%] shrink-0 ring-4 ring-paper"
      />
      <div>
        <p className="font-hand text-[22px] font-bold text-[#5c7a12] -rotate-1">written by</p>
        <p className="text-[22px] font-semibold tracking-tight">{personalInfo.name}</p>
        <p className="mt-2 font-serif text-[17px] leading-relaxed text-paper-text/70 max-w-[56ch]">
          Backend and AI engineer in Kolkata. I build RAG and tool-calling systems at Design
          Intelligence, and ship my own products on the side. These notes are what I&apos;d tell
          myself before starting each one.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.06em]">
          <Link href="/about" className="inline-flex items-center gap-1 hover:text-[#5c7a12]">
            About me <ArrowUpRight size={12} />
          </Link>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#5c7a12]"
          >
            LinkedIn <ArrowUpRight size={12} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-1 hover:text-[#5c7a12]">
            Email <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
