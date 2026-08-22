export type Note = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  topic: "RAG" | "DATA" | "INFRA";
  body: string;
};

export const notes: Note[] = [
  {
    slug: "deduplicating-an-automated-news-pipeline",
    title: "Deduplicating an automated news pipeline — title matching isn't enough",
    summary:
      "Why comparing headlines catches almost nothing, and what to check instead when the same story shows up from five different outlets.",
    date: "2026-01",
    topic: "DATA",
    body: `When I started building TechPluse's dedup step, the obvious first pass was string comparison on headlines. It lasted about a day before it was obviously wrong.

The same story shows up across sources with completely different phrasing. "OpenAI ships new reasoning model" and "New o-series model launches from OpenAI" are the same event described by two editors with two different habits. A string match — even a fuzzy one — misses that pair every time, and a pipeline that can't dedup those two headlines will happily publish both as if they were independent news.

## What actually works

Semantic comparison, not lexical. Embed the candidate item and compare it against a rolling window of recently stored items using cosine similarity. If something scores above a threshold against an existing entry, it's a duplicate — even if not a single word overlaps between the two headlines.

The threshold itself is the part worth tuning carefully. Set it too low and you start merging genuinely distinct stories that happen to share a topic — two different papers about "efficient attention," say. Set it too high and near-duplicates slip through again. I landed on checking similarity against both the title embedding and a short summary embedding, requiring agreement on both before calling something a duplicate. A single signal is too easy to fool in either direction.

## The window matters as much as the metric

Comparing against every historical item you've ever stored doesn't scale, and it's also unnecessary — a duplicate detector's job is to catch things published within the same news cycle, not to notice that a story rhymes with something from six months ago. A rolling window (recent items only) keeps the comparison set small and keeps the semantics of "duplicate" tied to what it should mean: the same event, reported close together in time.

## What I'd still change

At real volume, comparing every new item against every item in the window is the part that doesn't scale — it's an O(n) scan for every incoming article. The honest fix is a proper approximate-nearest-neighbor index instead of a linear scan, so dedup checks stay fast as the window grows. I haven't needed it yet, but I know exactly where the ceiling is.`,
  },
  {
    slug: "multi-tenant-rag-isolation",
    title: "Multi-tenant RAG: keeping one tenant's documents out of another's answers",
    summary:
      "Row-level tenant IDs in Postgres don't protect you once a vector store enters the picture. Isolation has to happen at retrieval, not just at the database.",
    date: "2026-02",
    topic: "RAG",
    body: `The first instinct when adding multi-tenancy to a RAG system is to reach for the same pattern you'd use anywhere else: a tenant_id column, a WHERE clause, done. That works for your relational tables. It does not automatically work for the vector store sitting next to them.

## Where the leak actually happens

A retrieval-augmented system's failure mode isn't a SQL query missing a filter — it's a nearest-neighbor search returning the closest vectors regardless of whose documents they came from, unless you explicitly constrain it. If tenant A's onboarding PDF and tenant B's onboarding PDF are semantically similar (and onboarding PDFs usually are), an unconstrained retrieval can easily hand tenant A's support agent a chunk of tenant B's private document, because it's simply the nearest match in the embedding space.

This is invisible in almost every demo. One test tenant, one document set — there's nothing to leak into. It becomes visible exactly once, on the day a second real customer signs up and the first customer's support agent starts answering with details it shouldn't have.

## The fix, and why it has to be structural

Every retrieval call needs a tenant filter applied at the vector store level, not as a post-filter on results. Filtering after retrieval means you already pulled the wrong tenant's data into memory and just chose not to show it — a much weaker guarantee than never fetching it in the first place. Most vector databases support metadata filtering at query time; the discipline is making sure literally every retrieval path in the codebase uses it, including the ones written in a hurry six months from now.

The second layer is per-tenant namespacing or collection separation where the vector store supports it, so a filter bug degrades to "no results" instead of "wrong tenant's results." Defense in depth matters more here than almost anywhere else in the stack, because the failure is silent — nothing crashes, nothing errors, the agent just quietly says something it shouldn't.

## What I test for now

Two tenants, overlapping document topics, and an explicit assertion that querying as tenant A never returns a chunk owned by tenant B. It's a small test to write and it catches the exact class of bug that a single-tenant demo will never surface.`,
  },
  {
    slug: "exif-geolocation-at-scale",
    title: "Extracting geolocation from image EXIF at scale, and why the metadata lies",
    summary:
      "Phones and cameras write location metadata inconsistently. Extraction without a validation pass is extraction you can't trust.",
    date: "2026-02",
    topic: "DATA",
    body: `EXIF geolocation looks like free structured data — the coordinates are just sitting there in the file, no inference required. The catch is that "sitting there" doesn't mean "correct," and a pipeline that trusts it blindly will confidently place assets in the wrong location often enough to matter.

## The ways it goes wrong

Some devices don't write GPS EXIF at all, and a naive extractor treats a missing field as a silent skip — fine, as long as everything downstream expects gaps. Others write stale coordinates: a phone that acquired a GPS fix at the start of a shoot and never updated it will tag every photo from that session with the first location, not the actual one per shot. Editing software and messaging apps frequently strip EXIF entirely on save or forward, which means the "no location" case includes both "never had one" and "had one, lost it in transit" — two very different situations that look identical by the time the file reaches your pipeline.

And then there's outright implausible data: malformed GPS blocks that decode to coordinates in the middle of an ocean, or a reference (N/S/E/W) that got flipped during a lossy conversion somewhere upstream, putting a location in the wrong hemisphere entirely.

## What a validation pass actually checks

Extraction has to be paired with sanity-checking, not just parsing. A useful minimum: bounds-check the decoded coordinates against any known context you have (a country, a region, a project boundary) and reject or flag anything outside plausible range. Cross-check GPS timestamp against file creation time where both exist — a large mismatch is a signal something's off, not proof, but a signal worth surfacing. Track "no EXIF GPS" and "implausible EXIF GPS" as separate categories in your logs instead of collapsing both into a null value; they call for different downstream handling and conflating them means you can't tell how much of your data you should actually trust.

## The part that's easy to skip

None of this shows up as a bug in testing with a handful of curated sample images — those are exactly the images that behave. The failure only appears at volume, with real field-collected assets from a mix of devices, which is precisely the case a pipeline like this exists to handle. Building the validation pass in from the start costs less than retrofitting it after the first time a bad coordinate makes it into a report.`,
  },
  {
    slug: "proxy-api-layer",
    title: "A proxy API layer: how to let a frontend use third-party APIs without shipping keys",
    summary:
      "If your frontend calls a third-party API directly, your API key is in the browser. Here's the pattern that keeps it server-side.",
    date: "2026-03",
    topic: "INFRA",
    body: `The fastest way to integrate a third-party API is usually the wrong one: call it straight from the frontend. It works in a demo. It also means the API key is sitting in a network request that anyone with browser devtools can read, which means it's not really a secret anymore — it's public, just inconvenient to find.

## The pattern

Every call to a third-party service goes through your own backend instead. The frontend calls your API; your backend holds the credentials, makes the actual third-party request, and returns only what the frontend needs. The key never leaves the server process. This is the proxy layer, and it's a small amount of extra plumbing for a category of vulnerability that otherwise ships by default.

It's not just about hiding the key from a curious user, either. A backend proxy is also the place to enforce rate limits per user instead of trusting whatever the third-party API's global limit gives you, to cache responses so five identical frontend requests don't become five billed API calls, and to swap providers later without touching the frontend at all — the frontend only ever knew about your API, never the vendor's.

## What it costs

One more service hop, and slightly more latency than calling the third party directly. For anything where the round trip matters — streaming an LLM response, for instance — the proxy has to actually stream through rather than buffering the whole response, or you've traded a security problem for a UX one.

## Where this bites people

I've seen the direct-call pattern most often in exactly the kind of project that starts as a weekend build and quietly becomes a real product: a hackathon prototype, a client demo, an AI chatbot bolted onto an existing site. Nobody sets out to ship a key to the browser; it's just the default shape of "call the API from the component that needs the answer." The fix is cheap early and expensive late — rotating a leaked key after the fact is the easy part, auditing everywhere that key was used and confirming nothing was abused in the meantime is not.

If you're prototyping and genuinely don't care yet, at least know you're doing it. The proxy layer is the difference between a prototype and something you can actually put in front of users.`,
  },
  {
    slug: "four-products-one-vps",
    title: "Running four products on one VPS with Dokploy and Docker — the actual setup and monthly cost",
    summary:
      "The real infrastructure behind everything I ship: reverse proxy, container layout, secrets, backups, and what it actually costs per month.",
    date: "2026-03",
    topic: "INFRA",
    body: `Most of what I run — TechPluse, MyLedger's backend services, AI Workspace as it comes together, and a handful of smaller tools — lives on one VPS. Not because that's the "correct" architecture in some abstract sense, but because it's the setup that lets me spend money on the products instead of on infrastructure I don't need yet.

## The shape of it

One VPS, Docker for containers, Dokploy on top handling deploys and reverse proxying so I'm not hand-writing nginx configs for every new service. Each product is its own container — one service per container, not a shared monolith — so a bad deploy on one product can't take the others down with it. Caddy handles TLS automatically per domain, which removes an entire category of "the cert expired at 3am" problem I used to have to think about.

Secrets are environment-isolated per container rather than shared globally. It's a small discipline that pays for itself the first time you rotate a key for one product and don't have to worry about whether it was reused somewhere else.

## Backups, and the part everyone skips

Nightly Postgres backups, which is the easy half. The half that actually matters is the restore drill — running a monthly test restore to confirm the backup is actually usable, not just present. A backup nobody has ever restored from is a hope, not a plan. This is the single most common gap I see in setups like this, including in earlier versions of my own — it's invisible right up until the day you need it.

## Monitoring

Uptime Kuma watching each service, alerts routed to Telegram. Nothing fancy — the point isn't sophistication, it's that I find out about an outage from a message on my phone instead of from a user.

## Why not just use managed platforms for everything

I do, for the portfolio itself — static hosting on a platform like Vercel or Cloudflare Pages is the right call when there's no backend state to own. But for products with real backend logic, a self-managed VPS is currently cheaper than the equivalent managed services would be at this scale. I'm not trying to be a dedicated infrastructure specialist — deployment is one part of taking a system from a requirement to something real, not the point of it on its own. But if I'm going to own a product end to end, that includes knowing what's actually running it.

The honest tradeoff: this setup makes me the on-call engineer for four products. That's a cost. It's one I've decided is worth paying while I'm the only one who needs to be woken up.`,
  },
  {
    slug: "shipping-to-a-wholesale-distributor",
    title: "What shipping to a wholesale distributor taught me that no tutorial did",
    summary:
      "MyLedger went live with a real, non-technical business. The lessons that mattered weren't about the tech stack.",
    date: "2026-03",
    topic: "DATA",
    body: `Every tutorial teaches you to build the feature. Nothing teaches you what happens when the person using it has never used software like it before, has a business to run, and does not have time for your onboarding flow.

## The gap between "works" and "usable"

MyLedger technically worked the first week it was live. It was also, in retrospect, built for someone who thinks like a developer — implicit assumptions about what a "session" is, what happens if you close the app mid-entry, what a sensible default should be. None of that matches how a busy distributor actually uses an app between customers walking in. The fixes that mattered most in the first month weren't features — they were removing steps, tightening defaults, and making the one or two actions someone does fifty times a day take one tap instead of three.

## Trust is earned per feature, not once

Getting a real business to migrate off a paper notebook isn't a single decision — it's a hundred small ones. The owner didn't trust the automatic due tracking until they'd manually cross-checked it against the notebook for two weeks straight. That's not a failure of the feature; it's the correct level of caution for someone whose actual money is on the line. Software that wants to replace a trusted manual process has to earn that trust at the pace the user is willing to give it, not the pace the roadmap wants.

## The question that mattered most: "who changed this?"

The first real support request wasn't a bug report. It was "why does this price look different from what I set" — a staff-access question, not a code question. That's when the activity log went from a nice-to-have to the most-used feature in the app. Any system with more than one person touching shared data needs an audit trail before it needs almost anything else on the feature list, and I'd learned that in the abstract before — it hits differently when it's a real owner asking a real question about real money.

## What I'd tell myself before starting

Ship the smallest version to the real user faster than feels comfortable. Every week I spent polishing a feature in isolation was a week I wasn't learning what the actual failure modes would be once real data and a real, skeptical user were in the loop. The notebook it replaced had thirty years of institutional trust behind it. Software earns that the same way — by being right, consistently, in front of the person whose business depends on it.`,
  },
];
