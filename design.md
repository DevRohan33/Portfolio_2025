# Portfolio UI Prompt Pack — SK Rohan Parveag

**For use in Google Stitch** (plus an implementation addendum for the parts Stitch can't build)

---

## How to use this file

Stitch works best with **one screen at a time** and prompts in the **300–1,500 character** range. A single 10,000-word spec will get flattened. So this pack is split:

1. **§1 Design system prompt** — paste this first, in a new project. It sets the visual language.
2. **§2 Screen prompts** — paste one at a time, in order. Each assumes §1 is already established.
3. **§3 Hero frame-sequence spec** — Stitch will render a static hero. The scroll-driven image sequence gets built afterward by a coding tool. This section is the brief for that.
4. **§4 Copy deck** — every verbatim string, so you're not retyping.
5. **§5 Handoff addendum** — paste into Claude Code / Cursor after exporting from Stitch.

**Stitch tips:** use Experimental mode for higher fidelity. Generate **desktop first**, then ask for the mobile variant of each screen. You can upload a reference image to lock the style — after screen 1 looks right, screenshot it and attach it to later prompts.

---

## §1 — Design system prompt (paste first)

```
Design a personal portfolio site for SK Rohan Parveag, an AI Systems Engineer
who builds RAG pipelines, data infrastructure, and the deployments underneath
them. The tone is precise, engineered, confident — a working engineer's site,
not an agency site. Restrained, technical, zero stock-photo energy.

PALETTE — dark-first, with inverted light sections
  Base ink        #0B0C0E   (page background)
  Surface         #14161A   (cards)
  Surface raised  #1C1F24   (hover, nested)
  Hairline        rgba(255,255,255,0.08)
  Text primary    #F2F3F1
  Text muted      #9BA1A6
  Text subtle     #61666B
  Accent          #C6F24E   (signal lime — used sparingly: one element per view)
  Paper           #F5F4F0   (inverted sections: case studies, notes)
  Paper text      #0B0C0E

TYPE
  Headings + UI: Inter Tight — weights 500/600/700, tight tracking (-0.02em)
  on display sizes, line-height 1.05 on large headings.
  Data, labels, tags, numbers, code: JetBrains Mono — weight 400/500,
  uppercase for labels, letter-spacing 0.06em, size 12px.
  The mono/sans contrast is the core visual signature. Every metric, tech tag,
  timestamp, and section number is mono. Body copy is never mono.

SCALE
  Display 72px / H1 56px / H2 40px / H3 24px / Body 16px / Small 14px / Label 12px
  8px spacing unit. Container max-width 1280px, 32px gutters (20px mobile).
  Section padding 120px top and bottom desktop, 72px mobile.

SHAPE + SURFACE
  Radii: cards 20px, controls 10px, pills 999px.
  Cards are flat #14161A with a 1px rgba(255,255,255,0.08) border. No drop
  shadows anywhere. No gradients except one accent gradient on a single CTA.
  Depth comes from borders and background steps, not blur or shadow.

COMPONENTS
  Pill button: 999px radius, 14px text, 14px/28px padding. Primary = accent
  #C6F24E with #0B0C0E text. Secondary = transparent with a 1px hairline border.
  Tech tag: mono 12px uppercase, 1px hairline border, 999px, 6px/12px padding.
  Section label: a mono 12px uppercase eyebrow with a leading 2-digit number
  in accent, e.g. "01 — SELECTED WORK".
  Stat: large Inter Tight number (56px) over a mono 12px uppercase caption.

MOTION (describe in the design, implemented later)
  Everything reveals on scroll: 24px rise + fade, 600ms, cubic-bezier(.16,1,.3,1),
  80ms stagger between siblings. Hover states are fast and small — 150ms,
  2px lifts, border brightening. No bounce, no parallax on text.
```

---

## §2 — Screen prompts

### Screen 1 — Hero

```
Full-viewport hero, dark. The background is a full-bleed looping image
sequence that plays like silent video — treat it as a full-bleed video frame,
edge to edge, behind everything. Over it, a linear gradient scrim from
rgba(11,12,14,0.85) at the bottom to rgba(11,12,14,0.35) at the top so text
stays readable.

Fixed header overlay at the top: left is a wordmark "ROHAN" in Inter Tight
600, 18px, with a 6px accent-lime square before it. Right is a mono 12px
uppercase nav — WORK, NOTES, USES, ABOUT — then a bordered pill button
"CONTACT". On mobile the nav collapses to a mono "MENU" button.

Hero content sits bottom-left, aligned to the container, 96px above the
section end:
  - Mono 12px uppercase label in muted grey with a leading accent dot:
    "AI SYSTEMS ENGINEER — KOLKATA, IN"
  - H1 in Inter Tight 600, 72px desktop / 40px mobile, line-height 1.02,
    tracking -0.02em, max-width 16 characters per line, three lines:
    "I build AI systems" / "that survive contact" / "with production."
  - One line of body copy, 18px, muted, max-width 52ch: "RAG and agent
    pipelines, the data infrastructure that feeds them, and the deployments
    that keep them running. Currently backend and AI at Design Intelligence."
  - Two pills side by side: primary accent "See the work", secondary
    outlined "Read the notes".

Bottom-right of the hero, a small mono 12px uppercase block, right-aligned,
muted: "AVAILABLE FOR WORK" on one line with a small pulsing accent dot,
"SCROLL" with a downward arrow below it.
```

### Screen 2 — Proof strip

```
A narrow full-width band directly under the hero, dark #0B0C0E, 1px hairline
border on top and bottom, 64px vertical padding. Four evenly spaced metrics
in a row (2x2 grid on mobile), separated by 1px vertical hairlines.

Each metric: a large Inter Tight 600 number at 48px in #F2F3F1, with any
suffix (+, %) rendered in accent lime, above a mono 12px uppercase caption
in #61666B.

  2,000+   BILLS PROCESSED IN PRODUCTION
  3+       MONTHS LIVE WITH A REAL BUSINESS
  4        PRODUCTION SYSTEMS SHIPPED
  1.7 YRS  BACKEND AND AI, PROFESSIONALLY

No card backgrounds. Just numbers, rules, and space.
```

### Screen 3 — Selected work

```
Dark section. Section label at top-left: mono 12px uppercase, "01 — SELECTED
WORK" with "01" in accent lime. Beside it, right-aligned, a mono 12px muted
line: "FOUR SYSTEMS, IN PRODUCTION".

Below, a 2-column grid of four large project cards, 32px gap, stacking to one
column on mobile. Each card: #14161A, 20px radius, 1px hairline border, 32px
padding, 420px min-height, arranged as a vertical flex with content pushed to
the bottom.
  - Top row: mono 12px uppercase category on the left ("AI PIPELINE",
    "PRODUCT", "PLATFORM", "DATA ENGINEERING"), and on the right a mono 12px
    status chip — "LIVE" chips use accent lime text with an accent dot,
    "BUILDING" chips are muted.
  - A generous empty middle region reserved for a product screenshot,
    inset with 12px radius, showing a dark UI placeholder.
  - Bottom: project name in Inter Tight 600 at 28px; one line of muted body
    copy at 15px, max-width 44ch; then a row of 3-4 mono tech tags.
  - Bottom-right corner: a 40px circular outlined button with an
    arrow-up-right icon.
On hover the card border brightens to rgba(255,255,255,0.2), the card lifts
2px, and the arrow button fills with accent lime.

The four cards:
  TechPluse — AI PIPELINE — LIVE — "An automated newsroom: discovers,
    deduplicates, summarizes and stores AI research every 24 hours."
    Tags: PYTHON, FASTAPI, BRAVE MCP, POSTGRES
  MyLedger — PRODUCT — LIVE — "A wholesale ledger replacing the paper
    notebook. 2,000+ bills at a real distributor."
    Tags: FLUTTER, FIRESTORE, AWS
  AI Workspace — PLATFORM — BUILDING — "Multi-tenant RAG support agents,
    per-employee assistants, and automated billing for startups."
    Tags: DJANGO, LANGCHAIN, RAG, DOCKER
  Asset & ERP Pipeline — DATA ENGINEERING — SHIPPED — "QuickBase to SAP
    integration with an S3 media pipeline: EXIF geolocation, video frame
    extraction, credential-isolating proxy APIs."
    Tags: FASTAPI, S3, WASABI, PYTHON
```

### Screen 4 — Case study page

```
A single project case study page, inverted to the light Paper theme (#F5F4F0
background, #0B0C0E text) so it reads as a document rather than a showcase.

Header: mono 12px uppercase breadcrumb "WORK / TECHPLUSE". Below it an H1 in
Inter Tight 600 at 56px. Below that a two-line muted summary at 18px,
max-width 60ch. Then a horizontal meta row separated by hairlines, all mono
12px uppercase, four columns: ROLE / STACK / TIMELINE / STATUS.

Then a full-width product image, 16:9, 20px radius.

The body is a single 720px-wide centered column with generous 96px gaps
between blocks, in this order — each block preceded by a mono 12px uppercase
accent-coloured label:
  THE PROBLEM — two paragraphs of 17px body, line-height 1.7
  CONSTRAINTS — a mono bulleted list, one line each
  ARCHITECTURE — a full-bleed diagram area breaking out to 1080px wide,
    on a #0B0C0E dark card with 20px radius, containing a placeholder for a
    system diagram
  DECISIONS — three numbered sub-blocks, each with an Inter Tight 20px
    heading and a paragraph
  RESULTS — a 3-column metric row, same style as the proof strip but inverted
    for the light background
  WHAT I'D DO DIFFERENTLY — one paragraph inside a card with a 2px left
    border in accent lime and #EDEBE5 background

Footer of the page: previous/next project links as two large 32px Inter Tight
names with mono direction labels above them.
```

### Screen 5 — Capability pillars

```
Dark section. Section label "02 — WHAT I ACTUALLY DO".

Three horizontal rows stacked vertically, each separated by a 1px hairline,
40px vertical padding per row. Each row is a 12-column grid:
  - Columns 1-1: a mono 12px number in accent lime (01, 02, 03)
  - Columns 2-5: the pillar title in Inter Tight 600 at 32px
  - Columns 6-8: one line of muted 15px body copy
  - Columns 9-12: a right-aligned wrapped set of mono tech tags

Rows:
  01 APPLIED AI — "AI that does work, not demos." — Tags: RAG, MULTI-AGENT,
     LANGCHAIN, LANGGRAPH, MCP, VECTOR DBS, EVALS
  02 DATA & BACKEND — "Moving and shaping real data at volume." — Tags:
     PYTHON, FASTAPI, DJANGO, POSTGRES, ETL, S3, WASABI, REST
  03 SHIP & RUN — "I deploy and maintain what I build." — Tags: DOCKER,
     DOKPLOY, VPS, AWS, CI/CD, SECRETS, MONITORING

On hover, the entire row background lifts to #14161A, the row's left padding
animates from 0 to 24px, and the number turns from accent to white.
On mobile each row becomes a stacked block: number, title, copy, tags.
```

### Screen 6 — Experience timeline

```
Dark section, two-column layout. Section label "03 — TRACK RECORD".

Left column (sticky on desktop, 4 of 12 columns): a short block with an Inter
Tight 32px heading "From solar panels to production systems." and a muted
15px paragraph, max-width 40ch: "I started out maintaining solar arrays at
Adani's Mundra facility. It taught me something that shows up in my code
every day: systems have to work in the real world, not just in theory."

Right column (7 of 12): a vertical timeline with a 1px hairline running down
the left edge and a 9px accent-lime square marker at each entry. Four entries,
64px apart:
  - Mono 12px uppercase date range in #61666B
  - Inter Tight 500 at 20px role title
  - Mono 12px uppercase company in muted grey
  - Two lines of 15px body copy
Entries: JUN 2025 — PRESENT, Junior Software Engineer, Design Intelligence
LLP · FEB 2025 — JUN 2025, Full-Stack Intern, Design Intelligence LLP ·
OCT 2023 — JUN 2024, Maintenance Engineer, Adani Solar · 2024, Python
Intern, CodSoft & Oasis Infobyte.
Below the timeline, a bordered card with mono label "EDUCATION" containing
BTech Computer Science, MAKAUT / Elitte College of Engineering, 2023–2026.
```

### Screen 7 — Notes index

```
Light Paper section (#F5F4F0, #0B0C0E text). Section label "04 — NOTES",
with an Inter Tight 40px heading "Things I've had to figure out." and a
muted subheading line.

A list of six entries, no cards — each is a full-width row separated by 1px
#0B0C0E at 10% opacity, 32px vertical padding. Each row is a grid:
  - Left, fixed 120px: mono 12px uppercase date
  - Middle, flexible: post title in Inter Tight 500 at 24px, and beneath it
    a muted 15px one-line summary
  - Right, fixed: mono 12px uppercase topic tag (RAG, DATA, INFRA)
Hovering shifts the whole row 8px right, turns the title accent-lime-adjacent
dark green, and reveals an arrow at the far right.

Titles: "Deduplicating an automated news pipeline" · "Multi-tenant RAG:
keeping one tenant's documents out of another's answers" · "Extracting
geolocation from EXIF at scale, and why the metadata lies" · "A proxy API
layer: third-party APIs without shipping keys" · "Running four products on
one VPS with Dokploy — the setup and the monthly cost" · "What shipping to a
wholesale distributor taught me".
```

### Screen 8 — Uses / infrastructure

```
Dark section. Section label "05 — HOW I SHIP". Inter Tight 40px heading
"The setup behind the products."

A 3-column grid of bordered cards, #14161A, 20px radius, 24px padding,
stacking to one column on mobile. Each card has a mono 12px uppercase title
in accent lime, then a list of rows where each row is a label on the left in
muted 14px and a value on the right in mono 13px, separated by hairlines.

  INFRASTRUCTURE — VPS / Hetzner, Orchestration / Docker + Dokploy,
    Proxy / Caddy, TLS / Auto, Storage / S3 + Wasabi
  DATA — Primary / PostgreSQL, Vector / Chroma + Pinecone, Backups / Nightly,
    Restore drill / Monthly
  OPERATIONS — Monitoring / Uptime Kuma, Alerts / Telegram, Secrets /
    Env-isolated, CI / GitHub Actions

Below the grid, a full-width bordered strip with a mono 12px uppercase label
"RUNNING COST" on the left and a large Inter Tight 32px figure on the right,
with a muted line: "Four products, one box, one bill."
```

### Screen 9 — Contact + footer

```
Dark. A very large CTA block: Inter Tight 600 at 64px desktop / 36px mobile,
two lines, max-width 18 characters per line: "Building something" / "that has
to work?" Below it a muted 17px line: "I reply to everything. Usually within
a day."

Below that, a horizontal row of three contact rows, each a full-width
hairline-separated line with a mono 12px uppercase label on the left and a
large Inter Tight 24px value on the right that underlines and shifts on hover:
  EMAIL — skrohanparveag@gmail.com
  LINKEDIN — /in/skrohanparveag
  GITHUB — /DevRohan33

Footer beneath: 1px hairline, 48px padding. Left is the "ROHAN" wordmark and
a mono 12px muted line "AI SYSTEMS ENGINEER — KOLKATA, IN". Right is a mono
12px uppercase live local-time readout with a small accent dot. Bottom row,
mono 12px in #61666B: "© 2026 SK Rohan Parveag" on the left and "BUILT AND
DEPLOYED BY ME" on the right.

Behind the footer, a very large watermark of the word "ROHAN" in Inter Tight
700 at 200px, colour rgba(255,255,255,0.03), clipped by the section bottom.
```

### Screen 10 — Menu overlay (mobile + desktop)

```
A full-screen overlay on #0B0C0E covering everything. Top bar matches the
header: wordmark left, a bordered mono 12px "CLOSE" pill right.

Centered-left nav list, five items, each a full-width row: a mono 14px index
number in #61666B on the left (01–05), then the label in Inter Tight 600 at
56px desktop / 36px mobile in #9BA1A6. On hover the index turns accent lime
and the label turns #F2F3F1. Items: WORK, NOTES, USES, ABOUT, CONTACT.

Bottom bar with a 1px hairline above it, mono 12px uppercase, split: left
shows the local time and "KOLKATA, IN", right shows the email address as a
link.
```

---

## §3 — Hero frame-sequence spec

Stitch will draw the hero as a static image. This is the brief for building the real thing after.

### Asset preparation

| Item         | Value                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| Frame count  | 60–90 frames (90 is smoother; over 120 is wasted bytes)                         |
| Naming       | `hero/frame-0001.webp` … `hero/frame-0090.webp` — zero-padded to 4              |
| Dimensions   | 1920×1080 desktop set, plus a 960×1280 portrait set for mobile                  |
| Format       | WebP, quality 70–75. Target **under 60 KB per frame**                           |
| Total budget | Under 4 MB for the full desktop sequence                                        |
| Poster       | `hero/poster.webp` — frame 1, used as the LCP image and reduced-motion fallback |

If you're generating the sequence from a real video, extract with:

```bash
ffmpeg -i source.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 hero/frame-%04d.png
# then batch to webp
for f in hero/frame-*.png; do cwebp -q 72 "$f" -o "${f%.png}.webp"; done
```

### Behaviour

- **Canvas-based, not `<img>` swapping.** One `<canvas>` sized to the hero, `object-fit: cover` math done manually so frames fill without distortion.
- **Preload before playing.** Load the poster immediately and paint it. Load the rest in parallel with a concurrency cap of 8. Only start the sequence once ~30% is buffered; keep filling in the background.
- **Two drive modes — pick one:**
  - _Ambient loop_ (looks most like video): advance a frame every ~42ms via rAF, wrap at the end. Best if your images are a continuous motion clip.
  - _Scroll-scrubbed_: map the hero's scroll progress from `top top` to `bottom top` onto frame index. Best if your images are a reveal or build-up.
- **Reduced motion:** if `prefers-reduced-motion: reduce`, paint the poster only and never start the loop.
- **Mobile:** load the portrait set, cap at 45 frames, and pause the loop when the hero is out of the viewport (IntersectionObserver) so you're not burning battery.
- **Scrim:** the gradient overlay is a separate absolutely-positioned div above the canvas, never baked into the frames — you'll want to tune it after seeing the real images.

### Stitch workaround

Stitch can't render a sequence, so in the prompt describe the hero background as a **full-bleed video frame** and upload one representative frame as a reference image. Design against a realistic still, then swap in the canvas at implementation.

---

## §4 — Copy deck (verbatim)

**Hero H1:** I build AI systems / that survive contact / with production.
**Hero label:** AI SYSTEMS ENGINEER — KOLKATA, IN
**Hero sub:** RAG and agent pipelines, the data infrastructure that feeds them, and the deployments that keep them running. Currently backend and AI at Design Intelligence.
**Hero CTAs:** See the work · Read the notes

**Proof strip:** 2,000+ BILLS PROCESSED IN PRODUCTION · 3+ MONTHS LIVE WITH A REAL BUSINESS · 4 PRODUCTION SYSTEMS SHIPPED · 1.7 YRS BACKEND AND AI, PROFESSIONALLY

**Section labels:** 01 — SELECTED WORK · 02 — WHAT I ACTUALLY DO · 03 — TRACK RECORD · 04 — NOTES · 05 — HOW I SHIP

**About line:** I started out maintaining solar arrays at Adani's Mundra facility. It taught me something that shows up in my code every day: systems have to work in the real world, not just in theory.

**Contact CTA:** Building something that has to work?
**Contact sub:** I reply to everything. Usually within a day.
**Footer:** © 2026 SK Rohan Parveag · BUILT AND DEPLOYED BY ME

Project names, one-liners, and tags are in §2 Screen 3. Note titles are in §2 Screen 7.

---

## §5 — Handoff addendum (paste into your coding tool after Stitch export)

```
Take the exported Stitch HTML/CSS and rebuild it as a Next.js 15 App Router
site, TypeScript, Tailwind. Requirements:

1. STATIC RENDERING IS MANDATORY. Every page must be statically generated
   and return full HTML in the initial response — my current portfolio is
   client-rendered and returns an empty body to crawlers. Verify with
   `curl -s <url> | grep "<h1"` before considering it done. No content may
   depend on client-side JS to appear.

2. Case studies and notes as MDX under /content, with typed frontmatter,
   generated via generateStaticParams. Routes: / , /work/[slug] ,
   /notes/[slug] , /uses.

3. SEO: per-page metadata, dynamic OG images via next/og, sitemap.xml,
   robots.txt, and JSON-LD Person plus SoftwareApplication schema for each
   project.

4. Hero: implement the canvas frame sequence per the spec in §3 — poster-first
   paint, concurrency-capped preloading, rAF loop, IntersectionObserver pause,
   prefers-reduced-motion fallback to the static poster. The hero must never
   block LCP; the poster is the LCP element.

5. Scroll reveals with IntersectionObserver only, once per element, 24px rise
   plus fade, 600ms cubic-bezier(.16,1,.3,1), 80ms sibling stagger. No
   animation library. Respect prefers-reduced-motion globally.

6. Accessibility: skip link, visible focus rings in accent lime, semantic
   landmarks, all interactive elements reachable by keyboard, colour contrast
   at least 4.5:1 for body text.

7. Targets: Lighthouse 95+ on performance, accessibility, and SEO. Total JS
   under 100KB gzipped excluding the frame sequence.

Deploy to Vercel or Cloudflare Pages. Add Plausible or Umami analytics.
```
