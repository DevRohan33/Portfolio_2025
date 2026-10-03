/**
 * Structured data for search engines. `<` is escaped so content can never close
 * the script tag early (titles and summaries are data, not markup).
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
