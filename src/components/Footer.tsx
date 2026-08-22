import { personalInfo } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center select-none">
        <span
          className="font-sans font-bold leading-none text-[18vw] md:text-[200px] text-white/[0.03] whitespace-nowrap"
          aria-hidden
        >
          ROHAN
        </span>
      </div>

      <div className="relative max-w-container mx-auto px-5 lg:px-8 py-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-accent" />
            <span className="font-semibold tracking-tight text-[18px]">ROHAN</span>
          </div>
          <p className="label-eyebrow">AI Systems Engineer — {personalInfo.location}</p>
        </div>
      </div>

      <div className="relative max-w-container mx-auto px-5 lg:px-8 pb-8 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[12px] text-text-subtle">
        <span>© {year} SK Rohan Parveag</span>
        <span>BUILT AND DEPLOYED BY ME</span>
      </div>
    </footer>
  );
}
