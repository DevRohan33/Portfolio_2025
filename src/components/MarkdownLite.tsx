function renderInline(text: string) {
  return text;
}

export default function MarkdownLite({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\n+/);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="text-h3 font-semibold text-inherit mt-4 mb-2">
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }
        if (block.split("\n").every((line) => line.startsWith("- "))) {
          const items = block.split("\n").map((line) => line.replace(/^-\s+/, ""));
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5 font-mono text-[14px]">
              {items.map((item, j) => (
                <li key={j}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="leading-[1.7]">
            {renderInline(block)}
          </p>
        );
      })}
    </>
  );
}
