/* ────────────────────────────────────────────────────────
   Docs — single continuous-scroll page (server component)
   All sections render at once; sidebar links are anchor scrolls.
   ──────────────────────────────────────────────────────── */

const linkCls =
  "text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110";

/* ════════════════════════════════════════════════════════
   SECTION: Overview
   ════════════════════════════════════════════════════════ */

function OverviewSection() {
  return (
    <section id="overview" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        What is Assay?
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        The intelligence ledger for product teams that ship.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Assay turns your PRDs, strategy documents, research notes, and
          recorded decisions into a structured corpus of cited claims that your
          AI tools can query. Instead of relying on stale memory or keyword
          search, every proposal and decision gets checked against what your
          organization actually knows — with source links, confidence levels,
          and contradiction detection built in.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          It runs locally alongside <strong>Claude Code</strong> as an <strong>MCP server</strong>. Documents are
          ingested from Notion (or Confluence), chunked at heading boundaries,
          embedded with OpenAI, and optionally decomposed into atomic claims.
          Retrieval uses <strong>reciprocal rank fusion</strong> across vector similarity, claim
          matching, and full-text search. There is no cloud dependency beyond
          your embedding provider — your data stays on your <strong>PostgreSQL</strong> instance
          with <strong>pgvector</strong>.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Standard RAG retrieves document chunks by vector similarity — but a
          single embedding averages the semantics of ~3,200 characters, losing
          the signal of individual sentences that point in a different direction.
          The claims layer decomposes each section into atomic assertions —
          constraints, commitments, deferrals, assumptions — each with its own
          embedding. This lets retrieval surface long-tail evidence that
          document-level search misses: a dissenting observation buried in a
          supportive PRD, a scope deferral from six months ago that&#39;s suddenly
          relevant, a constraint from a customer interview that contradicts a new
          proposal. In a 2026 product environment where development cycles are
          compressed and there&#39;s too much context to manually review, the ability
          to stress-test expeditiously against comprehensive organizational
          evidence is the advantage.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Architecture
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`
  Notion / Confluence            Claude Code (MCP Client)
       │                                │
       ▼                                ▼
  ┌──────────┐      ingest      ┌──────────────────┐
  │  Source   │ ─────────────►  │   Assay MCP      │
  │  Pages    │                 │   Server         │
  └──────────┘                  │                  │
                                │  ┌────────────┐  │
                                │  │  Chunker   │  │
                                │  └─────┬──────┘  │
                                │        ▼         │
                                │  ┌────────────┐  │
                                │  │  Embedder  │  │   OpenAI
                                │  │  (1536-d)  │◄─┼──► text-embedding-3-small
                                │  └─────┬──────┘  │
                                │        ▼         │
                                │  ┌────────────┐  │
                                │  │  Claim     │  │   Ollama / Anthropic
                                │  │  Extractor │◄─┼──► or Claude Subagent
                                │  └─────┬──────┘  │
                                │        ▼         │
                                │  ┌────────────┐  │
                                │  │  Postgres  │  │
                                │  │  + pgvector│  │
                                │  └────────────┘  │
                                └──────────────────┘
                                        │
                            ┌───────────┼───────────┐
                            ▼           ▼           ▼
                         brief    stress_test   retrieve
`}</code>
        </pre>
      </div>

      <div className="mb-10">
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
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Installation
   ════════════════════════════════════════════════════════ */

function InstallationSection() {
  return (
    <section id="installation" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Installation
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Get Assay running on your machine in under 10 minutes.
      </p>

      {/* Prerequisites */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Prerequisites
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>PostgreSQL 15+</strong> with the <code>pgvector</code>{" "}
              extension installed and enabled
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Node.js 20+</strong> — we recommend the current LTS
              release
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>OpenAI API key</strong> — required for embedding
              generation (
              <code>text-embedding-3-small</code>)
            </span>
          </li>
        </ul>

        {/* Admin note callout */}
        <div className="mt-6 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Note:</strong> You will
            need admin or superuser access to your PostgreSQL instance to enable
            the <code>pgvector</code> extension. If you are using a managed
            provider (Supabase, Neon, etc.), pgvector is typically pre-installed
            — just run{" "}
            <code>CREATE EXTENSION IF NOT EXISTS vector;</code> in a SQL console.
          </p>
        </div>

        {/* Embedding cost note */}
        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Embedding cost:</strong>{" "}
            Embedding cost is approximately $0.02 per million tokens — negligible
            for most corpora. A 130-page Notion workspace costs roughly $0.08 to
            fully embed.
          </p>
        </div>

        {/* Local embeddings note */}
        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Local embeddings:</strong>{" "}
            A local embedding option (BAAI/bge-large-en-v1.5 via ONNX) is
            available for fully offline operation. Set{" "}
            <code>EMBEDDING_PROVIDER=local</code> in your environment. See the{" "}
            <a href="#feature-toggles" className={linkCls}>Configuration</a>{" "}
            section for details.
          </p>
        </div>
      </div>

      {/* Clone and install */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          1. Clone and Install
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`git clone https://github.com/levievanshantz/assay.git`}</code>
        </pre>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`cd assay`}</code>
        </pre>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`npm install`}</code>
        </pre>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`cp .env.local.example .env.local`}</code>
        </pre>
      </div>

      {/* Environment variables */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          2. Configure Environment Variables
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Open <code>.env.local</code> and fill in the values below.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Variable
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Required
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="text-[hsl(220,15%,93%)]">
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3">
                  <code>DATABASE_URL</code>
                </td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                <td className="px-4 py-3">
                  PostgreSQL connection string. Example:{" "}
                  <code>postgresql://localhost:5432/assay</code>
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3">
                  <code>OPENAI_API_KEY</code>
                </td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                <td className="px-4 py-3">
                  Used by the embedding pipeline (
                  <code>text-embedding-3-small</code>, 1536 dimensions)
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3">
                  <code>ANTHROPIC_API_KEY</code>
                </td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                <td className="px-4 py-3">
                  Required only when <code>EXTRACTION_MODE=anthropic</code>.
                  Not needed for Ollama or subagent extraction.
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3">
                  <code>NOTION_API_KEY</code>
                </td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                <td className="px-4 py-3">
                  Notion integration token. Required only if you plan to ingest
                  pages from Notion.
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3">
                  <code>EXTRACTION_MODE</code>
                </td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                <td className="px-4 py-3">
                  Claim extraction backend:{" "}
                  <code>ollama</code>, <code>anthropic</code>, or{" "}
                  <code>subagent</code>. Defaults to <code>subagent</code>.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <code>PRODUCT_ID</code>
                </td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                <td className="px-4 py-3">
                  UUID that scopes all evidence to a single product. Auto-generated
                  on first run if not set.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Database setup */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          3. Set Up the Database
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          This command creates the required tables, enables pgvector, sets up
          indexes, and runs any pending migrations.
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run setup-db`}</code>
        </pre>
      </div>

      {/* Build */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          4. Build
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Compile the MCP server and all supporting scripts.
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run build`}</code>
        </pre>
      </div>

      {/* Verify */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          5. Verify
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Run the built-in verification suite to confirm everything is wired
          correctly.
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run verify`}</code>
        </pre>
        <p className="text-[hsl(220,15%,93%)] mt-4">
          You should see green checks for database connectivity, pgvector
          extension, embedding generation, and table schema validation.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Quick Start
   ════════════════════════════════════════════════════════ */

function QuickStartSection() {
  return (
    <section id="quickstart" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Quick Start
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        See value in 5 minutes.
      </p>

      {/* Step 1: Seed */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          1. Seed the Demo Corpus
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Assay ships with a small demo corpus — a handful of product strategy
          documents, research summaries, and decision records — so you can
          explore retrieval and stress-testing without connecting any real data
          sources first.
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run seed-demo`}</code>
        </pre>
        <p className="text-[hsl(220,10%,55%)] mt-3 text-sm">
          This inserts roughly 40 evidence records and 120 extracted claims into
          your local database. It takes about 30 seconds while embeddings are
          generated.
        </p>
      </div>

      {/* Step 2: Configure Claude Code */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          2. Configure Claude Code
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Register Assay as an MCP server so Claude Code can call its tools.
          Add the following to your project&rsquo;s{" "}
          <code>.claude/settings.local.json</code>:
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`{
  "mcpServers": {
    "assay": {
      "command": "node",
      "args": ["/absolute/path/to/assay/dist/index.js"],
      "env": {
        "DATABASE_URL": "postgresql://localhost:5432/assay",
        "OPENAI_API_KEY": "sk-..."
      }
    }
  }
}`}</code>
        </pre>
        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Tip:</strong> Replace{" "}
            <code>/absolute/path/to/assay</code> with the actual directory where
            you cloned the repository. The path must be absolute — Claude Code
            does not resolve relative paths for MCP servers.
          </p>
        </div>
      </div>

      {/* Step 3: Test it */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          3. Test It
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Open Claude Code in any project directory and try the following
          prompts:
        </p>

        <div className="space-y-4">
          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Verify the server is running:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`Run health_check`}</code>
            </pre>
          </div>

          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Get a briefing on a topic:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`Run brief "customer feedback"`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Expected output */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          What to Expect
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          The <code>health_check</code> tool returns a status object confirming
          database connectivity, record counts, and embedding model
          availability. If everything is green, the server is healthy.
        </p>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          The <code>brief</code> tool returns a structured summary of what your
          organization already knows about the given topic. It includes:
        </p>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Context summary</strong> — a narrative overview of the
              topic drawn from your evidence
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Prior work</strong> — existing decisions, research, and
              documents that address the topic
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Active constraints</strong> — known blockers, limitations,
              and guardrails
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Unresolved debates</strong> — open questions and
              contradictions found across sources
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Open questions</strong> — gaps the team has not yet
              addressed
            </span>
          </li>
        </ul>
      </div>

      {/* Next steps */}
      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Next Steps
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#how-it-works" className={linkCls + " text-left"}>
              Learn how the pipeline works end-to-end
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#guides-notion" className={linkCls + " text-left"}>
              Ingest your own Notion pages
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#tools-stress-test" className={linkCls + " text-left"}>
              Stress-test a proposal against your evidence
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#extraction-modes" className={linkCls + " text-left"}>
              Choose an extraction mode
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: How It Works
   ════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        How It Works
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        The five-step pipeline from source document to retrievable intelligence.
      </p>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Ingestion Pipeline
        </h2>
        <div className="space-y-6 text-[hsl(220,15%,93%)] leading-relaxed">
          <div>
            <h3 className="text-lg font-medium mb-2">1. Ingest</h3>
            <p>
              Source pages are fetched from Notion or Confluence via their APIs.
              Each page&#39;s content is converted to a normalized Markdown
              representation, preserving heading structure.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">2. Chunk</h3>
            <p>
              The Markdown is split at heading boundaries into sections of
              approximately 3,200 characters each. These become your evidence
              records — the atomic units of document-level storage.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">3. Embed</h3>
            <p>
              Each evidence section is embedded into a 1536-dimensional vector
              using OpenAI&#39;s <code>text-embedding-3-small</code> model. The
              vector is stored in PostgreSQL via pgvector alongside the raw text.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">4. Extract Claims</h3>
            <p>
              Optionally, each section is decomposed into atomic claims — individual
              assertions with their own type, epistemic layer, confidence score,
              and independently computed embedding. This is the step that enables
              granular retrieval beyond what chunk-level search can achieve.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">5. Retrieve</h3>
            <p>
              At query time, four parallel search lanes fire and their results
              merge via reciprocal rank fusion (RRF) into a single ranked list.
              Claims resolve back to their parent evidence records via a{" "}
              <code>source_id</code> foreign key, so you always get full context.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          4-Layer Hybrid Retrieval
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Each query runs four search lanes in parallel:
        </p>
        <ol className="space-y-3 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">1.</span>
            <span>
              <strong>Evidence vector search</strong> — cosine similarity against
              evidence record embeddings. Catches semantically related sections.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">2.</span>
            <span>
              <strong>Claims vector search</strong> — cosine similarity against
              individual claim embeddings. Catches atomic assertions that point
              in a different semantic direction than their parent section.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">3.</span>
            <span>
              <strong>Evidence full-text search</strong> — PostgreSQL{" "}
              <code>ts_rank</code> against evidence text. Catches exact
              terminology and proper nouns that vector search may miss.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">4.</span>
            <span>
              <strong>Claims full-text search</strong> — full-text search against
              claim text. Catches specific terms used in individual assertions.
            </span>
          </li>
        </ol>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mt-4">
          Results from all four lanes are merged via <strong>reciprocal rank
          fusion</strong> (RRF). Claims resolve back to their parent evidence
          records via the <code>source_id</code> foreign key, so the final result
          set contains full-context sections rather than isolated sentences.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Evidence & Claims
   ════════════════════════════════════════════════════════ */

function EvidenceAndClaimsSection() {
  return (
    <section id="evidence-and-claims" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Evidence &amp; Claims
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        The two-layer data model that powers granular retrieval.
      </p>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Evidence Records
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          An evidence record is a section of approximately 3,200 characters
          extracted from a source document at heading boundaries. Each record
          stores the raw text, a 1536-dimensional embedding vector, source
          metadata (page URL, title, heading path), and a content hash for
          drift detection.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Evidence records are the primary unit of retrieval. They provide the
          full context window that tools like <code>brief</code> and{" "}
          <code>stress_test</code> synthesize from. Every claim links back to
          exactly one evidence record.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Claims
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          A claim is an atomic assertion extracted from an evidence record —
          a single statement that can be independently verified, contradicted,
          or cited. Each claim gets its own embedding vector, which may point
          in a semantically different direction than its parent section. This is
          what enables retrieval of individual assertions that chunk-level
          averaging would lose.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          On average, claim extraction adds 10.7 additional unique records per
          query, surfacing evidence that document-level search alone would miss.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Claim Types
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Every claim is classified into one of seven types:
        </p>
        <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Type</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(220,15%,93%)]">
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>finding</code></td>
                <td className="px-4 py-3">An observed fact or data point from research</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>recommendation</code></td>
                <td className="px-4 py-3">A suggested course of action</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>assumption</code></td>
                <td className="px-4 py-3">A belief taken as given without direct evidence</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>metric</code></td>
                <td className="px-4 py-3">A quantitative measurement or target</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>constraint</code></td>
                <td className="px-4 py-3">A limitation, blocker, or guardrail</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>commitment</code></td>
                <td className="px-4 py-3">A promise or agreed-upon deliverable</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>deferral</code></td>
                <td className="px-4 py-3">A decision explicitly postponed to a later date</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Epistemic Layers
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Each claim also carries an epistemic layer classification:
        </p>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Observation</strong> — a factual report of what was seen or measured
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Interpretation</strong> — an analysis or conclusion drawn from observations
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Intention</strong> — a stated plan, goal, or commitment to act
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Retrieval Pipeline
   ════════════════════════════════════════════════════════ */

function RetrievalSection() {
  return (
    <section id="retrieval" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Retrieval Pipeline
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        How queries become ranked evidence.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Every retrieval query fires four parallel search lanes, each capturing
          a different axis of relevance:
        </p>
        <ol className="space-y-3 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">1.</span>
            <span>
              <strong>Evidence vector search</strong> — finds semantically similar
              document sections via cosine distance against evidence embeddings.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">2.</span>
            <span>
              <strong>Claims vector search</strong> — finds individual assertions
              whose embeddings are close to the query, even when the parent
              section&#39;s overall embedding diverges.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">3.</span>
            <span>
              <strong>Evidence full-text search</strong> — PostgreSQL{" "}
              <code>tsvector</code> ranking for exact keyword matches in
              evidence records.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">4.</span>
            <span>
              <strong>Claims full-text search</strong> — keyword matches
              against the text of individual claims.
            </span>
          </li>
        </ol>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Why RRF
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Different search methods catch different things. Vector search finds
          semantic similarity but can miss exact terminology. Full-text search
          catches precise keywords but misses paraphrased content. Claims search
          catches individual assertions lost in chunk-level embedding averaging.
          Reciprocal rank fusion merges ranked results from all four lanes into
          a single list, weighting results that appear across multiple lanes
          more heavily.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Configurable K Values
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          K values (the number of evidence records retrieved) are configurable
          via environment variables. Default: <code>brief</code> uses K=20,{" "}
          <code>stress_test</code> uses K=100.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: retrieve
   ════════════════════════════════════════════════════════ */

function RetrieveSection2() {
  return (
    <section id="tools-retrieve" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        retrieve
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Query the corpus with four retrieval modes.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The <code>retrieve</code> tool is the primary interface to the corpus.
          It runs 4-layer hybrid search and returns results in one of four modes,
          each suited to a different workflow. Default retrieval depth is K=20
          evidence records.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Four Modes
        </h2>
        <ul className="space-y-4 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>raw</strong> — returns top-K evidence records with RRF
              scores. No LLM call. Fastest and cheapest.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>guided</strong> — returns evidence plus an{" "}
              <code>eval_instructions</code> field. The calling LLM processes
              the results itself — zero extra API cost.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>evaluate</strong> — the server calls an LLM to synthesize
              findings and returns a plain-language summary.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>brief</strong> — generates a structured organizational
              briefing: context summary, prior work, active constraints,
              unresolved debates, open questions, and dependencies. Each brief
              deposits its synthesis back into the corpus, creating an
              accumulation loop.
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Brief Output
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          When using <code>mode=&quot;brief&quot;</code>, the tool returns:
        </p>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Context summary</strong> — narrative overview of the topic from your corpus</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Prior work</strong> — existing decisions, research, and documents</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Active constraints</strong> — known blockers and guardrails</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Unresolved debates</strong> — contradictions found across sources</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Open questions</strong> — gaps the team has not addressed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Dependencies</strong> — related work and cross-cutting concerns</span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Examples
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Raw retrieval:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`retrieve "competitive landscape" mode="raw" top_k=30`}</code>
            </pre>
          </div>
          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Organizational briefing (default K=20):
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`retrieve "customer onboarding friction" mode="brief"`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Retrieval Depth
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Default K=20 evidence records. Configurable per call via{" "}
          <code>top_k</code> parameter or globally via environment variables.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: stress_test
   ════════════════════════════════════════════════════════ */

function StressTestSection() {
  return (
    <section id="tools-stress-test" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        stress_test
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Stress-test a proposal against organizational evidence.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The <code>stress_test</code> tool takes a proposal or plan and
          rigorously evaluates it against your corpus. It finds supporting
          evidence, surfaces contradictions, identifies assumption weaknesses,
          and delivers a verdict with confidence level.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          What It Returns
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Verdict</strong> — one of: <code>ready</code>, <code>ready_with_conditions</code>, <code>blocked</code>, <code>needs_clarification</code></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Overlap analysis</strong> — where the proposal aligns with existing evidence</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Conflict analysis</strong> — contradictions found in the corpus</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Assumption weaknesses</strong> — unstated or fragile assumptions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Evidence gaps</strong> — areas where the corpus has no data</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Supporting evidence</strong> — records that back the proposal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Alternatives</strong> — other approaches suggested by the evidence</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Falsification check</strong> — what evidence would need to be true for the proposal to fail</span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Example
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`stress_test "We should migrate from PostgreSQL to MongoDB"`}</code>
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Retrieval Depth
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Default K=100 evidence records (no artificial ceiling). K values are
          configurable via environment variables.
        </p>
      </div>
    </section>
  );
}

/* RetrieveEvidenceSection removed — folded into RetrieveSection2 above */

/* ════════════════════════════════════════════════════════
   SECTION: sync
   ════════════════════════════════════════════════════════ */

function SyncSection() {
  return (
    <section id="tools-sync" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        sync
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Keep your corpus in sync with source documents.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The <code>sync</code> tool checks all tracked source pages for
          changes, updates modified sections, and removes deleted ones. It uses
          content hash comparison and a 0.95 cosine similarity threshold to
          distinguish meaningful changes from cosmetic edits.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Three Outcomes Per Section
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Unchanged</strong> — content hash matches. No action taken.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Cosmetic update</strong> — hash differs but cosine
              similarity is &ge; 0.95. Re-embed but skip claim re-extraction.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Meaningful change</strong> — cosine similarity is &lt;
              0.95. Re-embed and re-extract claims.
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Tombstoning
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Pages that no longer exist in the source are tombstoned — marked
          inactive rather than hard-deleted. Their evidence records remain
          available for historical queries but are excluded from active
          retrieval.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Circuit Breaker
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          If more than 20% of tracked pages show changes in a single sync run,
          the process halts automatically. This prevents runaway embedding and
          extraction costs from bulk edits or API errors. Review the drift
          report and re-run manually if the changes are intentional.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: health_check
   ════════════════════════════════════════════════════════ */

function HealthCheckSection() {
  return (
    <section id="tools-health-check" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        health_check
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Verify your Assay installation is working correctly.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The <code>health_check</code> tool performs a comprehensive diagnostic
          of your Assay installation and reports exactly what is working and
          what needs fixing.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          What It Reports
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Database status</strong> — connection, schema version, migration state</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Record counts</strong> — evidence records, claims, products</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>pgvector status</strong> — extension installed, HNSW index operational</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Embedding API</strong> — OpenAI connectivity and model availability</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Extraction mode</strong> — current backend and its readiness</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Notion connectivity</strong> — integration token validity (if configured)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Drift summary</strong> — how many tracked pages are stale</span>
          </li>
        </ul>
      </div>

      <div>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Run <code>health_check</code> after installation to verify setup, and
          periodically to catch configuration drift. When something is broken,
          the tool reports the specific issue and how to fix it.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Extraction Modes
   ════════════════════════════════════════════════════════ */

function ExtractionModesSection() {
  return (
    <section id="extraction-modes" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Extraction Modes
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Choose how Assay decomposes document sections into atomic claims.
      </p>

      {/* Intro */}
      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          After a document is chunked and embedded, Assay optionally runs a
          claim extraction pass that breaks each section into standalone,
          cited assertions. These claims power contradiction detection,
          granular retrieval, and the stress-test verdict engine. The
          extraction backend is controlled by the{" "}
          <code>EXTRACTION_MODE</code> environment variable.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Three modes are available. Each trades off cost, speed, quality,
          and infrastructure requirements differently.
        </p>
      </div>

      {/* Comparison table */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Comparison
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  &nbsp;
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Ollama
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Claude Sonnet
                </th>
              </tr>
            </thead>
            <tbody className="text-[hsl(220,15%,93%)]">
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Environment variable
                </td>
                <td className="px-4 py-3">
                  <code>ollama</code>
                </td>
                <td className="px-4 py-3">
                  <code>anthropic</code> or <code>subagent</code>
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Requires API key
                </td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">
                  API key or Claude Code subscription
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Requires Claude Code
                </td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">Only for subagent mode</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Runs locally
                </td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                <td className="px-4 py-3">API call or Claude Code</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Claim quality (F1)
                </td>
                <td className="px-4 py-3">83.1%</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">93.8%</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Cost per 1K sections
                </td>
                <td className="px-4 py-3">$0 (electricity only)</td>
                <td className="px-4 py-3">~$2.40 or included in Claude Code plan</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Speed (100 sections)
                </td>
                <td className="px-4 py-3">~8 min (M2 Max)</td>
                <td className="px-4 py-3">~45-90 sec</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Parallelism
                </td>
                <td className="px-4 py-3">1 (sequential)</td>
                <td className="px-4 py-3">Up to 10 concurrent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ollama */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Ollama (Local)
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The Ollama mode runs extraction entirely on your machine using a
          locally hosted model. No API keys are needed beyond the OpenAI key
          used for embeddings. This is the best choice when data sensitivity
          rules out sending content to third-party APIs.
        </p>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Setup
        </h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-4">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# Install Ollama (macOS)
brew install ollama

# Pull the recommended model
ollama pull phi4:14b

# Set the extraction mode
# In .env.local:
EXTRACTION_MODE=ollama`}</code>
        </pre>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Hardware Requirements
        </h3>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Minimum:</strong> 16 GB RAM, Apple M1 or equivalent. The
              8B parameter model requires roughly 6 GB of VRAM.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Recommended:</strong> 24 GB RAM, Apple M2 Pro/Max or NVIDIA
              GPU with 12+ GB VRAM for comfortable throughput.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              Extraction runs sequentially (one section at a time) to avoid
              saturating local compute.
            </span>
          </li>
        </ul>

        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Model size note:</strong>{" "}
            The 14B parameter size is required because claim extraction needs
            sufficient context window and reasoning capability. Sub-7B models
            produce unacceptable quality without fine-tuning (LoRA), which may
            come to future models.
          </p>
        </div>

        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(38,92%,50%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(38,92%,50%)]">Quality note:</strong>{" "}
            Ollama extraction achieves 83.1% F1 on our internal eval suite.
            The 8B model occasionally misses implicit claims and can
            hallucinate provenance on ambiguous passages. For production
            corpora where accuracy matters, consider Anthropic or Subagent
            mode.
          </p>
        </div>
      </div>

      {/* Anthropic */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Anthropic (API)
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The Anthropic mode calls the Claude API directly using your
          Anthropic API key. It produces the highest quality extractions and
          runs with up to 10 concurrent requests for fast throughput on large
          corpora. The recommended model is <strong>Claude Sonnet 4.6</strong>.
        </p>

        <div className="mb-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Coming soon:</strong>{" "}
            Haiku support is incoming for lighter-weight extraction at lower cost.
          </p>
        </div>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Setup
        </h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-4">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# In .env.local:
EXTRACTION_MODE=anthropic
ANTHROPIC_API_KEY=sk-ant-...`}</code>
        </pre>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Cost Estimate
        </h3>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Each section extraction prompt is roughly 800 input tokens and 400
          output tokens. At current Claude Sonnet pricing, processing 1,000
          sections costs approximately $2.40. A typical 30-page Notion
          workspace generates around 150 sections, costing about $0.36 per
          full ingestion pass.
        </p>
      </div>

      {/* Subagent */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Subagent (Claude Code)
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The subagent mode delegates extraction to Claude Code itself by
          spawning stateless sub-agents via the Agent tool. Each section gets
          its own fresh agent with only the extraction prompt and section text —
          no accumulated context, no cross-contamination between sections.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          This is the default mode. It requires no additional API keys because
          it runs under your existing Claude Code session. Quality matches the
          Anthropic mode (93.8% F1) since the same model family is used.
        </p>

        <div className="mb-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">Subscription note:</strong>{" "}
            A Claude Code Max (20x) subscription provides sufficient token
            budget for most corpora. For large workspaces (500+ pages), consider
            running extraction overnight. A 5x subscription can handle smaller
            corpora but may hit rate limits on large runs.
          </p>
        </div>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Setup
        </h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-4">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# In .env.local (this is the default, so you can omit it):
EXTRACTION_MODE=subagent`}</code>
        </pre>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          How It Works
        </h3>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">1.</span>
            <span>
              The ingestion pipeline identifies sections that need claim
              extraction.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">2.</span>
            <span>
              For each section, Assay spawns a Claude Code subagent with a
              structured prompt and the raw section text.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">3.</span>
            <span>
              The subagent returns an array of atomic claims with confidence
              scores and source references.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">4.</span>
            <span>
              Up to 10 subagents run concurrently. Each is stateless — no
              context leaks between sections.
            </span>
          </li>
        </ul>

        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">
              Context isolation:
            </strong>{" "}
            Each subagent receives only the extraction prompt and the section
            text. It does not see other sections, previous extraction results,
            or any accumulated state. This is a deliberate design constraint
            that prevents context bleed and ensures reproducible extractions.
          </p>
        </div>
      </div>

      {/* Choosing a mode */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Choosing a Mode
        </h2>
        <div className="space-y-4 text-[hsl(220,15%,93%)] leading-relaxed">
          <p>
            <strong>Use Ollama</strong> if you need fully local processing, are
            working with sensitive data that cannot leave your machine, or want
            zero marginal cost. Accept the quality trade-off (83.1% vs 93.8%).
          </p>
          <p>
            <strong>Use Anthropic</strong> if you want the fastest throughput
            on large corpora, are running extraction in a CI/CD pipeline or
            automated workflow where Claude Code is not available, or need
            direct API access for scripting.
          </p>
          <p>
            <strong>Use Subagent</strong> (default) if you are running Assay
            interactively through Claude Code and want high quality extraction
            without managing a separate API key. This is the recommended mode
            for most teams.
          </p>
        </div>
      </div>

      {/* Related */}
      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Related
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#evidence-and-claims" className={linkCls + " text-left"}>
              Evidence and Claims — understand what gets extracted
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#feature-toggles" className={linkCls + " text-left"}>
              Feature Toggles — fine-tune extraction behavior
            </a>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <a href="#guides-notion" className={linkCls + " text-left"}>
              Notion Ingestion guide — put extraction to work
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Feature Toggles
   ════════════════════════════════════════════════════════ */

function FeatureTogglesSection() {
  return (
    <section id="feature-toggles" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Feature Toggles
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Fine-tune which pipeline stages run automatically.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Assay&#39;s pipeline stages can be independently enabled or disabled.
          Configuration is stored in <code>.assay.config.json</code> at the
          project root.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Available Toggles
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Toggle</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Default</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(220,15%,93%)]">
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>sync</code></td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
                <td className="px-4 py-3">Automatic drift detection and re-sync of tracked pages</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>extraction</code></td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
                <td className="px-4 py-3">Claim extraction from evidence sections during ingestion</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3"><code>accumulation</code></td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
                <td className="px-4 py-3">Brief and stress_test results deposited back into the corpus</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code>hygiene</code></td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Off</td>
                <td className="px-4 py-3">Scheduled background sync at a configured time</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Enabling / Disabling
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# Enable background hygiene
npx assay toggle hygiene on

# Disable claim extraction (evidence-only mode)
npx assay toggle extraction off

# Disable accumulation loop
npx assay toggle accumulation off`}</code>
        </pre>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Presets
   ════════════════════════════════════════════════════════ */

function PresetsSection() {
  return (
    <section id="presets" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Presets
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Pre-configured bundles that set all toggles at once.
      </p>

      <div className="mb-10">
        <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Preset</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Extraction</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Sync</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Accumulation</th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Hygiene</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(220,15%,93%)]">
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium">minimal</td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Off</td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Off</td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Off</td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Off</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium">standard <span className="text-[hsl(152,60%,52%)] text-xs">(recommended)</span></td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Daily</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
                <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Off</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">full</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On (Sonnet)</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Hourly</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">On</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          <strong>minimal</strong> — evidence only. No extraction, no
          accumulation, no sync. Good for quick evaluation or testing retrieval
          with pre-existing embeddings.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          <strong>standard</strong> (recommended) — evidence plus extraction
          with daily sync and accumulation enabled. This is the default
          configuration after installation. Covers the needs of most teams.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          <strong>full</strong> — evidence plus Sonnet-quality extraction with
          hourly sync, accumulation, and background hygiene all enabled. Best
          for teams with large, actively changing corpora.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Notion Ingestion
   ════════════════════════════════════════════════════════ */

function NotionIngestionSection() {
  return (
    <section id="guides-notion" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Notion Ingestion
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Ingest your Notion workspace into the Assay corpus.
      </p>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Setup
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          You need a Notion integration token. Create one at{" "}
          <a href="https://notion.so/my-integrations" className={linkCls} target="_blank" rel="noopener noreferrer">
            notion.so/my-integrations
          </a>{" "}
          and share the pages you want to ingest with the integration.
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# In .env.local:
NOTION_API_KEY=ntn_...`}</code>
        </pre>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Two-Step Pipeline
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Ingestion uses two scripts that run sequentially:
        </p>
        <ul className="space-y-3 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">1.</span>
            <span>
              <strong>notion-crawl.mjs</strong> — calls the Notion API to fetch
              page content, converts blocks to Markdown, and writes the result
              to a JSON cache file.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">2.</span>
            <span>
              <strong>notion-ingest.mjs</strong> — reads the JSON cache, chunks
              at heading boundaries, generates embeddings, stores evidence
              records in PostgreSQL, and optionally runs claim extraction.
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Incremental Mode
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          By default, the crawl script only re-fetches pages that have changed
          since the last run (based on Notion&#39;s <code>last_edited_time</code>).
          This makes subsequent ingestion runs fast — typically under 30 seconds
          for workspaces with few recent edits.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Background Hygiene
   ════════════════════════════════════════════════════════ */

function BackgroundHygieneSection() {
  return (
    <section id="guides-hygiene" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Background Hygiene
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Automated sync to keep your corpus fresh without manual intervention.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Background hygiene runs an automated sync at a configurable time.
          When enabled, it checks all tracked pages for drift and re-processes
          any that have changed.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Important Notes
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Default: OFF.</strong> Background hygiene is disabled by
              default. Enable it when you are ready with{" "}
              <code>npx assay toggle hygiene on</code>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Machine must be running.</strong> If your laptop is
              asleep when the scheduled time arrives, the sync fires on next
              wake.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Recommended schedule:</strong> daily at a quiet hour
              (e.g. 3 AM local time) to minimize disruption.
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Troubleshooting
   ════════════════════════════════════════════════════════ */

function TroubleshootingSection() {
  return (
    <section id="guides-troubleshooting" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Troubleshooting
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Common issues and how to fix them.
      </p>

      <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
              <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Issue</th>
              <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Cause</th>
              <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">Fix</th>
            </tr>
          </thead>
          <tbody className="text-[hsl(220,15%,93%)]">
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">Database connection refused</td>
              <td className="px-4 py-3">PostgreSQL not running</td>
              <td className="px-4 py-3">Start PostgreSQL: <code>brew services start postgresql@15</code> or equivalent</td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">Embedding generation fails</td>
              <td className="px-4 py-3">OpenAI API key expired or missing</td>
              <td className="px-4 py-3">Check <code>OPENAI_API_KEY</code> in <code>.env.local</code>. Verify at platform.openai.com.</td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">Notion crawl returns 0 pages</td>
              <td className="px-4 py-3">Integration disconnected or pages not shared</td>
              <td className="px-4 py-3">Re-share pages with the integration at notion.so/my-integrations</td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">Ollama extraction hangs</td>
              <td className="px-4 py-3">Ollama server not started</td>
              <td className="px-4 py-3">Run <code>ollama serve</code> in a separate terminal</td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3"><code>vector</code> extension not found</td>
              <td className="px-4 py-3">pgvector not installed</td>
              <td className="px-4 py-3">Install pgvector for your platform and run <code>CREATE EXTENSION vector;</code></td>
            </tr>
            <tr>
              <td className="px-4 py-3">Brief/stress_test returns empty results</td>
              <td className="px-4 py-3">Cold start — no evidence in corpus</td>
              <td className="px-4 py-3">Run <code>npm run seed-demo</code> or ingest your Notion pages first</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Glossary
   ════════════════════════════════════════════════════════ */

function GlossarySection() {
  return (
    <section id="glossary" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Glossary
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Key terms used throughout this documentation.
      </p>

      <dl className="space-y-4 text-[hsl(220,15%,93%)]">
        <div>
          <dt className="font-semibold">RRF (Reciprocal Rank Fusion)</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            Merges ranked results from multiple search methods into a single
            list. Results that appear in multiple lanes are weighted more heavily.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">pgvector</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            PostgreSQL extension for vector similarity search. Stores
            1536-dimensional embeddings alongside relational data.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Claims</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            Atomic assertions extracted from documents, each independently
            embedded for granular retrieval. A single evidence section may yield
            5-15 claims.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Evidence records</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            Document sections (~3,200 chars) stored with embeddings in
            PostgreSQL. The primary unit of storage and retrieval context.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Stance signal</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            A 0.0-1.0 score indicating how strongly a claim carries
            organizational dissent or constraint.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Tombstoning</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            Soft-deletion of outdated records. Tombstoned records are marked
            inactive but not hard-deleted, preserving historical context.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">Cosine distance gate</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            Minimum embedding distance threshold (0.10) used to filter
            redundant claims during extraction. Ensures each claim is
            semantically distinct.
          </dd>
        </div>
        <div>
          <dt className="font-semibold">HNSW index</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            Hierarchical Navigable Small World — a fast approximate nearest
            neighbor search index used by pgvector for efficient vector
            similarity queries.
          </dd>
        </div>
      </dl>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE — all sections rendered at once
   ════════════════════════════════════════════════════════ */

const HR = () => (
  <hr className="border-[hsl(220,15%,18%)] my-16" />
);

export default function DocsPage() {
  return (
    <main className="flex-1 min-w-0 px-6 py-10 md:px-12 lg:px-16 max-w-4xl overflow-y-auto scroll-smooth">
      {/* Getting Started */}
      <OverviewSection />
      <HR />
      <InstallationSection />
      <HR />
      <QuickStartSection />
      <HR />

      {/* Core Concepts */}
      <HowItWorksSection />
      <HR />
      <EvidenceAndClaimsSection />
      <HR />
      <RetrievalSection />
      <HR />

      {/* Tools Reference */}
      <BriefSection />
      <HR />
      <StressTestSection />
      <HR />
      <RetrieveEvidenceSection />
      <HR />
      <SyncSection />
      <HR />
      <HealthCheckSection />
      <HR />

      {/* Configuration */}
      <ExtractionModesSection />
      <HR />
      <FeatureTogglesSection />
      <HR />
      <PresetsSection />
      <HR />

      {/* Guides */}
      <NotionIngestionSection />
      <HR />
      <BackgroundHygieneSection />
      <HR />
      <TroubleshootingSection />
      <HR />

      {/* Reference */}
      <GlossarySection />
    </main>
  );
}
