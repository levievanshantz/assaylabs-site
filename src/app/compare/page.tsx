import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "How Assay compares — AssayLabs",
  description:
    "Most tools that touch product knowledge optimize for retrieval, drafting, or session memory. Assay optimizes for decision provenance.",
};

interface Cmp {
  name: string;
  shape: string;
  nature: string;
  assayLbl?: string;
  assay: string;
}

interface Group {
  heading: string;
  blurb: string;
  items: Cmp[];
}

const GROUPS: Group[] = [
  {
    heading: "Search & RAG tools",
    blurb:
      "Vector search and chat-over-docs apps. Strong on retrieval, weak on the claim layer.",
    items: [
      {
        name: "Glean / Notion AI",
        shape: "In-tool search",
        nature:
          "Tied to one workspace. Cited results are paragraph-level. No provenance graph, no claim layer.",
        assay:
          "Source-agnostic. Markdown, Notion, more coming. Provenance graph + typed claims + contradiction detection.",
      },
      {
        name: "LangChain / LlamaIndex apps",
        shape: "DIY RAG",
        nature:
          "Generic vector store + LLM. No opinion about what a 'claim' is. Every team rebuilds the same retrieval logic.",
        assay:
          "Opinionated about evidence and claims. RRF over four retrievers. Citations are a first-class object, not a prompt.",
      },
    ],
  },
  {
    heading: "Memory & context tools",
    blurb:
      "Tools that record agent sessions or scratchpads. Adjacent to memory; different unit of value.",
    items: [
      {
        name: "Mem0 / Letta",
        shape: "Session memory",
        nature:
          "Remembers the conversation. Evicts old turns. Optimizes for 'what did the user say last week.'",
        assay:
          "Indexes the artifact, not the conversation. Optimizes for 'what did the doc say, and is it still true.'",
      },
      {
        name: "Cursor / Claude Code memory",
        shape: "In-IDE scratch",
        nature:
          "Per-project notes, often editor-scoped. No multi-source, no claim type system, no audit log.",
        assay:
          "Stand-alone corpus. Reachable from any tool via MCP. Append-only state-change ledger preserved.",
      },
      {
        name: "Membria",
        shape: "Agent memory framework",
        nature:
          "Adjacent prior art: structured memory for agents. Focus is per-agent recall, not multi-source decision provenance across a team.",
        assay:
          "Cross-team, source-agnostic. Decisions and evidence are first-class artifacts with audit transitions, not just retrieval rows.",
      },
    ],
  },
  {
    heading: "Reference architectures",
    blurb: "Open-source primitives we lean on or measure against.",
    items: [
      {
        name: "sqlite-vec + FTS5",
        shape: "Storage layer",
        nature:
          "The substrate. Hybrid vector + BM25 in a single file. Used directly under the hood.",
        assayLbl: "Assay layers",
        assay:
          "Reciprocal rank fusion over four retrievers, recency-weighted scoring, claim extraction on top.",
      },
      {
        name: "pgvector + Postgres",
        shape: "Future cloud tier",
        nature:
          "Phase 3 multi-user shared corpus. Same data model, different substrate.",
        assayLbl: "Assay path",
        assay:
          "SQLite first; Postgres only when teams demand shared writes. Schema is identical so the migration is mechanical.",
      },
    ],
  },
];

export default function ComparePage() {
  return (
    <>
      <Topbar active="compare" />

      <main className="route" id="compare">
        <div className="route-tag">
          <div className="route-tag-inner">
            <span className="mono">/compare&nbsp;&nbsp;·&nbsp;&nbsp;ASSAY VS THE FIELD</span>
            <span className="mono-meta">UPDATED 2026-05-10</span>
          </div>
        </div>

        <div className="page compare-hero">
          <div className="mono" style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: "var(--ignition)",
                borderRadius: 999,
              }}
            />
            <span>POSITIONING</span>
          </div>
          <h1>
            Adjacent tools, <em>different shape.</em>
          </h1>
          <p className="lede">
            Most tools that touch product knowledge optimize for retrieval, drafting, or session
            memory. Assay optimizes for <span className="serif-it">decision provenance</span>{" "}
            &mdash; the audit trail behind a choice. Here&rsquo;s where it stops being the same
            problem.
          </p>
        </div>

        {GROUPS.map((g) => (
          <section key={g.heading} className="compare-section">
            <div className="page">
              <div className="sec-head">
                <h2>{g.heading}</h2>
                <p className="blurb">{g.blurb}</p>
              </div>
              <div className="compare-grid">
                {g.items.map((c) => (
                  <div key={c.name} className="cmp">
                    <div className="head">
                      <div className="nm">{c.name}</div>
                      <div className="shape">{c.shape}</div>
                    </div>
                    <p>{c.nature}</p>
                    <div className="vs">
                      <div className="vs-lbl">{c.assayLbl ?? "Assay differs"}</div>
                      <div className="vs-text">{c.assay}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <Footer />
      </main>
    </>
  );
}
