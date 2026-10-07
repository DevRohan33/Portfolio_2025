import { cn } from "@/lib/utils";

/**
 * A handwritten aside- the personal touch from the notes pages, used sparingly
 * across the site. `tone` picks the ink: lime on the dark pages, olive on paper.
 */
export default function HandNote({
  children,
  tone = "dark",
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  tone?: "dark" | "paper" | "muted";
  className?: string;
  as?: "p" | "span";
}) {
  const ink = {
    dark: "text-accent",
    paper: "text-[#5c7a12]",
    muted: "text-text-muted",
  }[tone];

  return (
    <Tag
      className={cn(
        "font-hand font-bold text-[24px] md:text-[26px] leading-tight -rotate-2 origin-left",
        ink,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
