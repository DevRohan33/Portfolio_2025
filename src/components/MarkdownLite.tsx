import { Fragment } from "react";
import { slugify } from "@/lib/notes";

/** `code` and **bold** — the only inline syntax the notes use. */
function renderInline(text: string) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="font-mono text-[0.85em] bg-paper-muted rounded px-1.5 py-0.5">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-paper-text">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function MarkdownLite({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\n+/);
  let section = 0;
  let firstParagraph = true;

  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          section += 1;
          const heading = block.replace(/^##\s+/, "");
          return (
            <h2
              key={i}
              id={slugify(heading)}
              className="scroll-mt-28 !mt-14 flex items-baseline gap-3 font-sans text-[26px] md:text-[30px] font-semibold tracking-tight leading-tight text-paper-text"
            >
              <span className="font-hand text-[30px] md:text-[34px] font-bold text-[#5c7a12] -rotate-6 shrink-0">
                {section}.
              </span>
              {heading}
            </h2>
          );
        }
        if (block.split("\n").every((line) => line.startsWith("> "))) {
          return (
            <blockquote
              key={i}
              className="border-l-[3px] border-[#5c7a12] pl-6 italic text-[22px] leading-snug text-paper-text"
            >
              {renderInline(block.replace(/^>\s?/gm, ""))}
            </blockquote>
          );
        }
        if (block.split("\n").every((line) => line.startsWith("- "))) {
          const items = block.split("\n").map((line) => line.replace(/^-\s+/, ""));
          return (
            <ul key={i} className="list-disc pl-6 space-y-2 marker:text-[#5c7a12]">
              {items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        const isFirst = firstParagraph;
        firstParagraph = false;
        return (
          <p
            key={i}
            className={
              isFirst
                ? "first-letter:float-left first-letter:font-serif first-letter:text-[76px] first-letter:leading-[0.82] first-letter:font-semibold first-letter:mr-3 first-letter:mt-1.5 first-letter:text-paper-text"
                : undefined
            }
          >
            {renderInline(block)}
          </p>
        );
      })}
    </>
  );
}
