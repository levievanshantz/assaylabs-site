import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Assay Compares — AssayLabs",
  description:
    "Side-by-side: what Assay does that retrieval primitives (QMD), session-memory tools (claude-mem), and ambient capture hooks (ECC) don't.",
};

type Cell = "yes" | "no" | "partial" | "na" | "via";
interface Feature {
  label: string;
  /** What the feature does mechanically. */
  what?: string;
  /** Why it matters for a PM/builder. */
  why?: string;
  assay: Cell;
  qmd: Cell;
  claudeMem: Cell;
  cowork: Cell;
  gstack: Cell;
  ecc: Cell;
}

/** Market alternatives — the tools a buyer compares against.
 *  Different question from the infra-shape comparison below: this is
 *  "why not just use Notion AI / Glean / Linear AI / Mem0 / Zep?" */
interface MarketFeature {
  label: string;
  why?: string;
  assay: Cell;
  notionAI: Cell;
  glean: Cell;
  linearAI: Cell;
  mem0: Cell;
  zep: Cell;
}

const MARKET_FEATURES: MarketFeature[] = [
  {
    label: "Decisions as a first-class artifact",
    why: "Most tools treat decisions as just-another-document. Assay models them with a discriminator column, status lifecycle, and audit table — distinct from notes, claims, or messages.",
    assay: "yes", notionAI: "no", glean: "no", linearAI: "no", mem0: "no", zep: "no",
  },
  {
    label: "Full supersession chain (depth-N)",
    why: "Walk A→B→C→D as a single artifact. Lets you answer 'how did this evolve?' instead of just 'what is true now?'",
    assay: "yes", notionAI: "no", glean: "no", linearAI: "no", mem0: "no", zep: "partial",
  },
  {
    label: "Per-state-change audit (who/what/when/why)",
    why: "Every decision transition records the actor agent, model id, reason, and triggering evidence. Replay end-to-end how a call was made.",
    assay: "yes", notionAI: "no", glean: "no", linearAI: "partial", mem0: "no", zep: "no",
  },
  {
    label: "Time-aware recall (recency + frequency)",
    why: "Hybrid score blends semantic + recency + citation frequency. Old strategy decisions still surface; stale tactical ones decay naturally.",
    assay: "yes", notionAI: "no", glean: "partial", linearAI: "no", mem0: "partial", zep: "yes",
  },
  {
    label: "Local-first / data never leaves the machine",
    why: "PM data is sensitive: PRDs, salary discussions, due diligence, strategy. Single SQLite file. No cloud retention, no shadow IT review.",
    assay: "yes", notionAI: "no", glean: "no", linearAI: "no", mem0: "partial", zep: "partial",
  },
  {
    label: "AI assistant integration via MCP",
    why: "Claude Desktop and Cursor pull decisions on demand via the Model Context Protocol. No proprietary SDK lock-in.",
    assay: "yes", notionAI: "via", glean: "via", linearAI: "via", mem0: "no", zep: "no",
  },
  {
    label: "Structured query: 'what did we decide AND why AND who signed off'",
    why: "Returns the artifact, not just relevant text. Notion/Glean give you documents; Assay gives you the answer with full provenance.",
    assay: "yes", notionAI: "no", glean: "no", linearAI: "no", mem0: "no", zep: "no",
  },
  {
    label: "Free for design-partner cohort",
    why: "No credit card, no API bill, no usage-based pricing surprises. Concierge install during beta.",
    assay: "yes", notionAI: "no", glean: "no", linearAI: "no", mem0: "partial", zep: "partial",
  },
];

const MARKET_COLUMNS: { key: keyof MarketFeature; label: string; isAssay?: boolean; note?: string }[] = [
  { key: "assay", label: "Assay", isAssay: true },
  { key: "notionAI", label: "Notion AI", note: "doc summarization" },
  { key: "glean", label: "Glean", note: "enterprise search" },
  { key: "linearAI", label: "Linear AI", note: "ticket workflow" },
  { key: "mem0", label: "Mem0", note: "agent memory" },
  { key: "zep", label: "Zep", note: "long-term memory" },
];

/** Methodology references — open-source projects that informed our
 *  technical choices. Honest credit + where we diverged. */
interface MethodologyReference {
  name: string;
  href?: string;
  shape: string;
  whatWeTook: string;
  whereWeDiverged: string;
}

const METHODOLOGY_REFERENCES: MethodologyReference[] = [
  {
    name: "Memento",
    shape: "SQLite + FTS5 + sqlite-vec + offline bge embeddings; entity/observation/relation graph",
    whatWeTook: "Storage primitives — same SQLite + sqlite-vec + FTS5 + on-device bge embeddings stack.",
    whereWeDiverged: "Memento's graph is entity-centric (people / products / projects as nodes). Assay's is decision-centric: each decision is a node, predecessor edges form the graph. Entity layer is post-beta.",
  },
  {
    name: "Korety claude-memory",
    shape: "Multi-factor scoring (semantic + recency + frequency + concept overlap), pinned memories, decay, retrieval logs, auto-injection budgets",
    whatWeTook: "Multi-factor scoring inspiration. Hybrid recall is 0.7 cosine + 0.2 recency (90-day half-life) + 0.1 citation frequency, with cosine as floor + tiebreaker.",
    whereWeDiverged: "We don't auto-inject decisions into prompts (write-only architecture); recall is opt-in via MCP tool. Pinned memories and stale markers deferred to post-beta.",
  },
  {
    name: "Claude Memory Compiler",
    shape: "Capture → flush → compile → lint → inject index",
    whatWeTook: "Capture (drain) + lint (anti-template-leak filter) + inject-on-demand pattern.",
    whereWeDiverged: "Skipped the compile phase deliberately. Eval v2 verdict: claim extraction (the natural compile step) underperformed chunk-only retrieval 0.158 vs 0.446 AspectCoverage@5. Auto-compile would actively hurt quality on a markdown corpus.",
  },
  {
    name: "CocoIndex",
    shape: "AST/tree-sitter chunking with incremental reindex",
    whatWeTook: "Incremental reindex via content_hash drift detection.",
    whereWeDiverged: "AST chunking is wasted on prose. Two-pass markdown chunker (`lib/chunker.ts`, 38 tests) follows Anthropic's contextual retrieval pattern — the right tool for PM docs. Revisit if Assay later ingests code repos.",
  },
  {
    name: "Zilliz claude-context",
    shape: "Provider abstraction for embeddings (local + hosted)",
    whatWeTook: "Provider abstraction is the right shape — `lib/embeddings.ts` exposes `EmbeddingProvider` interface with OpenAI + local-bge implementations and env-var precedence.",
    whereWeDiverged: "Same shape, different inventory. Adding more providers (Cohere / Voyage) is one-file work when needed.",
  },
  {
    name: "GBrain",
    shape: "Local-first to cloud migration, graph query, jobs, health checks",
    whatWeTook: "Local-first health-check pattern (`assay doctor` + `assay-mcp.doctor`) and nightly sync via launchd.",
    whereWeDiverged: "Cloud migration deferred (PRD 19) until retention is proven with the design-partner cohort. No in-app job queue — launchd cron is enough for beta.",
  },
];

interface Section {
  title: string;
  blurb?: string;
  features: Feature[];
}

const SECTIONS: Section[] = [
  {
    title: "Retrieval",
    features: [
      {
        label: "Hybrid FTS + vector + RRF",
        what: "Runs BM25 full-text search and cosine-similarity vector search in parallel, then merges results via Reciprocal Rank Fusion.",
        why: "Text-only search misses semantic matches; pure vector misses exact terms. The hybrid catches both. RRF removes the need to tune a weight between them.",
        assay: "yes", qmd: "yes", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Local vector store (sqlite-vec)",
        what: "Vectors live as BLOBs in a standard SQLite file; a native extension provides cosine-distance functions.",
        why: "No separate vector DB to provision. Backup = `cp`. Move machines = `cp`. Keeps the install story under 5 minutes.",
        assay: "yes", qmd: "yes", claudeMem: "na", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Cross-encoder reranker (qwen3-0.6B)",
        what: "Second-pass re-scoring of top-K hybrid results using a small cross-encoder that reads query + document together.",
        why: "RRF ranks by vote; the reranker ranks by understanding. Typically gives 15-30% nDCG uplift on ambiguous or abstract queries.",
        assay: "yes", qmd: "yes", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Fail-fast embedding-dim validation",
        what: "Before every vector query, compares the query embedding size to the stored embedding size; throws a clear error with a remediation hint on mismatch.",
        why: "Vector dim mismatches are silent killers (opaque native crash). Catching them at the adapter boundary saves hours of debugging when you swap providers.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
    ],
  },
  {
    title: "Claims & typed output",
    blurb:
      "Where Assay diverges from every other tool in its bucket. No competitor extracts or cites typed claims.",
    features: [
      {
        label: "Typed claim extraction (finding / recommendation / assumption / metric)",
        what: "An LLM extracts atomic assertions from each source chunk and classifies each into one of four types.",
        why: "A PM doesn't need a pile of relevant passages — they need to know what is asserted, recommended, assumed, or measured. Typed claims let retrieval return structure, not soup.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Stance + confidence on every claim",
        what: "Each claim carries a stance (support / oppose / neutral) and a confidence (high / medium / low).",
        why: "Lets retrieval surface dissent. A 'support' and an 'oppose' on the same topic tells you it's contested; a vector-similarity system silently collapses them.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Stable citation tokens [Assay: id | source | date]",
        what: "Every surfaced claim gets a deterministic token the user can paste into a PRD, spec, or chat.",
        why: "Makes adoption measurable. Grep your PRDs for [Assay: tokens and you know exactly which claims got cited downstream — no survey, no self-report.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Structured briefing template",
        what: "Every tool response follows a fixed schema: proposal → lenses → findings → failure modes → verdict. Not free-form prose.",
        why: "Structured output is reviewable, diffable, skimmable. Free-form summaries hide where the model is confident vs guessing.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "yes", gstack: "no", ecc: "no",
      },
      {
        label: "Refusal surface — four modes",
        what: "When retrieval falls below thresholds, the tool short-circuits with one of: no_results, below_rrf_threshold, thin_content, ambiguous_topic. Each with a user-facing remediation suggestion.",
        why: "A system that refuses when it should is trustworthy. A system that confabulates on low evidence erodes trust permanently. Refusal is a first-class feature, not an error state.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
    ],
  },
  {
    title: "Memory — tiered architecture",
    blurb:
      "Four tiers, pay-for-what-you-use. Ambient capture is cheap; on-demand retrieval is deliberate.",
    features: [
      {
        label: "T1 — ambient session capture",
        what: "Lifecycle hooks (SessionStart, Stop, PreCompact, PreToolUse, PostToolUse) write session deltas and learned patterns to disk automatically.",
        why: "You don't have to remember to save context. The hooks run during normal Claude Code use; the output becomes the raw material Tier 2 searches over.",
        assay: "no", qmd: "no", claudeMem: "yes", cowork: "no", gstack: "no", ecc: "yes",
      },
      {
        label: "T2 — cheap semantic recall over session artifacts",
        what: "A second small sqlite-vec DB indexes T1 output; every new session queries it automatically and injects the top 3 relevant prior sessions into opening context.",
        why: "'Have I seen this before?' gets answered without you asking. Costs ~150 tokens per session start; catches context you'd otherwise forget.",
        assay: "yes", qmd: "na", claudeMem: "yes", cowork: "no", gstack: "no", ecc: "via",
      },
      {
        label: "T3 — citation-grade organizational retrieval",
        what: "Explicit slash commands run the full hybrid + reranker + typed-claim + citation-token pipeline against your PRD / Notion corpus.",
        why: "You pay the heavier retrieval + synthesis cost only when you're making a decision and need cited evidence. Not every turn.",
        assay: "yes", qmd: "partial", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "T4 — deliberate stress-test with lenses",
        what: "Adversarial evaluation mode — picks 3-6 lenses (strategic fit, overlap, assumption mapping, premortem, etc.) and returns a reasoned verdict with failure modes.",
        why: "For decisions, not drafts. Makes the system surface the reasons a proposal might be wrong, cited to evidence. Costs more tokens; only run when the decision weight justifies it.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Progressive disclosure (L1-L4) with workspace promotion",
        what: "Every retrieval is tiered: L1 headline, L2 supporting, L3 excerpts, L4 contested tail. Claims can be promoted from user to workspace scope for a retrieval boost.",
        why: "Scannable-then-deep output beats a wall of evidence. Promotion turns repeat-surfaced claims into organizational commitments that surface faster next time.",
        assay: "yes", qmd: "no", claudeMem: "partial", cowork: "no", gstack: "no", ecc: "no",
      },
    ],
  },
  {
    title: "Ingestion",
    features: [
      {
        label: "Break-point-aware chunker",
        what: "Two-pass chunker: first split by headings with context inheritance, then sub-split oversized sections along sentence boundaries.",
        why: "Dumb fixed-length chunks lose semantic coherence. Heading-aware chunks keep each piece about one thing, which makes retrieval precise and excerpts quotable.",
        assay: "yes", qmd: "yes", claudeMem: "na", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Markdown folder ingest",
        what: "Point the CLI at a directory; YAML frontmatter parsed, body chunked + embedded, content-hashed for delta detection.",
        why: "Your PRDs probably already live in a folder of markdown. No database migration, no export step, no service to sign up for.",
        assay: "yes", qmd: "yes", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Notion connector",
        what: "Pulls pages from a configured Notion workspace, chunks them with heading context, and ingests into the same corpus as local markdown.",
        why: "Most PM orgs already centralize in Notion. Works alongside markdown folders rather than replacing the existing source of truth.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Live file watcher",
        what: "Chokidar-backed watcher with per-collection debouncing; any save in the tracked folder triggers a hash-gated re-index.",
        why: "Index is never stale. You edit a PRD, and `/assay-retrieve` sees the new version within seconds — no manual re-run.",
        assay: "yes", qmd: "yes", claudeMem: "na", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Delete / rename tombstone retirement",
        what: "When a source file disappears from a scanned folder, its evidence rows are marked tombstoned and removed from the FTS index.",
        why: "Without this, deleted or renamed files remain searchable forever. Ghosts of old PRDs would pollute retrieval and cite to paths that don't exist.",
        assay: "yes", qmd: "partial", claudeMem: "na", cowork: "no", gstack: "no", ecc: "no",
      },
    ],
  },
  {
    title: "Distribution & surface",
    features: [
      {
        label: "MCP server (Claude Code native)",
        what: "Implements Model Context Protocol; registers as a local MCP server in Claude Desktop's config.",
        why: "Slash commands + tool-use happen in Claude Code's native UI. No browser switch, no copy-paste between apps.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Slash commands (/assay-retrieve, /assay-scan, /assay-stress-test, /assay-config)",
        what: "Claude Code slash commands routed to the MCP server tools.",
        why: "Zero-friction invocation from inside any session. No `import`, no SDK boilerplate, no new tab.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "CLI (add / index / watch / status / memory)",
        what: "Operational CLI for managing collections and the Tier 2 memory DB outside a Claude Code session.",
        why: "Automation-friendly. Wire into launchd, cron, git hooks, or a teammate's tooling. Not everything needs to go through the AI surface.",
        assay: "yes", qmd: "yes", claudeMem: "yes", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Zero-config install (no API key, no cloud)",
        what: "Defaults to local bge-large embeddings; no account, no database setup, no external service registration.",
        why: "The first five minutes decide whether a tool gets adopted. Requiring an API key or cloud signup before the first query kills the experience.",
        assay: "yes", qmd: "yes", claudeMem: "partial", cowork: "no", gstack: "no", ecc: "yes",
      },
      {
        label: "Single-file local DB",
        what: "Entire corpus — schema, evidence, embeddings, FTS index — lives in one SQLite file at ~/.assay/assay.db.",
        why: "Backup is `cp`. Migrate machines is `cp`. Inspect with `sqlite3`. No daemon to manage, no port to expose.",
        assay: "yes", qmd: "yes", claudeMem: "na", cowork: "no", gstack: "no", ecc: "yes",
      },
      {
        label: "Commercial-friendly license",
        what: "License permits use in closed-source commercial settings.",
        why: "AGPL obligations make a tool untouchable for most PM org integrations. License should match the work it's meant to do.",
        assay: "yes", qmd: "yes", claudeMem: "no", cowork: "yes", gstack: "yes", ecc: "yes",
      },
    ],
  },
  {
    title: "Quality & ops",
    features: [
      {
        label: "Retrieval regression harness (Jaccard diff)",
        what: "A fixed set of 20 representative queries; captures top-K results on any backend; diffs against a frozen baseline with Jaccard overlap at @5 and @10.",
        why: "Backend swaps (pg→sqlite, embed-dim changes, reranker toggles) silently degrade retrieval quality. A baseline + diff catches it before users do.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Extraction faithfulness audit",
        what: "Samples N claims; checks that each claim's cited source_excerpt actually appears as a substring in the parent source document.",
        why: "Hallucinated quotes are the single most trust-breaking failure. A mechanical audit catches the fabrication class without needing an LLM judge.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "no",
      },
      {
        label: "Opt-in telemetry (local JSONL, no cloud)",
        what: "Anonymous event stream written to ~/.assay/telemetry.jsonl when ASSAY_TELEMETRY=on. Nothing leaves the machine automatically.",
        why: "Measuring install time, recall adoption, and refusal rate matters for product work. Doing it without phoning home to a cloud service is the only version that respects the user.",
        assay: "yes", qmd: "no", claudeMem: "no", cowork: "no", gstack: "no", ecc: "yes",
      },
      {
        label: "Offline after first use",
        what: "First invocation downloads the local embedding model (~420 MB). Every subsequent retrieval is offline.",
        why: "Airplane-mode usable. Privacy-respecting. No network flakiness introduced into the decision path.",
        assay: "yes", qmd: "yes", claudeMem: "partial", cowork: "no", gstack: "no", ecc: "yes",
      },
    ],
  },
];

const CELL_STYLES: Record<Cell, { label: string; cls: string }> = {
  yes:     { label: "✓",  cls: "text-[hsl(152,60%,62%)]" },
  partial: { label: "~",  cls: "text-[hsl(40,90%,70%)]"  },
  via:     { label: "↗",  cls: "text-[hsl(234,100%,75%)]" },
  no:      { label: "—",  cls: "text-[hsl(220,10%,40%)]" },
  na:      { label: "·",  cls: "text-[hsl(220,10%,30%)]" },
};

const linkCls =
  "text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110";

function Cell({ value }: { value: Cell }) {
  const s = CELL_STYLES[value];
  return (
    <td className={`px-3 py-2 text-center font-[family-name:var(--font-jetbrains)] text-base ${s.cls}`}>
      {s.label}
    </td>
  );
}

const COLUMNS: { key: keyof Feature; label: string; isAssay?: boolean; note?: string }[] = [
  { key: "assay",     label: "Assay", isAssay: true },
  { key: "qmd",       label: "QMD",         note: "retrieval primitive" },
  { key: "claudeMem", label: "claude-mem",  note: "session memory" },
  { key: "cowork",    label: "Cowork",      note: "output templates" },
  { key: "gstack",    label: "gstack",      note: "forcing questions" },
  { key: "ecc",       label: "ECC hooks",   note: "lifecycle capture" },
];

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-[hsl(220,15%,6%)] text-[hsl(220,15%,93%)]">
      {/* Top nav — consistent with landing page */}
      <nav className="sticky top-0 z-50 border-b border-[hsl(220,15%,18%)] bg-[hsl(220,15%,6%)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[hsl(220,15%,93%)]">
            AssayLabs
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/compare" className="text-[hsl(220,15%,93%)] transition-colors">
              Compare
            </Link>
            <Link href="/docs" className="text-[hsl(220,10%,55%)] transition-colors hover:text-[hsl(220,15%,93%)]">
              Docs
            </Link>
            <a
              href="https://github.com/levievanshantz/assaylabs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[hsl(234,100%,71%)] px-3.5 py-1.5 text-sm font-medium text-[hsl(220,15%,6%)] transition-opacity hover:opacity-90"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="mb-12">
          <p className="text-sm text-[hsl(234,100%,71%)] font-medium mb-3 uppercase tracking-wider">
            How Assay Compares
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-[hsl(220,15%,93%)] mb-4">
            Institutional memory, not generic RAG.
          </h1>
          <p className="text-lg text-[hsl(220,10%,60%)] leading-relaxed max-w-3xl">
            Retrieval primitives find documents. Session-memory tools remember
            conversations. Assay captures <em>typed claims</em> and returns
            cited briefings — with refusal when the evidence is thin, and a
            four-tier memory architecture that pays for depth only when depth
            is warranted.
          </p>
        </div>

        <div className="mb-10 rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-6">
          <p className="text-sm text-[hsl(220,10%,60%)] uppercase tracking-wider mb-3 font-medium">
            Legend
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div><span className="text-[hsl(152,60%,62%)] font-[family-name:var(--font-jetbrains)]">✓</span> &nbsp;shipped</div>
            <div><span className="text-[hsl(40,90%,70%)] font-[family-name:var(--font-jetbrains)]">~</span> &nbsp;partial</div>
            <div><span className="text-[hsl(234,100%,75%)] font-[family-name:var(--font-jetbrains)]">↗</span> &nbsp;via integration</div>
            <div><span className="text-[hsl(220,10%,40%)] font-[family-name:var(--font-jetbrains)]">—</span> &nbsp;not in scope</div>
            <div><span className="text-[hsl(220,10%,30%)] font-[family-name:var(--font-jetbrains)]">·</span> &nbsp;n/a</div>
          </div>
        </div>

        {/* ─── Market Alternatives — the buyer's "why not just use X?" set ─── */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-[hsl(220,15%,93%)] mb-2">
            Market alternatives
          </h2>
          <p className="text-[hsl(220,10%,60%)] mb-5 max-w-3xl">
            Tools a PM or founder might consider buying instead. None model
            decisions as a first-class artifact with audit trail and
            supersession history — that&apos;s the gap Assay fills.
          </p>
          <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                  <th className="text-left px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Capability</th>
                  {MARKET_COLUMNS.map((c) => (
                    <th
                      key={c.key}
                      className={`px-3 py-3 text-center font-semibold ${
                        c.isAssay
                          ? "bg-[hsl(234,100%,71%)]/15 text-[hsl(234,100%,85%)]"
                          : "text-[hsl(220,10%,65%)]"
                      }`}
                    >
                      <div>{c.label}</div>
                      {c.note ? (
                        <div className="text-[10px] font-normal text-[hsl(220,10%,45%)] mt-0.5">
                          {c.note}
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MARKET_FEATURES.map((f, idx) => (
                  <tr
                    key={f.label}
                    className={`border-t border-[hsl(220,15%,14%)] align-top ${
                      idx % 2 === 0 ? "bg-[hsl(220,15%,7%)]" : "bg-[hsl(220,15%,8%)]"
                    }`}
                  >
                    <td className="px-4 py-4 max-w-xl">
                      <div className="text-[hsl(220,15%,93%)] font-medium leading-snug">{f.label}</div>
                      {f.why ? (
                        <div className="mt-1 text-[13px] text-[hsl(220,10%,70%)] leading-relaxed">
                          <span className="text-[hsl(234,100%,71%)]">Why it matters: </span>
                          {f.why}
                        </div>
                      ) : null}
                    </td>
                    {MARKET_COLUMNS.map((c) => (
                      <Cell key={c.key} value={f[c.key] as Cell} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="mb-12 -mt-2">
          <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-1">
            Adjacent local-first tools (infrastructure shape)
          </h2>
          <p className="text-[hsl(220,10%,60%)] text-sm max-w-3xl">
            For technical readers — how Assay sits relative to the local-first
            tools that share its infrastructure shape (retrieval primitives,
            session-memory hooks, output templates, lifecycle capture).
          </p>
        </div>

        {SECTIONS.map((section) => (
          <section key={section.title} className="mb-14">
            <h2 className="text-2xl font-semibold text-[hsl(220,15%,93%)] mb-2">{section.title}</h2>
            {section.blurb ? (
              <p className="text-[hsl(220,10%,60%)] mb-5 max-w-3xl">{section.blurb}</p>
            ) : (
              <div className="mb-4" />
            )}
            <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                    <th className="text-left px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Feature</th>
                    {COLUMNS.map((c) => (
                      <th
                        key={c.key}
                        className={`px-3 py-3 text-center font-semibold ${
                          c.isAssay
                            ? "bg-[hsl(234,100%,71%)]/15 text-[hsl(234,100%,85%)]"
                            : "text-[hsl(220,10%,65%)]"
                        }`}
                      >
                        <div>{c.label}</div>
                        {c.note ? (
                          <div className="text-[10px] font-normal text-[hsl(220,10%,45%)] mt-0.5">
                            {c.note}
                          </div>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.features.map((f, idx) => (
                    <tr
                      key={f.label}
                      className={`border-t border-[hsl(220,15%,14%)] align-top ${
                        idx % 2 === 0 ? "bg-[hsl(220,15%,7%)]" : "bg-[hsl(220,15%,8%)]"
                      }`}
                    >
                      <td className="px-4 py-4 max-w-xl">
                        <div className="text-[hsl(220,15%,93%)] font-medium leading-snug">{f.label}</div>
                        {f.what ? (
                          <div className="mt-1 text-[13px] text-[hsl(220,10%,70%)] leading-relaxed">
                            <span className="text-[hsl(220,10%,50%)]">What: </span>
                            {f.what}
                          </div>
                        ) : null}
                        {f.why ? (
                          <div className="mt-1 text-[13px] text-[hsl(220,10%,70%)] leading-relaxed">
                            <span className="text-[hsl(234,100%,71%)]">Why it matters: </span>
                            {f.why}
                          </div>
                        ) : null}
                      </td>
                      {COLUMNS.map((c) => (
                        <Cell key={c.key} value={f[c.key] as Cell} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-[hsl(220,15%,93%)] mb-4">
            Where Assay uniquely sits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-6">
              <p className="text-[hsl(234,100%,71%)] text-xs uppercase tracking-wider font-medium mb-2">
                Typed claims + citation tokens
              </p>
              <p className="text-[hsl(220,15%,93%)] text-sm leading-relaxed">
                Every claim has a <code>[Assay: id | source | date]</code> token
                that you can paste into a PRD. Later, grep across your PRDs
                tells you which claims were actually adopted. No other tool in
                this space makes adoption measurable.
              </p>
            </div>
            <div className="rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-6">
              <p className="text-[hsl(234,100%,71%)] text-xs uppercase tracking-wider font-medium mb-2">
                Productive refusal
              </p>
              <p className="text-[hsl(220,15%,93%)] text-sm leading-relaxed">
                Four distinct refusal modes (no_results, below_rrf_threshold,
                thin_content, ambiguous_topic). When evidence is insufficient,
                Assay doesn't fake an answer — it tells you what's missing.
              </p>
            </div>
            <div className="rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-6">
              <p className="text-[hsl(234,100%,71%)] text-xs uppercase tracking-wider font-medium mb-2">
                Four-tier memory
              </p>
              <p className="text-[hsl(220,15%,93%)] text-sm leading-relaxed">
                Ambient capture → cheap local recall → citation-grade retrieval
                → stress-test. Progressive disclosure (L1-L4) on every query.
                You pay heavy retrieval cost only when the signal warrants it.
              </p>
            </div>
            <div className="rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-6">
              <p className="text-[hsl(234,100%,71%)] text-xs uppercase tracking-wider font-medium mb-2">
                Local-first with no API-key requirement
              </p>
              <p className="text-[hsl(220,15%,93%)] text-sm leading-relaxed">
                Runs on SQLite + local bge-large embeddings. One file at
                <code> ~/.assay/assay.db</code>. No Docker, no Postgres, no
                cloud database, no account. An OpenAI API key is an
                upgrade — not a requirement.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Methodology references — open-source projects we credit ─── */}
        <section className="mb-16 pt-10 border-t border-[hsl(220,15%,18%)]">
          <h2 className="text-2xl font-semibold text-[hsl(220,15%,93%)] mb-2">
            Methodology references
          </h2>
          <p className="text-[hsl(220,10%,60%)] mb-6 max-w-3xl">
            Open-source projects whose ideas informed Assay&apos;s technical
            choices. Honest credit + where we deliberately diverged.
          </p>
          <div className="space-y-4">
            {METHODOLOGY_REFERENCES.map((ref) => (
              <div
                key={ref.name}
                className="rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-semibold text-[hsl(220,15%,93%)]">{ref.name}</h3>
                  <span className="text-[11px] uppercase tracking-wider text-[hsl(220,10%,55%)] mt-1">
                    {ref.shape}
                  </span>
                </div>
                <p className="text-sm text-[hsl(220,15%,93%)] leading-relaxed mb-2">
                  <span className="text-[hsl(152,60%,62%)] font-medium">What we took: </span>
                  {ref.whatWeTook}
                </p>
                <p className="text-sm text-[hsl(220,10%,75%)] leading-relaxed">
                  <span className="text-[hsl(40,90%,70%)] font-medium">Where we diverged: </span>
                  {ref.whereWeDiverged}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[hsl(220,10%,55%)] italic">
            Each adoption was a deliberate technical decision, not a default.
            The eval verdict on claim extraction (chunk-only beats claim-as-pointer
            0.446 vs 0.158 AspectCoverage@5) is why we deliberately do not
            auto-compile decisions into higher-order claims — Memory Compiler&apos;s
            compile phase would actively hurt retrieval quality on a markdown
            corpus.
          </p>
        </section>

        <div className="mt-12 pt-10 border-t border-[hsl(220,15%,18%)] flex gap-4">
          <Link href="/docs" className={linkCls}>Install &amp; quickstart →</Link>
          <Link href="/" className={linkCls}>Home</Link>
        </div>
      </div>
    </main>
  );
}
