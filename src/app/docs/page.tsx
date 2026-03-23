import Link from "next/link";

export default function DocsOverviewPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        What is Assay?
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        The intelligence ledger for product teams that ship.
      </p>

      <section className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Assay turns your PRDs, strategy documents, research notes, and
          recorded decisions into a structured corpus of cited claims that your
          AI tools can query. Instead of relying on stale memory or keyword
          search, every proposal and decision gets checked against what your
          organization actually knows — with source links, confidence levels,
          and contradiction detection built in.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          It runs locally alongside Claude Code as an MCP server. Documents are
          ingested from Notion (or Confluence), chunked at heading boundaries,
          embedded with OpenAI, and optionally decomposed into atomic claims.
          Retrieval uses reciprocal rank fusion across vector similarity, claim
          matching, and full-text search. There is no cloud dependency beyond
          your embedding provider — your data stays on your Postgres instance.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Architecture
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`
  Notion / Confluence          Claude Code (MCP Client)
       │                              │
       ▼                              ▼
  ┌──────────┐    ingest     ┌─────────────────┐
  │  Source   │ ──────────►  │  Assay MCP       │
  │  Pages    │              │  Server          │
  └──────────┘              │                 │
                             │  ┌───────────┐  │
                             │  │ Chunker   │  │
                             │  └─────┬─────┘  │
                             │        ▼        │
                             │  ┌───────────┐  │
                             │  │ Embedder  │  │   OpenAI
                             │  │ (1536-d)  │◄─┼──► text-embedding-3-small
                             │  └─────┬─────┘  │
                             │        ▼        │
                             │  ┌───────────┐  │
                             │  │ Claim     │  │   Ollama / Anthropic
                             │  │ Extractor │◄─┼──► or Claude Subagent
                             │  └─────┬─────┘  │
                             │        ▼        │
                             │  ┌───────────┐  │
                             │  │ Postgres  │  │
                             │  │ + pgvector│  │
                             │  └───────────┘  │
                             └─────────────────┘
                                      │
                          ┌───────────┼───────────┐
                          ▼           ▼           ▼
                       brief    stress_test   retrieve
`}</code>
        </pre>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Prerequisites
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>PostgreSQL 15+</strong> with the{" "}
              <code>pgvector</code> extension enabled
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Node.js 20+</strong> (LTS recommended)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>OpenAI API key</strong> — used for generating text
              embeddings
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Claude Code</strong> — the MCP client that connects to
              Assay
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Notion API key</strong> (optional) — only needed if
              ingesting from Notion
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Next Step
        </h2>
        <p className="text-[hsl(220,15%,93%)]">
          Ready to get started?{" "}
          <Link
            href="/docs/installation"
            className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
          >
            Install Assay &rarr;
          </Link>
        </p>
      </section>
    </article>
  );
}
