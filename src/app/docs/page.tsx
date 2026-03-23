/* ────────────────────────────────────────────────────────
   Docs — single continuous-scroll page (server component)
   All sections render at once; sidebar links are anchor scrolls.
   ──────────────────────────────────────────────────────── */

const linkCls =
  "text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110";

/* ════════════════════════════════════════════════════════
   Placeholder for sections without content yet
   ════════════════════════════════════════════════════════ */

function ComingSoon({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="scroll-mt-8 py-16">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        {title}
      </h1>
      <p className="text-[hsl(220,10%,55%)]">
        This section is under construction.
      </p>
    </section>
  );
}

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
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          It runs locally alongside Claude Code as an MCP server. Documents are
          ingested from Notion (or Confluence), chunked at heading boundaries,
          embedded with OpenAI, and optionally decomposed into atomic claims.
          Retrieval uses reciprocal rank fusion across vector similarity, claim
          matching, and full-text search. There is no cloud dependency beyond
          your embedding provider — your data stays on your Postgres instance.
        </p>
      </div>

      <div className="mb-10">
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

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Next Step
        </h2>
        <p className="text-[hsl(220,15%,93%)]">
          Ready to get started?{" "}
          <a href="#installation" className={linkCls}>
            Install Assay &rarr;
          </a>
        </p>
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
      </div>

      {/* Clone and install */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          1. Clone and Install
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`git clone https://github.com/levievanshantz/assay.git
cd assay
npm install
cp .env.local.example .env.local`}</code>
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

      {/* Next step */}
      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Next Step
        </h2>
        <p className="text-[hsl(220,15%,93%)]">
          Your Assay instance is ready.{" "}
          <a href="#quickstart" className={linkCls}>
            Continue to the Quick Start guide &rarr;
          </a>
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
                  Anthropic
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Subagent
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
                  <code>anthropic</code>
                </td>
                <td className="px-4 py-3">
                  <code>subagent</code>
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Requires API key
                </td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">
                  Yes (<code>ANTHROPIC_API_KEY</code>)
                </td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Requires Claude Code
                </td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Runs locally
                </td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                <td className="px-4 py-3">No (API call)</td>
                <td className="px-4 py-3">Hybrid</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Claim quality (F1)
                </td>
                <td className="px-4 py-3">83.1%</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">93.8%</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">93.8%</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Cost per 1K sections
                </td>
                <td className="px-4 py-3">$0 (electricity only)</td>
                <td className="px-4 py-3">~$2.40</td>
                <td className="px-4 py-3">Included in Claude Code plan</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Speed (100 sections)
                </td>
                <td className="px-4 py-3">~8 min (M2 Max)</td>
                <td className="px-4 py-3">~45 sec</td>
                <td className="px-4 py-3">~90 sec</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Parallelism
                </td>
                <td className="px-4 py-3">1 (sequential)</td>
                <td className="px-4 py-3">Up to 10 concurrent</td>
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
              <strong>Recommended:</strong> 32 GB RAM, Apple M2 Pro/Max or NVIDIA
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
          corpora.
        </p>

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
      <ComingSoon id="how-it-works" title="How It Works" />
      <HR />
      <ComingSoon id="evidence-and-claims" title="Evidence & Claims" />
      <HR />
      <ComingSoon id="retrieval" title="Retrieval Pipeline" />
      <HR />

      {/* Tools Reference */}
      <ComingSoon id="tools-brief" title="brief" />
      <HR />
      <ComingSoon id="tools-stress-test" title="stress_test" />
      <HR />
      <ComingSoon id="tools-retrieve-evidence" title="retrieve_evidence" />
      <HR />
      <ComingSoon id="tools-sync-notion" title="sync_notion" />
      <HR />
      <ComingSoon id="tools-health-check" title="health_check" />
      <HR />

      {/* Configuration */}
      <ExtractionModesSection />
      <HR />
      <ComingSoon id="feature-toggles" title="Feature Toggles" />
      <HR />
      <ComingSoon id="presets" title="Presets" />
      <HR />

      {/* Guides */}
      <ComingSoon id="guides-notion" title="Notion Ingestion" />
      <HR />
      <ComingSoon id="guides-hygiene" title="Background Hygiene" />
      <HR />
      <ComingSoon id="guides-troubleshooting" title="Troubleshooting" />
    </main>
  );
}
