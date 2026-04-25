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
        Institutional memory for product decisions. Local version — runs on your
        machine, no account, no cloud database, no API key required.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Assay turns your PRDs, strategy documents, research notes, and
          recorded decisions into a structured corpus of cited evidence that
          your AI tools can query. Instead of relying on stale memory or
          keyword search, every question and proposal gets checked against what
          your organization actually knows — with source links, citation
          tokens, and explicit refusal when the evidence is insufficient.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          This page describes the <strong>local version</strong> of Assay.
          Everything — the corpus, the embeddings, the full-text index, the
          retrieval engine — lives on your machine in a single SQLite file at{" "}
          <code>~/.assay/assay.db</code>. It plugs into Claude Code as an MCP
          server and exposes four slash commands plus a CLI.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Why local: your PRDs, research, and decisions are sensitive. Keeping
          them on-device means no tenant setup, no cloud bills, no network
          dependency at query time, and your data never leaves your laptop.
          Backup is <code>cp</code>. Moving machines is <code>cp</code>.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mt-4">
          A networked, multi-machine deployment is available as a separate
          build — see the{" "}
          <a href="/production" className={linkCls}>expanded deployment page</a>.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Architecture
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)] overflow-x-auto">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`
      ┌────────────────────────────────────────────────────────┐
      │                    Claude Code                          │
      │   /assay-retrieve   /assay-scan   /assay-stress-test    │
      └──────────────────────────┬─────────────────────────────┘
                                 │  MCP (stdio)
                                 ▼
      ┌────────────────────────────────────────────────────────┐
      │                   Assay MCP server                      │
      │                                                         │
      │    Ingest ──► Chunk ──► Embed ──► Store ──► Retrieve    │
      │      │           │         │         │          │       │
      │      ▼           ▼         ▼         ▼          ▼       │
      │   Markdown     512-tok   bge-large  SQLite   hybrid     │
      │   (Notion      heading-  1024d      + FTS5   vector     │
      │   optional)    aware     local      single   + text     │
      │                                     file     fusion     │
      └────────────────────────────┬───────────────────────────┘
                                   │
                                   ▼
                        ~/.assay/assay.db  (single file)
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
              <strong>Node.js 18+</strong> (LTS recommended). Required — the
              MCP server and CLI are Node processes.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>git</strong> — to clone the repo.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Claude Code</strong> (desktop app) — the MCP client that
              surfaces the slash commands. Any MCP-capable client works; Claude
              Code is the one we test against.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>~600 MB free disk</strong> — the embedding model
              (one-time ~420 MB download) plus your corpus.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>macOS or Linux.</strong> Windows is untested.
            </span>
          </li>
        </ul>

        <p className="text-sm text-[hsl(220,10%,60%)] mt-5">
          <strong className="text-[hsl(220,15%,93%)]">Optional upgrade:</strong>{" "}
          an <code>OPENAI_API_KEY</code> in the MCP env switches embeddings
          to <code>text-embedding-3-small</code> (1536-dim) for a modest
          retrieval-quality bump. Not required — the local{" "}
          <code>bge-large-en-v1.5</code> embedder (1024-dim) is the default
          and needs no network at query time.
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
        Five minutes from clone to first cited answer.
      </p>

      <div className="mb-10 rounded-lg bg-[hsl(220,15%,9%)] border border-[hsl(234,100%,71%)] p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-wider bg-[hsl(234,100%,71%)] text-[hsl(220,15%,5%)] px-2 py-1 rounded font-bold">
            5-minute install
          </span>
          <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)]">
            Local install
          </h2>
        </div>
        <p className="text-[hsl(220,15%,93%)] mb-4 leading-relaxed">
          Runs entirely on your machine as a single SQLite file at{" "}
          <code>~/.assay/assay.db</code>. No Docker, no account. Uses local
          embeddings (<code>bge-large-en-v1.5</code>, 1024-dim) by default —
          or OpenAI embeddings (<code>text-embedding-3-small</code>, 1536-dim)
          if <code>OPENAI_API_KEY</code> is present in the MCP env.
        </p>

        <h3 className="text-base font-semibold text-[hsl(220,15%,93%)] mb-2 mt-4">Prerequisites</h3>
        <ul className="space-y-1 text-[hsl(220,15%,93%)] mb-4 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Node.js 18+</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Claude Code</strong> installed (for the MCP integration)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>macOS or Linux (Windows untested)</span>
          </li>
        </ul>

        <h3 className="text-base font-semibold text-[hsl(220,15%,93%)] mb-2 mt-4">1. Clone + install</h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`git clone https://github.com/levievanshantz/assaylabs.git
cd assaylabs
npm install`}</code>
        </pre>

        <h3 className="text-base font-semibold text-[hsl(220,15%,93%)] mb-2 mt-4">2. Index a folder of markdown</h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`./node_modules/.bin/tsx bin/assay.ts add ~/my-prds --name prds
./node_modules/.bin/tsx bin/assay.ts index
./node_modules/.bin/tsx bin/assay.ts status`}</code>
        </pre>
        <p className="text-sm text-[hsl(220,10%,55%)] mb-4">
          First <code>index</code> downloads the local embedding model (~420MB,
          one-time). A 50-PRD folder finishes in under 60 seconds.
        </p>

        <h3 className="text-base font-semibold text-[hsl(220,15%,93%)] mb-2 mt-4">3. Wire up Claude Desktop via the launcher</h3>
        <p className="text-sm text-[hsl(220,15%,93%)] mb-2">
          The repo ships with a launcher script at{" "}
          <code>~/.local/bin/assay-mcp</code> that auto-discovers the built
          MCP server and decouples your Claude Desktop config from the repo
          path. Recommended over hard-coding the dist path. Add this{" "}
          <code>assay</code> entry to <code>mcpServers</code> in{" "}
          <code>claude_desktop_config.json</code>:
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`"assay": {
  "command": "/Users/YOU/.local/bin/assay-mcp",
  "args": [],
  "env": {
    "ASSAY_DB": "sqlite",
    "ASSAY_DB_PATH": "/Users/YOU/.assay/assay.db"
  }
}`}</code>
        </pre>
        <p className="text-sm text-[hsl(220,10%,55%)] mb-2">
          Restart Claude Desktop. Test with <code>/assay-retrieve</code>.
          Verify with <code>~/.local/bin/assay-mcp.doctor</code> — it checks
          the launcher, the config pointer, server boot, SQLite reachability,
          and recent log cleanliness in one pass. Run it any time Claude
          Desktop says &ldquo;assay disconnected.&rdquo;
        </p>
        <p className="text-sm text-[hsl(220,10%,55%)] mb-4">
          Direct (no launcher) wiring still works too — point{" "}
          <code>command</code> at <code>node</code> with{" "}
          <code>args: [&quot;/abs/path/mcp-server/dist/index.js&quot;]</code>.
        </p>

        <h3 className="text-base font-semibold text-[hsl(220,15%,93%)] mb-2 mt-4">4. Live-update (optional)</h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-3">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`./node_modules/.bin/tsx bin/assay.ts watch`}</code>
        </pre>

        <div className="mt-6 rounded bg-[hsl(220,15%,5%)] border-l-4 border-[hsl(40,90%,60%)] px-4 py-3">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(40,90%,60%)]">Known limitations:</strong>{" "}
            Single-machine only; no team sharing today. The schema is
            portable — when retention is proven, the same tables move to a
            hosted Postgres + pgvector tier for shared institutional graphs.
            If a query gives an obviously wrong top result, file it with the
            GitHub issue template; ranking tuning is an open work item.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-6">
        <p className="text-sm text-[hsl(220,15%,93%)]">
          <strong>Need multi-machine or team-shared setup?</strong>{" "}
          The networked build lives on its own page.{" "}
          <a href="/production" className={linkCls}>
            See the expanded deployment docs →
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
        "ASSAY_DB": "sqlite",
        "ASSAY_DB_PATH": "/Users/YOU/.assay/assay.db"
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
              Run a pre-flight check:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`Run scan`}</code>
            </pre>
          </div>

          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Get a briefing on a topic:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`retrieve "customer feedback" mode="brief"`}</code>
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
          The <code>scan</code> tool returns a pre-flight status: sync
          freshness, record counts, drift warnings, and corpus health. If
          everything looks good, you are ready to work.
        </p>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          The <code>retrieve</code> tool in <code>brief</code> mode returns a
          structured summary of what your organization already knows about the
          given topic. It includes:
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
              Each evidence section is embedded into a dense vector using{" "}
              <code>bge-large-en-v1.5</code> (<strong>1024-dim</strong>, runs
              in-process via <code>@xenova/transformers</code>, no API key).
              If <code>OPENAI_API_KEY</code> is configured, Assay uses{" "}
              <code>text-embedding-3-small</code> (<strong>1536-dim</strong>)
              instead for a retrieval-quality uplift. Vectors are stored as{" "}
              <code>BLOB</code> columns in SQLite with <code>sqlite-vec</code>{" "}
              providing cosine-distance functions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">4. Index for full-text</h3>
            <p>
              Each section is also indexed by SQLite <code>FTS5</code>{" "}
              (porter + unicode61 tokenizer) so retrieval can combine
              semantic vector similarity with exact lexical matching.
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
              <strong>Evidence full-text search</strong> — SQLite{" "}
              <code>FTS5</code> with a porter + unicode61 tokenizer. Catches
              exact terminology and proper nouns that vector search may miss.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0 font-medium">4.</span>
            <span>
              <strong>Claims full-text search</strong> — FTS5 against claim
              text. Catches specific terms used in individual assertions.
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
          An evidence record is a section produced by the two-pass
          break-point chunker (target ~512 tokens per chunk, headings used as
          natural breakpoints, oversized sections sub-split along sentence
          boundaries with heading-context preservation). Each record stores
          the raw text, a dense embedding vector (<strong>1024-dim</strong>{" "}
          local bge-large by default, <strong>1536-dim</strong> OpenAI if an
          API key is configured), source metadata (page URL, title, heading
          path), and a content hash for drift detection and delete/rename
          tombstone retirement.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Evidence records are the primary unit of retrieval. They provide the
          full context window that tools like <code>retrieve</code> (in brief
          mode) and <code>stress_test</code> synthesize from. Every claim links
          back to exactly one evidence record.
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
   SECTION: Decisions & Ambient Tagging
   ════════════════════════════════════════════════════════ */

function DecisionsSection() {
  return (
    <section id="decisions" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Decisions &amp; Ambient Tagging
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        A first-class layer for material commitments. Capture, recall,
        and walk the chain of why something got decided.
      </p>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          What a decision is
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          A decision is an atomic, candidate-status row that names a real
          choice the team has committed to, with a reasoning trail and
          cited evidence. Decisions live in the same physical store as
          claims (column <code>decision_kind IS NOT NULL</code>) but are
          a distinct surface: they have their own status lifecycle
          (<code>candidate</code> &rarr; <code>tentative</code> &rarr;
          <code>confirmed</code>), their own provenance fields, and an
          append-only <code>claim_evidence</code> audit trail so an
          evidence-set change appends a new row instead of mutating the
          decision.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Recall returns lightweight summaries; expand pulls the full
          reasoning trail, current evidence list, and the predecessor
          chain on demand. This semantic-pointer pattern keeps Claude&apos;s
          context lean while preserving the full record one tool call away.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Three capture paths
        </h2>
        <ul className="space-y-3 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Structural</strong> — when <code>retrieve mode=brief</code>{" "}
              runs with the analyzer enabled, the caller&apos;s LLM produces
              strict JSON that <code>brief_decision_render</code> validates,
              renders, and deposits as candidate decisions. Zero API key
              required server-side; the caller&apos;s model does the synthesis.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Ambient (session drain)</strong> — Claude emits
              structured <code>&lt;decision&gt;</code> tags inline at
              commit moments. The <code>assay drain</code> CLI extracts
              them from the session JSONL via regex, dedupes by content
              hash, embeds the statement, and writes the row. No LLM call
              in the forward path.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>T0 historical backfill</strong> — a one-time
              Phi-4 14B pass over the existing corpus seeds the decision
              graph from prior PRDs and research notes. Idempotent via
              content hash, so re-running is safe.
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Tag format
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          When Claude commits to a material decision in conversation, it
          emits a structured tag that the drain parser picks up:
        </p>
        <pre className="bg-[hsl(220,15%,9%)] border border-[hsl(220,15%,18%)] rounded-lg p-4 text-sm text-[hsl(220,15%,93%)] overflow-x-auto leading-relaxed">
{`<decision impact="schema|tooling|policy|rollout|eval|scope"
          confidence="moderate|low"
          layer="observation|interpretation|decision">
  <statement>{<=200 chars; specific real subject}</statement>
  <reasoning>{<=400 chars; why this was decided}</reasoning>
</decision>`}
        </pre>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mt-4">
          Both child tags are required &mdash; missing or empty bodies are
          dropped at drain. The <code>impact</code> attribute drives
          downstream filtering. The optional <code>layer</code> attribute
          (default <code>decision</code>) marks the epistemic level &mdash;{" "}
          <code>observation</code> for direct factual reports,{" "}
          <code>interpretation</code> for inference and synthesis,{" "}
          <code>decision</code> for committed action. Recall can filter
          by layer to surface only the committed decisions or trace the
          observations and interpretations that led there.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Decision graph over time
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Every state change on a decision &mdash; initial deposit,
          promotion through the review lifecycle, supersession by a new
          decision, rejection &mdash; appends a row to the
          <code> decision_transitions</code> audit table. Each row records
          the actor agent (which Claude instance, GPT call, or Levi
          input), the model id when known, the transition reason, and any
          evidence record that triggered the change.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          <code>assay_decision_expand</code> returns the full transition
          history alongside a depth-N predecessor walk
          (<code>supersedes_chain</code>) so callers can reconstruct
          exactly how a decision evolved across a quarter and which model
          touched it at every step. Cycle-guarded with a 10-hop ceiling
          to keep the response bounded.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Recall ranks with a hybrid score &mdash;
          {" "}<strong>0.7 cosine + 0.2 recency + 0.1 frequency</strong>{" "}
          (90-day half-life on recency, log-normalized citation count for
          frequency). Cosine remains the floor and the tiebreaker, so
          semantically weak matches never get resurrected by recency
          alone. Pure cosine is one env flag away
          (<code>ASSAY_RECALL_HYBRID=0</code>) for kill-switch revert.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mt-4">
          Pass <code>includeSuperseded=true</code> to recall when you
          want the &ldquo;what did we change our minds about&rdquo;
          surface &mdash; the response then carries a sidecar of recently
          deprecated decisions tagged with their replacement pointers,
          capped so the active set still dominates.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Draining a session
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          Run <code>assay drain</code> at any time to ingest tags from the
          most recent session JSONL into the local decision ledger.
        </p>
        <pre className="bg-[hsl(220,15%,9%)] border border-[hsl(220,15%,18%)] rounded-lg p-4 text-sm text-[hsl(220,15%,93%)] overflow-x-auto leading-relaxed">
{`# Drain the latest session, last 24h
assay drain

# Specific session JSONL
assay drain --session ~/.claude/projects/<slug>/<id>.jsonl

# All sessions in your projects directory
assay drain --all

# Preview without writing
assay drain --dry-run`}
        </pre>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mt-4">
          The drain is idempotent: re-running over the same session
          produces zero new rows. Each session also gets a sentinel
          evidence record (<code>source_kind=&apos;session&apos;</code>) that
          anchors its decisions for clean provenance, kept out of normal
          retrieval queries.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          MCP recall surface — five named agents + cascade
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The MCP tools registered by the Assay server are best understood
          as five named agents (each one solves one job) plus a cascade
          tool for when the caller doesn&rsquo;t know which tier holds the
          answer:
        </p>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Decision</strong> &mdash; <code>assay_decision_recall</code>{" "}
              cosine + hybrid search over the statement embedding. Returns
              summaries (id, statement, confidence, status, score) with
              optional filters for status, kind, confidence, and layer.
              Default confidence floor is <code>medium</code>+ so low-signal
              candidates stay out of the response.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Provenance</strong> &mdash; <code>assay_decision_expand</code>{" "}
              given a decision id, returns the full reasoning trail, the
              latest cited evidence, the full <code>decision_transitions</code>{" "}
              audit log, and a depth-N predecessor walk
              (<code>supersedes_chain</code>) so callers can reconstruct
              exactly what changed and why.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Evidence</strong> &mdash; <code>retrieve</code> in modes{" "}
              <code>raw</code> / <code>guided</code> / <code>evaluate</code> /{" "}
              <code>brief</code>. Hybrid vector + FTS over evidence chunks,
              merged via reciprocal rank fusion. The corpus tier of the
              memory hierarchy.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Pre-flight</strong> &mdash; <code>scan</code> fast 3-5
              signal verdict (clear / caution / blocker). Spans both tiers.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Adversary</strong> &mdash; <code>stress_test</code>{" "}
              deliberate adversarial review of a proposal. Surfaces every
              dissenting decision and conflicting chunk.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Cascade</strong> &mdash; <code>assay_recall</code>{" "}
              activation cascade: tries the Decision graph first (cosine
              floor 0.65 by default), falls through to Corpus retrieval if
              no semantic hit, returns <code>insufficient_evidence</code>{" "}
              when both tiers come up empty. Every response carries a{" "}
              <code>source_tier</code> breadcrumb so the caller knows
              whether it&rsquo;s reading a structured decision, a raw
              corpus chunk, or a verdict that nothing in the ledger
              answers the question. Use this when the question is abstract
              or you don&rsquo;t know which tier holds the answer; use the
              direct tools above when you do.
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Supersession semantics — audit-only by default
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          When a tag includes <code>supersedes=&quot;&lt;id-or-prefix&gt;&quot;</code>,
          the drain resolves the predecessor with strict unique-match
          enforcement. Prefixes must be at least 12 characters; shorter
          prefixes or ambiguous matches fail the resolver and the new
          decision lands without the link (failure reason recorded for
          audit). On success the drain (a) sets{" "}
          <code>superseded_by_claim_id</code> on the new row and (b) appends
          a <code>supersession-edge-recorded</code> transition row on the
          predecessor. Default mode is{" "}
          <strong>audit-only</strong> &mdash; the predecessor&rsquo;s status
          stays untouched so a wrong tag can&rsquo;t accidentally hide live
          knowledge. Set <code>ASSAY_SUPERSEDE_FLIP=1</code> in the MCP env
          to opt into the live-flip mode once you trust your tagging
          discipline.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Health check
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          <code>assay doctor</code> reports decision-layer state: total
          decisions, embedding coverage, status breakdown, and a
          per-source-agent breakdown so you can confirm the drain is
          landing rows under <code>Claude Opus</code> (or the appropriate
          model) and the corpus backfill is intact.
        </p>
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
              <strong>Evidence full-text search</strong> — SQLite FTS5
              ranking for exact keyword matches in evidence records.
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
          via environment variables or the <code>configure</code> tool. Defaults:{" "}
          <code>scan</code>=40, <code>stress_test</code>=80,{" "}
          <code>retrieve</code>=20. Brief mode depth depends on setting: quick=5,
          standard=15, deep=30.
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
          <code className="text-sm text-[hsl(220,15%,93%)]">{`stress_test "We should move the mobile onboarding flow to a native app"`}</code>
        </pre>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Retrieval Depth
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Default K=80 evidence records. K values are configurable via the{" "}
          <code>configure</code> tool or environment variables.
        </p>
      </div>
    </section>
  );
}

/* RetrieveEvidenceSection removed — folded into RetrieveSection2 above */

/* ════════════════════════════════════════════════════════
   SECTION: scan
   ════════════════════════════════════════════════════════ */

function ScanSection() {
  return (
    <section id="tools-scan" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        scan
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Quick pre-flight check for corpus health and freshness.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The <code>scan</code> tool validates corpus health, checks last sync
          time, and surfaces drift before you start working. Use it at the
          beginning of any session to know your evidence is current.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          What It Returns
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Sync status</strong> — when the corpus was last synced
              with source documents
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Record counts</strong> — evidence records, claims,
              products tracked
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Freshness summary</strong> — how current the corpus is
              relative to source documents
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Drift warnings</strong> — pages that have changed in the
              source but not yet been re-ingested
            </span>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Example
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`scan`}</code>
        </pre>
        <p className="text-[hsl(220,10%,55%)] mt-3 text-sm">
          No arguments needed. Returns a complete health report in one call.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Retrieval Depth
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Default K=40 evidence records for the internal health check. Configurable
          via the <code>configure</code> tool or environment variables.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: configure
   ════════════════════════════════════════════════════════ */

function ConfigureSection() {
  return (
    <section id="tools-configure" className="scroll-mt-8">
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        configure
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        View and update Assay settings at runtime.
      </p>

      <div className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The <code>configure</code> tool lets you view and update extraction
          mode, retrieval depth, feature toggles, and presets. Use it to adjust
          K values, switch extraction models, toggle dual embedding, or check
          current settings — all without editing environment files.
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          What You Can Configure
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>K values</strong> — adjust retrieval depth per tool (scan=40, stress_test=80, retrieve=20)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Max disclosure depth</strong> — cap retrieval at L1 (headline), L2 (+supporting), L3 (+excerpts), or L4 (full)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Feature toggles</strong> — enable/disable sync, reranker, hygiene passes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Presets</strong> — apply a preset bundle (minimal, standard, full)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span><strong>Embedding provider</strong> — switch between local (<code>bge-large-en-v1.5</code>, 1024-dim) and OpenAI (<code>text-embedding-3-small</code>, 1536-dim)</span>
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
              View current settings:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`configure`}</code>
            </pre>
          </div>
          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Change retrieval top-K:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`configure top_k=30`}</code>
            </pre>
          </div>
          <div>
            <p className="text-[hsl(220,10%,55%)] text-sm mb-1">
              Apply a preset:
            </p>
            <pre className="font-[family-name:var(--font-jetbrains)]">
              <code className="text-sm text-[hsl(220,15%,93%)]">{`configure preset="full"`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

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
              at heading boundaries, generates embeddings, and stores evidence
              records in the local SQLite corpus.
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
              <td className="px-4 py-3"><code>/assay-*</code> returns "MCP not connected"</td>
              <td className="px-4 py-3">Claude Desktop doesn&#39;t see the server, or the MCP binary hasn&#39;t been built</td>
              <td className="px-4 py-3">Settings → Developer → refresh the MCP entry, then restart Claude Desktop. Rebuild with <code>cd mcp-server &amp;&amp; npm run build</code>.</td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">Retrieval returns "embedding dim mismatch"</td>
              <td className="px-4 py-3">Embedder provider changed after indexing</td>
              <td className="px-4 py-3">Either unset <code>OPENAI_API_KEY</code> so the local embedder is used, or re-embed the corpus with <code>tsx scripts/reembed-sqlite-corpus.ts</code></td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">Notion crawl returns 0 pages</td>
              <td className="px-4 py-3">Integration disconnected or pages not shared</td>
              <td className="px-4 py-3">Re-share pages with the integration at notion.so/my-integrations</td>
            </tr>
            <tr className="border-b border-[hsl(220,15%,18%)]">
              <td className="px-4 py-3">First-index stalls on model download</td>
              <td className="px-4 py-3">Transformers.js cannot reach huggingface.co for the initial 420 MB model fetch</td>
              <td className="px-4 py-3">Check network. After the first successful download, indexing is fully offline.</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Retrieve returns empty results</td>
              <td className="px-4 py-3">Cold start — no collection indexed yet</td>
              <td className="px-4 py-3">Run <code>tsx bin/assay.ts add ~/your-docs</code> and <code>tsx bin/assay.ts index</code> first</td>
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
          <dt className="font-semibold">sqlite-vec</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            SQLite extension that provides vector-similarity functions.
            Stores dense embeddings (1024 or 1536 dimensions depending on
            provider) as BLOB columns in the same file as the rest of the
            corpus.
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
            Document sections stored with embeddings in the local SQLite
            corpus. The primary unit of storage and retrieval context.
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
          <dt className="font-semibold">FTS5</dt>
          <dd className="text-[hsl(220,10%,65%)] mt-1">
            SQLite&#39;s built-in full-text search module. Assay indexes
            every evidence record&#39;s title, summary, and body content so
            exact keyword matches complement vector similarity search.
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
      <DecisionsSection />
      <HR />
      <RetrievalSection />
      <HR />

      {/* Tools Reference */}
      <RetrieveSection2 />
      <HR />
      <StressTestSection />
      <HR />
      <ScanSection />
      <HR />
      <ConfigureSection />
      <HR />

      {/* Configuration */}
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
