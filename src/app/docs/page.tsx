/* ────────────────────────────────────────────────────────
   Docs — single continuous-scroll page (server component)
   All sections render at once; sidebar links are anchor scrolls.
   The .docs-content wrapper (in layout.tsx) provides typography.
   ──────────────────────────────────────────────────────── */

const linkStyle: React.CSSProperties = {
  color: "var(--ignition-ink)",
  textDecoration: "underline",
  textUnderlineOffset: 4,
};

const accentBullet: React.CSSProperties = {
  color: "var(--ignition-ink)",
  marginRight: 4,
};

/* ════════════════════════════════════════════════════════
   SECTION: Overview
   ════════════════════════════════════════════════════════ */

function OverviewSection() {
  return (
    <section id="overview" style={{ scrollMarginTop: 96 }}>
      <div className="breadcrumb">DOCS · PRODUCT REFERENCE</div>
      <h1>What is Assay?</h1>
      <p className="docs-lede">
        Local-first decision memory for PMs. Every call you commit to with
        Claude gets captured as a typed, queryable decision with reasoning
        attached, stored on your laptop. No account, no cloud database, no API
        key required. Your PRDs, research, and decisions stay on your laptop
        &mdash; backed up with <code>cp</code>, moved with <code>cp</code>.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <span className="badge">
          <span className="dot" />
          Local-first
        </span>
        <span className="badge">
          <span className="dot" />
          2026-05-14
        </span>
      </div>

      <div style={{ margin: "0 0 16px" }}>
        <div
          className="mono"
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            opacity: 0.7,
            marginBottom: 8,
          }}
        >
          EXAMPLE &mdash; what /assay-decision returns
        </div>
        <pre>
          <code>{`You (in Claude):
  /assay-decision why did we kill the bulk-edit feature

Assay:
  DECISION (2026-04-12, confirmed)
  We killed bulk-edit before launch because the cross-tenant data risk
  outweighed the cycle-time gain. 3 of 4 design reviewers (Sasha, Min,
  R.) blocked on the audit-log gap. Superseded the "ship bulk-edit Q3"
  plan from 2026-02-09.

  EVIDENCE
  • Security review notes — 2026-04-10
  • Customer interviews #14, #17 — Jan 2026
  • PRD v2.3 §6.2 — 2026-03-22

  See more: /assay-decision <id> --expand`}</code>
        </pre>
      </div>

      <div
        style={{
          margin: "0 0 24px",
          borderLeft: "3px solid var(--ignition)",
          background: "var(--paper-2)",
          padding: "12px 16px",
        }}
      >
        <p style={{ fontSize: 14, margin: 0 }}>
          <strong style={{ color: "var(--ignition-ink)" }}>
            Reference, not pitch.
          </strong>{" "}
          That example is what you came to see. Everything below is the
          engineering reference. For high-level questions about why Assay
          exists and who it&apos;s for, see the{" "}
          <a href="/#faq" style={linkStyle}>landing-page FAQ</a>.
        </p>
      </div>

      <p>
        Assay turns your PRDs, strategy documents, research notes, and recorded
        decisions into a structured set of cited evidence that your AI tools
        can query. Instead of relying on stale memory or keyword search, every
        question and proposal gets checked against what your organization
        actually knows &mdash; with source links, citation tokens, and explicit
        refusal when the evidence is insufficient.
      </p>
      <p>
        This page describes the <strong>local version</strong> of Assay.
        Everything &mdash; the indexed documents, the embeddings, the full-text
        index, the retrieval engine &mdash; lives on your machine in a single
        SQLite file at <code>~/.assay/assay.db</code>. It plugs into Claude
        Code as an MCP server and exposes a set of slash commands
        (<code>/assay-scan</code>, <code>/assay-decision</code>,{" "}
        <code>/assay-retrieve</code>, <code>/assay-stress-test</code>,{" "}
        <code>/assay-config</code>, <code>/assay-sync-status</code>) plus a
        CLI. The full underlying MCP tool surface is documented in{" "}
        <a href="#under-the-hood" style={linkStyle}>Under the hood</a>.
      </p>
      <div
        style={{
          margin: "16px 0 24px",
          borderLeft: "3px solid var(--ignition)",
          background: "var(--paper-2)",
          padding: "12px 16px",
        }}
      >
        <p style={{ fontSize: 14, margin: 0 }}>
          <strong style={{ color: "var(--ignition-ink)" }}>
            Silo doctrine.
          </strong>{" "}
          Hook activation is project-scoped — Assay only fires when your cwd is
          the silo&rsquo;d repo. Data at <code>~/.assay/assay.db</code> is
          user-scoped — one memory across all your silos. This split is
          intentional: silos isolate <em>when</em> Assay listens, not{" "}
          <em>what</em> it remembers.
        </p>
      </div>

      <h2>Prerequisites</h2>
      <ul>
        <li>
          <strong>Node.js ≥20</strong> (LTS recommended). Required — the MCP
          server and CLI are Node processes.
        </li>
        <li>
          <strong>git</strong> — to clone the repo.
        </li>
        <li>
          <strong>Claude Code</strong> (desktop app) — the MCP client that
          surfaces the slash commands. Any MCP-capable client works; Claude
          Code is the one we test against.
        </li>
        <li>
          <strong>~600 MB free disk</strong> — the embedding model (one-time
          ~420 MB download) plus your corpus.
        </li>
        <li>
          <strong>macOS or Linux.</strong> Windows is untested.
        </li>
      </ul>

      <p style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 16 }}>
        <strong style={{ color: "var(--ink)" }}>Embedding:</strong> local
        embedding model. No API key required.
      </p>

      <h2 id="under-the-hood" style={{ scrollMarginTop: 96, marginTop: 48 }}>
        Under the hood
      </h2>
      <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
        Technical detail below. PMs can skip to{" "}
        <a href="#installation" style={linkStyle}>Installation</a>.
      </p>

      <p>
        Internally, Assay plugs into Claude Code as an MCP server and exposes
        ten MCP tools plus a CLI. The slash commands above are thin wrappers
        over those tools. Architecture diagram:
      </p>
      <pre>
        <code>{`      ┌────────────────────────────────────────────────────────┐
      │                    Claude Code                          │
      │   retrieve  scan  stress_test  configure                │
      │   assay_decision_recall  assay_decision_expand          │
      │   assay_recall  brief_decision_render                   │
      │   promote_claim  demote_claim                           │
      └──────────────────────────┬─────────────────────────────┘
                                 │  MCP (stdio)
                                 ▼
      ┌────────────────────────────────────────────────────────┐
      │                   Assay MCP server                      │
      │                                                         │
      │    Ingest ──► Chunk ──► Embed ──► Store ──► Retrieve    │
      │      │           │         │         │          │       │
      │      ▼           ▼         ▼         ▼          ▼       │
      │   Markdown     512-tok   local      SQLite   hybrid     │
      │   (Notion      heading-  embedding  single   keyword    │
      │   optional)    aware     model      file     + semantic │
      │                                              search     │
      └────────────────────────────┬───────────────────────────┘
                                   │
                                   ▼
                        ~/.assay/assay.db  (single file)`}</code>
      </pre>

      <h3>MCP server tool names</h3>
      <p style={{ fontSize: 14 }}>
        The slash command is what a PM types in Claude. The MCP server tool
        name is the underlying tool the MCP client invokes. They map 1:1 for
        the user-facing surface; the rest are internal recall and capture
        primitives.
      </p>
      <table className="t">
        <thead>
          <tr>
            <th>Slash command</th>
            <th>MCP server tool</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/assay-scan</code></td>
            <td><code>scan</code></td>
          </tr>
          <tr>
            <td><code>/assay-decision</code></td>
            <td><code>assay_decision_recall</code></td>
          </tr>
          <tr>
            <td><code>/assay-decision &lt;id&gt; --expand</code></td>
            <td><code>assay_decision_expand</code></td>
          </tr>
          <tr>
            <td><code>/assay-retrieve</code></td>
            <td><code>retrieve</code></td>
          </tr>
          <tr>
            <td><code>/assay-stress-test</code></td>
            <td><code>stress_test</code></td>
          </tr>
          <tr>
            <td><code>/assay-config</code></td>
            <td><code>configure</code></td>
          </tr>
          <tr>
            <td><code>/assay-sync-status</code></td>
            <td><code>configure subcommand=&quot;status&quot;</code></td>
          </tr>
          <tr>
            <td>(internal &mdash; cascade recall)</td>
            <td><code>assay_recall</code></td>
          </tr>
          <tr>
            <td>(internal &mdash; brief synthesis deposit)</td>
            <td><code>brief_decision_render</code></td>
          </tr>
          <tr>
            <td>(internal &mdash; decision lifecycle)</td>
            <td><code>promote_claim</code> / <code>demote_claim</code></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Installation
   ════════════════════════════════════════════════════════ */

function InstallationSection() {
  return (
    <section id="installation" style={{ scrollMarginTop: 96 }}>
      <h1>Installation</h1>
      <p className="docs-lede">Five minutes from clone to first cited answer.</p>

      <div
        style={{
          margin: "24px 0 32px",
          border: "1px solid var(--rule)",
          padding: 24,
          background: "var(--paper-2)",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <span className="badge badge--ignition">
            <span className="dot" />
            5-minute install
          </span>
          <h2 style={{ margin: 0, padding: 0, border: 0, fontSize: 22 }}>
            Local install
          </h2>
        </div>
        <p>
          Runs entirely on your machine as a single SQLite file at{" "}
          <code>~/.assay/assay.db</code>. No Docker, no account. Uses a local
          embedding model. No API key required.
        </p>
        <p style={{ fontSize: 14 }}>
          <strong>Install:</strong>{" "}
          <code>bash scripts/install-tester.sh</code> — project-scoped, never
          modifies <code>~/.claude/settings.json</code>, never installs ECC,
          never clones <code>everything-claude-code</code>. ECC is a separate
          global tool you install independently; Assay does not bundle or wire
          it.
        </p>
        <p style={{ fontSize: 14 }}>
          <strong>First command to try after install:</strong>{" "}
          <code>/assay-scan</code> — fast pre-flight signal check against
          whatever&apos;s already in your decision graph and corpus.
        </p>

        <h3>Prerequisites</h3>
        <ul style={{ fontSize: 14 }}>
          <li>
            <strong>Node.js ≥20</strong>
          </li>
          <li>
            <strong>Claude Code</strong> installed (for the MCP integration)
          </li>
          <li>macOS or Linux (Windows untested)</li>
        </ul>

        <h3>1. Clone + install</h3>
        <pre>
          <code>{`git clone https://github.com/levievanshantz/assaylabs.git
cd assaylabs
npm install`}</code>
        </pre>

        <h3>2. Bootstrap the SQLite schema</h3>
        <pre>
          <code>{`node scripts/migrate.mjs`}</code>
        </pre>
        <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
          Idempotent. Creates <code>~/.assay/assay.db</code>, applies the base
          schema, and walks every migration in order. Postgres-era migrations
          (versions 000–022) are auto-skipped on SQLite. Re-run any time —
          already-applied migrations stay quiet.
        </p>

        <h3>3. Index a folder of markdown</h3>
        <pre>
          <code>{`./node_modules/.bin/tsx bin/assay.ts add ~/my-prds --name prds
./node_modules/.bin/tsx bin/assay.ts index
./node_modules/.bin/tsx bin/assay.ts status`}</code>
        </pre>
        <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
          First <code>index</code> downloads the local embedding model (~420MB,
          one-time). A 50-PRD folder finishes in under 60 seconds.
        </p>

        <h3>4. Wire up Claude Desktop via the launcher</h3>
        <p style={{ fontSize: 14 }}>
          The repo ships with a launcher script at{" "}
          <code>~/.local/bin/assay-mcp</code> that auto-discovers the built MCP
          server and decouples your Claude Desktop config from the repo path.
          Recommended over hard-coding the dist path. Add this <code>assay</code>{" "}
          entry to <code>mcpServers</code> in{" "}
          <code>claude_desktop_config.json</code>:
        </p>
        <pre>
          <code>{`"assay": {
  "command": "/Users/YOU/.local/bin/assay-mcp",
  "args": [],
  "env": {
    "ASSAY_DB": "sqlite",
    "ASSAY_DB_PATH": "/Users/YOU/.assay/assay.db"
  }
}`}</code>
        </pre>
        <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
          Restart Claude Desktop. Test with <code>/assay-retrieve</code>.
          Verify with <code>~/.local/bin/assay-mcp.doctor</code> — it checks
          the launcher, the config pointer, server boot, SQLite reachability,
          and recent log cleanliness in one pass. Run it any time Claude
          Desktop says &ldquo;assay disconnected.&rdquo;
        </p>
        <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
          Direct (no launcher) wiring still works too — point{" "}
          <code>command</code> at <code>node</code> with{" "}
          <code>args: [&quot;/abs/path/mcp-server/dist/index.js&quot;]</code>.
        </p>

        <h3>5. Live-update (optional)</h3>
        <pre>
          <code>{`./node_modules/.bin/tsx bin/assay.ts watch`}</code>
        </pre>

        <div
          style={{
            marginTop: 24,
            borderLeft: "3px solid var(--ignition)",
            background: "var(--paper)",
            padding: "12px 16px",
          }}
        >
          <p style={{ fontSize: 14, margin: 0 }}>
            <strong style={{ color: "var(--ignition-ink)" }}>
              Known limitations:
            </strong>{" "}
            Single-machine only; no team sharing today. A shared institutional
            tier on Postgres + pgvector is speculative future work, not
            committed yet. If a query gives an obviously wrong top
            result, file it with the GitHub issue template; ranking tuning is
            an open work item.
          </p>
        </div>
      </div>

    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Quick Start
   ════════════════════════════════════════════════════════ */

function QuickStartSection() {
  return (
    <section id="quickstart" style={{ scrollMarginTop: 96 }}>
      <h1>Quick Start</h1>
      <p className="docs-lede">See value in 5 minutes.</p>

      <h2>1. Seed the Demo Corpus</h2>
      <p>
        Assay ships with a small demo corpus — a handful of product strategy
        documents, research summaries, and decision records — so you can
        explore retrieval and stress-testing without connecting any real data
        sources first.
      </p>
      <pre>
        <code>{`npm run seed-demo`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
        This inserts roughly 40 evidence records and 120 extracted decisions
        into your local database. It takes about 30 seconds while embeddings are
        generated.
      </p>

      <h2>2. Configure Claude Code</h2>
      <p>
        Register Assay as an MCP server so Claude Code can call its tools. Add
        the following to your project&rsquo;s{" "}
        <code>.claude/settings.local.json</code>:
      </p>
      <pre>
        <code>{`{
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
      <div
        style={{
          marginTop: 12,
          borderLeft: "3px solid var(--ignition)",
          background: "var(--paper-2)",
          padding: "12px 16px",
        }}
      >
        <p style={{ fontSize: 14, margin: 0 }}>
          <strong style={{ color: "var(--ignition-ink)" }}>Tip:</strong>{" "}
          Replace <code>/absolute/path/to/assay</code> with the actual
          directory where you cloned the repository. The path must be
          absolute — Claude Code does not resolve relative paths for MCP
          servers.
        </p>
      </div>

      <h2>3. Test It</h2>
      <p>
        Open Claude Code in any project directory and try the following
        prompts:
      </p>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        Run a pre-flight check:
      </p>
      <pre>
        <code>{`Run scan`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        Get a briefing on a topic:
      </p>
      <pre>
        <code>{`retrieve "customer feedback" mode="brief"`}</code>
      </pre>

      <h2>What to Expect</h2>
      <p>
        The <code>scan</code> tool returns a fast pre-flight signal check
        (3&ndash;5 signals, classed as clear / caution / blocker) over a fused
        candidate pool: decision-graph hits at cosine ≥0.65 plus hybrid corpus
        retrieval. If you want corpus health instead (sync freshness, record
        counts, drift), call{" "}
        <code>configure subcommand=&quot;status&quot;</code>.
      </p>
      <p>
        The <code>retrieve</code> tool in <code>brief</code> mode returns a
        structured summary of what your organization already knows about the
        given topic. It includes:
      </p>
      <ul>
        <li>
          <strong>Context summary</strong> — a narrative overview of the topic
          drawn from your evidence
        </li>
        <li>
          <strong>Prior work</strong> — existing decisions, research, and
          documents that address the topic
        </li>
        <li>
          <strong>Active constraints</strong> — known blockers, limitations,
          and guardrails
        </li>
        <li>
          <strong>Unresolved debates</strong> — open questions and
          contradictions found across sources
        </li>
        <li>
          <strong>Open questions</strong> — gaps the team has not yet addressed
        </li>
      </ul>

      <h2>Next Steps</h2>
      <ul>
        <li>
          <span style={accentBullet}>→</span>{" "}
          <a href="#how-it-works" style={linkStyle}>
            Learn how the pipeline works end-to-end
          </a>
        </li>
        <li>
          <span style={accentBullet}>→</span>{" "}
          <a href="#guides-notion" style={linkStyle}>
            Ingest your own Notion pages
          </a>
        </li>
        <li>
          <span style={accentBullet}>→</span>{" "}
          <a href="#tools-stress-test" style={linkStyle}>
            Stress-test a proposal against your evidence
          </a>
        </li>
        <li>
          <span style={accentBullet}>→</span>{" "}
          <a href="#tools-retrieve" style={linkStyle}>
            Choose an extraction mode
          </a>
        </li>
      </ul>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: How It Works
   ════════════════════════════════════════════════════════ */

function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{ scrollMarginTop: 96 }}>
      <h1>How It Works</h1>
      <p className="docs-lede">
        The five-step pipeline from source document to retrievable
        intelligence.
      </p>

      <h2>Ingestion Pipeline</h2>
      <h3>1. Ingest</h3>
      <p>
        Source pages are fetched from Notion or Confluence via their APIs. Each
        page&#39;s content is converted to a normalized Markdown
        representation, preserving heading structure.
      </p>
      <h3>2. Chunk</h3>
      <p>
        The Markdown is split at heading boundaries into sections of
        approximately 3,200 characters each. These become your evidence
        records — the atomic units of document-level storage.
      </p>
      <h3>3. Embed</h3>
      <p>
        Each evidence section is embedded into a dense vector using a local
        embedding model that runs in-process via{" "}
        <code>@huggingface/transformers</code> (no API key required). Vectors
        are stored alongside the rest of the corpus in the same SQLite file.
      </p>
      <h3>4. Index for full-text</h3>
      <p>
        Each section is also indexed for keyword search so retrieval can
        combine semantic similarity with exact lexical matching.
      </p>
      <h3>5. Retrieve</h3>
      <p>
        At query time, four parallel search lanes fire (keyword + semantic
        across both evidence sections and individual decisions) and their
        results merge into a single ranked list. Decisions resolve back to
        their parent evidence records via a <code>source_id</code> foreign key,
        so you always get full context.
      </p>

      <h2>4-Layer Hybrid Retrieval</h2>
      <p>Each query runs four search lanes in parallel:</p>
      <ol>
        <li>
          <strong>Evidence semantic search</strong> — cosine similarity against
          evidence record embeddings. Catches semantically related sections.
        </li>
        <li>
          <strong>Decision semantic search</strong> — cosine similarity against
          individual decision embeddings. Catches atomic assertions that point
          in a different semantic direction than their parent section.
        </li>
        <li>
          <strong>Evidence keyword search</strong> — built-in SQLite full-text
          search. Catches exact terminology and proper nouns that semantic
          search may miss.
        </li>
        <li>
          <strong>Decision keyword search</strong> — keyword search against
          decision text. Catches specific terms used in individual assertions.
        </li>
      </ol>
      <p>
        Results from all four lanes are merged into a single ranked list using
        hybrid (keyword + semantic) fusion. Decisions resolve back to their
        parent evidence records via the <code>source_id</code> foreign key, so
        the final result set contains full-context sections rather than
        isolated sentences.
      </p>
      <p style={{ fontSize: 14 }}>
        <strong>Index integrity</strong> — the decision keyword index stays in
        lockstep with the decision table via AFTER triggers (insert / update /
        delete) shipped in <strong>migration 032</strong>. Without those
        triggers, freshly drained decisions were invisible to keyword retrieval
        until a manual backfill. Now every write keeps both indexes
        synchronised.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Evidence & Claims
   ════════════════════════════════════════════════════════ */

function EvidenceAndClaimsSection() {
  return (
    <section id="evidence-and-decisions" style={{ scrollMarginTop: 96 }}>
      <h1>Evidence &amp; Decisions</h1>
      <p className="docs-lede">
        The two-layer data model that powers granular retrieval. (The decision
        layer is internally still the <code>claims</code> table for code
        continuity.)
      </p>

      <h2>Evidence Records</h2>
      <p>
        An evidence record is a section produced by the two-pass break-point
        chunker (target ~512 tokens per chunk, headings used as natural
        breakpoints, oversized sections sub-split along sentence boundaries
        with heading-context preservation). Each record stores the raw text, a
        dense embedding vector (local embedding model; no API key required),
        source metadata (page URL, title, heading path), and a content hash
        for drift detection and delete/rename tombstone retirement.
      </p>
      <p>
        Evidence records are the primary unit of retrieval. They provide the
        full context window that tools like <code>retrieve</code> (in brief
        mode) and <code>stress_test</code> synthesize from. Every decision
        links back to exactly one evidence record.
      </p>

      <h2>Decisions</h2>
      <p>
        A decision is an atomic assertion extracted from an evidence record or
        a Claude session &mdash; a single statement that can be independently
        verified, contradicted, or cited. Each decision gets its own embedding
        vector, which may point in a semantically different direction than its
        parent section. This is what enables retrieval of individual
        assertions that chunk-level averaging would lose.
      </p>
      <p>
        On average, decision extraction adds 10.7 additional unique records
        per query, surfacing evidence that document-level search alone would
        miss.
      </p>

      <h2>Decision Types</h2>
      <p>Every decision is classified into one of seven types:</p>
      <table className="t">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>finding</code>
            </td>
            <td>An observed fact or data point from research</td>
          </tr>
          <tr>
            <td>
              <code>recommendation</code>
            </td>
            <td>A suggested course of action</td>
          </tr>
          <tr>
            <td>
              <code>assumption</code>
            </td>
            <td>A belief taken as given without direct evidence</td>
          </tr>
          <tr>
            <td>
              <code>metric</code>
            </td>
            <td>A quantitative measurement or target</td>
          </tr>
          <tr>
            <td>
              <code>constraint</code>
            </td>
            <td>A limitation, blocker, or guardrail</td>
          </tr>
          <tr>
            <td>
              <code>commitment</code>
            </td>
            <td>A promise or agreed-upon deliverable</td>
          </tr>
          <tr>
            <td>
              <code>deferral</code>
            </td>
            <td>A decision explicitly postponed to a later date</td>
          </tr>
        </tbody>
      </table>

      <h2>Epistemic Layers</h2>
      <p>Each decision also carries an epistemic layer classification:</p>
      <ul>
        <li>
          <strong>Observation</strong> — a factual report of what was seen or
          measured
        </li>
        <li>
          <strong>Interpretation</strong> — an analysis or conclusion drawn
          from observations
        </li>
        <li>
          <strong>Intention</strong> — a stated plan, goal, or commitment to
          act
        </li>
      </ul>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Decisions & Ambient Tagging
   ════════════════════════════════════════════════════════ */

function DecisionsSection() {
  return (
    <section id="decisions" style={{ scrollMarginTop: 96 }}>
      <h1>Decisions &amp; Ambient Tagging</h1>
      <p className="docs-lede">
        A first-class layer for material commitments. Capture, recall, and walk
        the chain of why something got decided.
      </p>

      <h2>What a decision is</h2>
      <p>
        A decision is an atomic, candidate-status row that names a real choice
        the team has committed to, with a reasoning trail and cited evidence.
        Decisions live in the same physical store as claims (column{" "}
        <code>decision_kind IS NOT NULL</code>) but are a distinct surface:
        they have their own status lifecycle (<code>candidate</code> &rarr;{" "}
        <code>tentative</code> &rarr; <code>confirmed</code>), their own
        provenance fields, and an append-only <code>claim_evidence</code> audit
        trail so an evidence-set change appends a new row instead of mutating
        the decision.
      </p>
      <p>
        Recall returns lightweight summaries; expand pulls the full reasoning
        trail, current evidence list, and the predecessor chain on demand.
        This semantic-pointer pattern keeps Claude&apos;s context lean while
        preserving the full record one tool call away.
      </p>

      <h2>Three capture paths</h2>
      <ul>
        <li>
          <strong>Structural</strong> — when <code>retrieve mode=brief</code>{" "}
          runs, the caller&apos;s LLM produces strict JSON that{" "}
          <code>brief_decision_render</code> validates, renders, and deposits
          as candidate decisions. Zero API key required server-side; the
          caller&apos;s model does the synthesis.
        </li>
        <li>
          <strong>Ambient (session drain)</strong> — Claude emits structured{" "}
          <code>&lt;decision&gt;</code> tags inline at commit moments. The{" "}
          <code>assay drain</code> CLI extracts them from the session JSONL via
          regex, dedupes by content hash, embeds the statement, and writes the
          row. No LLM call in the forward path.
        </li>
        <li>
          <strong>T0 historical backfill</strong> — a one-time Phi-4 14B pass
          over the existing corpus seeds the decision graph from prior PRDs
          and research notes. Idempotent via content hash, so re-running is
          safe.
        </li>
      </ul>

      <h2>Tag format</h2>
      <p>
        When Claude commits to a material decision in conversation, it emits a
        structured tag that the drain parser picks up:
      </p>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        <strong>Eng shape</strong> — schema / tooling / policy / rollout / eval
        / scope commitments:
      </p>
      <pre>
        <code>{`<decision impact="schema|tooling|policy|rollout|eval|scope"
          confidence="moderate|low"
          layer="observation|interpretation|decision">
  <statement>{<=200 chars; specific real subject}</statement>
  <reasoning>{<=400 chars; why this was decided}</reasoning>
</decision>`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "16px 0 4px" }}>
        <strong>PM shape</strong> &mdash; product hypotheses with explicit
        problem / hypothesis / metric / outcome attributes:
      </p>
      <pre>
        <code>{`<decision kind="pm"
          problem="testers abandon install at step 3 (Claude Desktop wiring)"
          hypothesis="auto-generating the mcpServers JSON block cuts step-3 drop-off in half"
          metric="install-completion rate among new testers, week-over-week"
          outcome="ship the auto-config writer behind --auto-wire before next tester cohort">
  <statement>Auto-write the Claude Desktop MCP block during install-tester.sh.</statement>
  <reasoning>Step-3 (manual JSON edit) is the highest-friction step in the install flow; a generated block removes a class of typo errors and makes the 5-minute promise real.</reasoning>
</decision>`}</code>
      </pre>
      <p>
        Both child tags (<code>&lt;statement&gt;</code> and{" "}
        <code>&lt;reasoning&gt;</code>) are required &mdash; missing or empty
        bodies are dropped at drain. For the eng shape, the{" "}
        <code>impact</code> attribute drives downstream filtering. For the PM
        shape, <code>kind=&quot;pm&quot;</code> swaps the attribute set to
        problem / hypothesis / metric / outcome. The optional{" "}
        <code>layer</code> attribute (default <code>decision</code>) marks the
        epistemic level &mdash; <code>observation</code> for direct factual
        reports, <code>interpretation</code> for inference and synthesis,{" "}
        <code>decision</code> for committed action. Recall can filter by layer
        to surface only the committed decisions or trace the observations and
        interpretations that led there.
      </p>

      <h2>Decision graph over time</h2>
      <p>
        Every state change on a decision &mdash; initial deposit, promotion
        through the review lifecycle, supersession by a new decision, rejection
        &mdash; appends a row to the
        <code> decision_transitions</code> audit table. Each row records the
        actor agent (which Claude instance, GPT call, or Levi input), the
        model id when known, the transition reason, and any evidence record
        that triggered the change.
      </p>
      <p>
        <code>assay_decision_expand</code> returns the full transition history
        alongside a depth-N predecessor walk (<code>supersedes_chain</code>) so
        callers can reconstruct exactly how a decision evolved across a
        quarter and which model touched it at every step. Cycle-guarded with a
        10-hop ceiling to keep the response bounded.
      </p>
      <p>
        Recall ranks with a hybrid score &mdash;{" "}
        <strong>0.7 cosine + 0.2 recency + 0.1 frequency</strong> (90-day
        half-life on recency, log-normalized citation count for frequency).
        Cosine remains the floor and the tiebreaker, so semantically weak
        matches never get resurrected by recency alone. Pure cosine is one env
        flag away (<code>ASSAY_RECALL_HYBRID=0</code>) for kill-switch revert.
      </p>
      <p>
        Pass <code>includeSuperseded=true</code> to recall when you want the
        &ldquo;what did we change our minds about&rdquo; surface &mdash; the
        response then carries a sidecar of recently deprecated decisions
        tagged with their replacement pointers, capped so the active set still
        dominates.
      </p>

      <h2>Draining a session</h2>
      <p>
        Run <code>assay drain</code> at any time to ingest tags from the most
        recent session JSONL into the local decision ledger.
      </p>
      <pre>
        <code>{`# Drain the latest session, last 24h
assay drain

# Specific session JSONL
assay drain --session ~/.claude/projects/<slug>/<id>.jsonl

# All sessions in your projects directory
assay drain --all

# Preview without writing
assay drain --dry-run`}</code>
      </pre>
      <p>
        The drain is idempotent: re-running over the same session produces zero
        new rows. Each session also gets a sentinel evidence record (
        <code>source_kind=&apos;session&apos;</code>) that anchors its
        decisions for clean provenance, kept out of normal retrieval queries.
      </p>

      <h2>The two commands you&rsquo;ll use first</h2>
      <p>
        Most of the value comes from two slash commands. Start here; the full
        tool surface is documented below for engineering reference.
      </p>
      <ul>
        <li>
          <strong>
            <code>/assay-scan</code>
          </strong>{" "}
          &mdash; before you commit to a call, ask Assay what it already knows.
          You describe the proposal in plain English; Assay returns 3&ndash;5
          signals classed <em>clear</em>, <em>caution</em>, or{" "}
          <em>blocker</em>, drawing from both prior decisions and the evidence
          corpus. Use it when you&rsquo;re about to greenlight, kill, or
          reverse something and want a sanity check first.
        </li>
        <li>
          <strong>
            <code>/assay-decision</code>
          </strong>{" "}
          &mdash; ask &ldquo;what did we decide about X, and why?&rdquo;
          Returns the matching decision summary first; expand any hit to see
          the full reasoning trail, the evidence cited at the time, and the
          predecessor chain (what this decision superseded, and what
          superseded it). This is the &ldquo;why did we kill that?&rdquo;
          answer that previously required an archeology dig across Slack and
          docs.
        </li>
      </ul>

      <h2>Full tool surface</h2>
      <p>
        The remaining MCP tools are named recall surfaces (each solves one
        job) plus a cascade tool for when the caller doesn&rsquo;t know which
        layer holds the answer. Engineering reference:
      </p>
      <ul>
        <li>
          <strong>
            <code>/assay-retrieve</code>
          </strong>{" "}
          (server tool: <code>retrieve</code>) &mdash; hybrid keyword +
          semantic search over evidence chunks, in modes <code>raw</code> /{" "}
          <code>guided</code> / <code>evaluate</code> / <code>brief</code>. The
          corpus layer of the memory hierarchy. Use when you want raw evidence
          rather than a committed decision.
        </li>
        <li>
          <strong>
            <code>/assay-stress-test</code>
          </strong>{" "}
          (server tool: <code>stress_test</code>) &mdash; deliberate
          adversarial review of a proposal. Surfaces every dissenting decision
          and conflicting chunk. Use when you&rsquo;ve already decided and
          want the strongest argument against.
        </li>
        <li>
          <strong>
            <code>/assay-config</code>
          </strong>{" "}
          (server tool: <code>configure</code>) &mdash; view and update
          extraction mode, retrieval depth, feature toggles, presets.
        </li>
        <li>
          <strong>
            <code>/assay-sync-status</code>
          </strong>{" "}
          (server tool: <code>configure subcommand=&quot;status&quot;</code>)
          &mdash; read-only corpus health: sync freshness, record counts,
          drift warnings.
        </li>
        <li>
          <strong>Provenance</strong> (server tool:{" "}
          <code>assay_decision_expand</code>) &mdash; given a decision id,
          returns the full reasoning trail, the latest cited evidence, the
          full <code>decision_transitions</code> audit log, and a depth-N
          predecessor walk (<code>supersedes_chain</code>). Invoked
          automatically by <code>/assay-decision</code> when you ask it to
          expand a hit.
        </li>
        <li>
          <strong>Cascade</strong> (server tool: <code>assay_recall</code>)
          &mdash; tries the decision graph first, falls through to the
          evidence corpus if no semantic hit, returns{" "}
          <code>insufficient_evidence</code> when both layers come up empty.
          Every response carries a <code>source_tier</code> breadcrumb so the
          caller knows whether it&rsquo;s reading a structured decision, a raw
          corpus chunk, or a verdict that nothing in the ledger answers the
          question. Use when the question is abstract or you don&rsquo;t know
          which layer holds the answer.
        </li>
      </ul>

      <h2>Supersession semantics — audit-only by default</h2>
      <p>
        When a tag includes <code>supersedes=&quot;&lt;id-or-prefix&gt;&quot;</code>,
        the drain resolves the predecessor with strict unique-match
        enforcement. Prefixes must be at least 12 characters; shorter prefixes
        or ambiguous matches fail the resolver and the new decision lands
        without the link (failure reason recorded for audit). On success the
        drain (a) sets <code>superseded_by_claim_id</code> on the new row and
        (b) appends a <code>supersession-edge-recorded</code> transition row
        on the predecessor. Default mode is <strong>audit-only</strong>{" "}
        &mdash; the predecessor&rsquo;s status stays untouched so a wrong tag
        can&rsquo;t accidentally hide live knowledge. Set{" "}
        <code>ASSAY_SUPERSEDE_FLIP=1</code> in the MCP env to opt into the
        live-flip mode once you trust your tagging discipline.
      </p>

      <h2>Health check</h2>
      <p>
        <code>assay doctor</code> reports decision-layer state: total
        decisions, embedding coverage, status breakdown, and a per-source-agent
        breakdown so you can confirm the drain is landing rows under{" "}
        <code>Claude Opus</code> (or the appropriate model) and the corpus
        backfill is intact.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Retrieval Pipeline
   ════════════════════════════════════════════════════════ */

function RetrievalSection() {
  return (
    <section id="retrieval" style={{ scrollMarginTop: 96 }}>
      <h1>Retrieval Pipeline</h1>
      <p className="docs-lede">How queries become ranked evidence.</p>

      <p>
        Every retrieval query fires four parallel search lanes, each capturing
        a different axis of relevance:
      </p>
      <ol>
        <li>
          <strong>Evidence vector search</strong> — finds semantically similar
          document sections via cosine distance against evidence embeddings.
        </li>
        <li>
          <strong>Decision vector search</strong> — finds individual assertions
          whose embeddings are close to the query, even when the parent
          section&#39;s overall embedding diverges.
        </li>
        <li>
          <strong>Evidence keyword search</strong> — built-in SQLite full-text
          search for exact keyword matches in evidence records.
        </li>
        <li>
          <strong>Decision keyword search</strong> — keyword matches against
          the text of individual decisions.
        </li>
      </ol>

      <h2>Why hybrid search</h2>
      <p>
        Different search methods catch different things. Semantic search finds
        meaning-based similarity but can miss exact terminology. Keyword search
        catches precise terms but misses paraphrased content. Decision search
        catches individual assertions lost in chunk-level embedding averaging.
        Hybrid fusion merges ranked results from all four lanes into a single
        list, weighting results that appear across multiple lanes more
        heavily.
      </p>

      <h2>Configurable K Values</h2>
      <p>
        K values (the number of evidence records retrieved) are configurable
        via environment variables or the <code>configure</code> tool.
        Defaults: <code>scan</code>=40, <code>stress_test</code>=80,{" "}
        <code>retrieve</code>=20. Brief mode depth depends on setting: quick=5,
        standard=15, deep=30.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: retrieve
   ════════════════════════════════════════════════════════ */

function RetrieveSection2() {
  return (
    <section id="tools-retrieve" style={{ scrollMarginTop: 96 }}>
      <h1>retrieve</h1>
      <p className="docs-lede">Query the corpus with four retrieval modes.</p>

      <p>
        The <code>retrieve</code> tool is the primary interface to the corpus.
        It runs 4-layer hybrid search and returns results in one of four modes,
        each suited to a different workflow. Default retrieval depth is K=20
        evidence records.
      </p>

      <h2>Four Modes</h2>
      <ul>
        <li>
          <strong>raw</strong> — returns top-K evidence records with hybrid
          ranking scores. No LLM call. Fastest and cheapest.
        </li>
        <li>
          <strong>guided</strong> — returns evidence plus an{" "}
          <code>eval_instructions</code> field. The calling LLM processes the
          results itself — zero extra API cost.
        </li>
        <li>
          <strong>evaluate</strong> — the server calls an LLM to synthesize
          findings and returns a plain-language summary.
        </li>
        <li>
          <strong>brief</strong> — generates a structured organizational
          briefing: context summary, prior work, active constraints,
          unresolved debates, open questions, and dependencies. Each brief
          deposits its synthesis back into the corpus, creating an
          accumulation loop.
        </li>
      </ul>

      <h2>Brief Output</h2>
      <p>
        When using <code>mode=&quot;brief&quot;</code>, the tool returns:
      </p>
      <ul>
        <li>
          <strong>Context summary</strong> — narrative overview of the topic
          from your corpus
        </li>
        <li>
          <strong>Prior work</strong> — existing decisions, research, and
          documents
        </li>
        <li>
          <strong>Active constraints</strong> — known blockers and guardrails
        </li>
        <li>
          <strong>Unresolved debates</strong> — contradictions found across
          sources
        </li>
        <li>
          <strong>Open questions</strong> — gaps the team has not addressed
        </li>
        <li>
          <strong>Dependencies</strong> — related work and cross-cutting
          concerns
        </li>
      </ul>

      <h2>Examples</h2>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        Raw retrieval:
      </p>
      <pre>
        <code>{`retrieve "competitive landscape" mode="raw" top_k=30`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        Organizational briefing (default K=20):
      </p>
      <pre>
        <code>{`retrieve "customer onboarding friction" mode="brief"`}</code>
      </pre>

      <h2>Retrieval Depth</h2>
      <p>
        Default K=20 evidence records. Configurable per call via{" "}
        <code>top_k</code> parameter or globally via environment variables.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: stress_test
   ════════════════════════════════════════════════════════ */

function StressTestSection() {
  return (
    <section id="tools-stress-test" style={{ scrollMarginTop: 96 }}>
      <h1>stress_test</h1>
      <p className="docs-lede">
        Stress-test a proposal against organizational evidence.
      </p>

      <p>
        The <code>stress_test</code> tool takes a proposal or plan and
        rigorously evaluates it against your corpus. It finds supporting
        evidence, surfaces contradictions, identifies assumption weaknesses,
        and delivers a verdict with confidence level.
      </p>

      <h2>What It Returns</h2>
      <ul>
        <li>
          <strong>Verdict</strong> — one of: <code>ready</code>,{" "}
          <code>ready_with_conditions</code>, <code>blocked</code>,{" "}
          <code>needs_clarification</code>
        </li>
        <li>
          <strong>Overlap analysis</strong> — where the proposal aligns with
          existing evidence
        </li>
        <li>
          <strong>Conflict analysis</strong> — contradictions found in the
          corpus
        </li>
        <li>
          <strong>Assumption weaknesses</strong> — unstated or fragile
          assumptions
        </li>
        <li>
          <strong>Evidence gaps</strong> — areas where the corpus has no data
        </li>
        <li>
          <strong>Supporting evidence</strong> — records that back the
          proposal
        </li>
        <li>
          <strong>Alternatives</strong> — other approaches suggested by the
          evidence
        </li>
        <li>
          <strong>Falsification check</strong> — what evidence would need to be
          true for the proposal to fail
        </li>
      </ul>

      <h2>Example</h2>
      <pre>
        <code>{`stress_test "We should move the mobile onboarding flow to a native app"`}</code>
      </pre>

      <h2>Retrieval Depth</h2>
      <p>
        Default K=80 evidence records. K values are configurable via the{" "}
        <code>configure</code> tool or environment variables.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: scan
   ════════════════════════════════════════════════════════ */

function ScanSection() {
  return (
    <section id="tools-scan" style={{ scrollMarginTop: 96 }}>
      <h1>scan</h1>
      <p className="docs-lede">
        Fast pre-flight signal check over a fused candidate pool.
      </p>

      <p>
        The <code>scan</code> tool runs both layers in parallel: pulls
        decision-graph hits at cosine ≥0.65 plus hybrid corpus retrieval, then
        returns 3–5 signals classed as <strong>clear</strong>,{" "}
        <strong>caution</strong>, or <strong>blocker</strong>. Use it before
        committing to a proposal to surface anything the corpus or decision
        graph already says against (or for) the idea.
      </p>
      <p>
        For corpus health (sync status, record counts, drift warnings) call{" "}
        <code>configure subcommand=&quot;status&quot;</code> instead. The two
        were once one tool and split when scan absorbed the two-layer fan-out.
      </p>

      <h2>What It Returns</h2>
      <ul>
        <li>
          <strong>Header line</strong> — `[SCAN MODE] N corpus + M decisions in
          candidate pool` when fusion succeeds; falls back to corpus-only
          header when no decisions clear the floor.
        </li>
        <li>
          <strong>3–5 signals</strong> — each classed clear / caution /
          blocker, with citations to source records by id.
        </li>
        <li>
          <strong>Decision-graph candidates block</strong> — the top decisions
          matching the proposal, when fusion finds any.
        </li>
        <li>
          <strong>Tier errors</strong> — surfaces inline if either tier fails
          (embedding outage, corpus query throw, etc).
        </li>
      </ul>

      <h2>Example</h2>
      <pre>
        <code>{`scan intent="ship the new pricing tier this quarter"`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)" }}>
        One required arg: <code>intent</code>. Returns a fused signal report
        in one call.
      </p>

      <h2>Retrieval Depth</h2>
      <p>
        Default K=40 evidence records for the internal health check.
        Configurable via the <code>configure</code> tool or environment
        variables.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: configure
   ════════════════════════════════════════════════════════ */

function ConfigureSection() {
  return (
    <section id="tools-configure" style={{ scrollMarginTop: 96 }}>
      <h1>configure</h1>
      <p className="docs-lede">View and update Assay settings at runtime.</p>

      <p>
        The <code>configure</code> tool lets you view and update extraction
        mode, retrieval depth, feature toggles, and presets. Use it to adjust
        K values, switch extraction models, toggle dual embedding, or check
        current settings — all without editing environment files.
      </p>

      <h2>What You Can Configure</h2>
      <ul>
        <li>
          <strong>K values</strong> — adjust retrieval depth per tool (scan=40,
          stress_test=80, retrieve=20)
        </li>
        <li>
          <strong>Max disclosure depth</strong> — cap retrieval at summary,
          full reasoning, or excerpts. (A future tier returns the original
          source snapshot at the time the decision was recorded; that
          snapshot tier isn&apos;t built today.)
        </li>
        <li>
          <strong>Feature toggles</strong> — enable/disable sync, reranker,
          hygiene passes
        </li>
        <li>
          <strong>Presets</strong> — apply a preset bundle (minimal, standard,
          full)
        </li>
        <li>
          <strong>Embedding</strong> — local embedding model. No API key
          required; no remote provider switch.
        </li>
      </ul>

      <h2>Examples</h2>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        View current settings:
      </p>
      <pre>
        <code>{`configure`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        Change retrieval top-K:
      </p>
      <pre>
        <code>{`configure top_k=30`}</code>
      </pre>
      <p style={{ fontSize: 14, color: "var(--ink-3)", margin: "12px 0 4px" }}>
        Apply a preset:
      </p>
      <pre>
        <code>{`configure preset="full"`}</code>
      </pre>
    </section>
  );
}

function FeatureTogglesSection() {
  return (
    <section id="feature-toggles" style={{ scrollMarginTop: 96 }}>
      <h1>Feature Toggles</h1>
      <p className="docs-lede">
        Fine-tune which pipeline stages run automatically.
      </p>

      <p>
        Assay&#39;s pipeline stages can be independently enabled or disabled.
        Configuration is stored in <code>.assay.config.json</code> at the
        project root.
      </p>

      <h2>Available Toggles</h2>
      <table className="t">
        <thead>
          <tr>
            <th>Toggle</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>sync</code>
            </td>
            <td>
              <span className="badge badge--signal">
                <span className="dot" />
                On
              </span>
            </td>
            <td>Automatic drift detection and re-sync of tracked pages</td>
          </tr>
          <tr>
            <td>
              <code>extraction</code>
            </td>
            <td>
              <span className="badge badge--signal">
                <span className="dot" />
                On
              </span>
            </td>
            <td>Claim extraction from evidence sections during ingestion</td>
          </tr>
          <tr>
            <td>
              <code>accumulation</code>
            </td>
            <td>
              <span className="badge badge--signal">
                <span className="dot" />
                On
              </span>
            </td>
            <td>
              Brief and stress_test results deposited back into the corpus
            </td>
          </tr>
          <tr>
            <td>
              <code>hygiene</code>
            </td>
            <td>
              <span className="badge">
                <span className="dot" />
                Off
              </span>
            </td>
            <td>Scheduled background sync at a configured time</td>
          </tr>
        </tbody>
      </table>

      <h2>Enabling / Disabling</h2>
      <pre>
        <code>{`# Enable background hygiene
npx assay toggle hygiene on

# Disable claim extraction (evidence-only mode)
npx assay toggle extraction off

# Disable accumulation loop
npx assay toggle accumulation off`}</code>
      </pre>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Presets
   ════════════════════════════════════════════════════════ */

function PresetsSection() {
  return (
    <section id="presets" style={{ scrollMarginTop: 96 }}>
      <h1>Presets</h1>
      <p className="docs-lede">
        Pre-configured bundles that set all toggles at once.
      </p>

      <table className="t">
        <thead>
          <tr>
            <th>Preset</th>
            <th>Extraction</th>
            <th>Sync</th>
            <th>Accumulation</th>
            <th>Hygiene</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>minimal</strong>
            </td>
            <td style={{ color: "var(--ink-3)" }}>Off</td>
            <td style={{ color: "var(--ink-3)" }}>Off</td>
            <td style={{ color: "var(--ink-3)" }}>Off</td>
            <td style={{ color: "var(--ink-3)" }}>Off</td>
          </tr>
          <tr>
            <td>
              <strong>standard</strong>{" "}
              <span style={{ color: "var(--signal-ink)", fontSize: 12 }}>
                (recommended)
              </span>
            </td>
            <td style={{ color: "var(--signal-ink)" }}>On</td>
            <td style={{ color: "var(--signal-ink)" }}>Daily</td>
            <td style={{ color: "var(--signal-ink)" }}>On</td>
            <td style={{ color: "var(--ink-3)" }}>Off</td>
          </tr>
          <tr>
            <td>
              <strong>full</strong>
            </td>
            <td style={{ color: "var(--signal-ink)" }}>On (Claude API)</td>
            <td style={{ color: "var(--signal-ink)" }}>Hourly</td>
            <td style={{ color: "var(--signal-ink)" }}>On</td>
            <td style={{ color: "var(--signal-ink)" }}>On</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>minimal</strong> — evidence only. No extraction, no
        accumulation, no sync. Good for quick evaluation or testing retrieval
        with pre-existing embeddings.
      </p>
      <p>
        <strong>standard</strong> (recommended) — evidence plus extraction with
        daily sync and accumulation enabled. This is the default configuration
        after installation. Covers the needs of most teams.
      </p>
      <p>
        <strong>full</strong> — evidence plus high-tier Claude extraction
        (default Haiku 4.5; switch to Sonnet via{" "}
        <code>configure subcommand=&quot;extraction&quot;</code> if a corpus
        warrants it) with hourly sync, accumulation, and background hygiene
        all enabled. Best for teams with large, actively changing corpora.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Notion Ingestion
   ════════════════════════════════════════════════════════ */

function NotionIngestionSection() {
  return (
    <section id="guides-notion" style={{ scrollMarginTop: 96 }}>
      <h1>Notion Ingestion</h1>
      <p className="docs-lede">
        Ingest your Notion workspace into the Assay corpus.
      </p>

      <h2>Setup</h2>
      <p>
        You need a Notion integration token. Create one at{" "}
        <a
          href="https://notion.so/my-integrations"
          style={linkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          notion.so/my-integrations
        </a>{" "}
        and share the pages you want to ingest with the integration.
      </p>
      <pre>
        <code>{`# In .env.local:
NOTION_API_KEY=ntn_...`}</code>
      </pre>

      <h2>Two-Step Pipeline</h2>
      <p>Ingestion uses two scripts that run sequentially:</p>
      <ol>
        <li>
          <strong>notion-crawl.mjs</strong> — calls the Notion API to fetch
          page content, converts blocks to Markdown, and writes the result to
          a JSON cache file.
        </li>
        <li>
          <strong>notion-ingest.mjs</strong> — reads the JSON cache, chunks at
          heading boundaries, generates embeddings, and stores evidence
          records in the local SQLite corpus.
        </li>
      </ol>

      <h2>Incremental Mode</h2>
      <p>
        By default, the crawl script only re-fetches pages that have changed
        since the last run (based on Notion&#39;s{" "}
        <code>last_edited_time</code>). This makes subsequent ingestion runs
        fast — typically under 30 seconds for workspaces with few recent
        edits.
      </p>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Background Hygiene
   ════════════════════════════════════════════════════════ */

function BackgroundHygieneSection() {
  return (
    <section id="guides-hygiene" style={{ scrollMarginTop: 96 }}>
      <h1>Background Hygiene</h1>
      <p className="docs-lede">
        Automated sync to keep your corpus fresh without manual intervention.
      </p>

      <p>
        Background hygiene runs an automated sync at a configurable time. When
        enabled, it checks all tracked pages for drift and re-processes any
        that have changed.
      </p>

      <h2>Important Notes</h2>
      <ul>
        <li>
          <strong>Default: OFF.</strong> Background hygiene is disabled by
          default. Enable it when you are ready with{" "}
          <code>npx assay toggle hygiene on</code>.
        </li>
        <li>
          <strong>Machine must be running.</strong> If your laptop is asleep
          when the scheduled time arrives, the sync fires on next wake.
        </li>
        <li>
          <strong>Recommended schedule:</strong> daily at a quiet hour (e.g. 3
          AM local time) to minimize disruption.
        </li>
      </ul>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Troubleshooting
   ════════════════════════════════════════════════════════ */

function TroubleshootingSection() {
  return (
    <section id="guides-troubleshooting" style={{ scrollMarginTop: 96 }}>
      <h1>Troubleshooting</h1>
      <p className="docs-lede">Common issues and how to fix them.</p>

      <table className="t">
        <thead>
          <tr>
            <th>Issue</th>
            <th>Cause</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>/assay-*</code> returns &quot;MCP not connected&quot;
            </td>
            <td>
              Claude Desktop doesn&#39;t see the server, or the MCP binary
              hasn&#39;t been built
            </td>
            <td>
              Settings → Developer → refresh the MCP entry, then restart
              Claude Desktop. Rebuild with{" "}
              <code>cd mcp-server &amp;&amp; npm run build</code>.
            </td>
          </tr>
          <tr>
            <td>Notion crawl returns 0 pages</td>
            <td>Integration disconnected or pages not shared</td>
            <td>
              Re-share pages with the integration at notion.so/my-integrations
            </td>
          </tr>
          <tr>
            <td>First-index stalls on model download</td>
            <td>
              Transformers.js cannot reach huggingface.co for the initial 420
              MB model fetch
            </td>
            <td>
              Check network. After the first successful download, indexing is
              fully offline.
            </td>
          </tr>
          <tr>
            <td>Retrieve returns empty results</td>
            <td>Cold start — no collection indexed yet</td>
            <td>
              Run <code>tsx bin/assay.ts add ~/your-docs</code> and{" "}
              <code>tsx bin/assay.ts index</code> first
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   SECTION: Glossary
   ════════════════════════════════════════════════════════ */

function GlossarySection() {
  return (
    <section id="glossary" style={{ scrollMarginTop: 96 }}>
      <h1>Glossary</h1>
      <p className="docs-lede">
        Key terms used throughout this documentation.
      </p>

      <dl style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <dt style={{ fontWeight: 500 }}>Hybrid search</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            Combines keyword and semantic search lanes into a single ranked
            list. Results that appear in multiple lanes are weighted more
            heavily.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Local embedding model</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            The embedding model that runs in-process on your machine to turn
            text into dense vectors. Embeddings live in the same SQLite file
            as the rest of the corpus. No API key, no network call at query
            time.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>
            Decisions{" "}
            <span style={{ fontWeight: 400, color: "var(--ink-3)" }}>
              (internally still the <code>claims</code> table for code
              continuity)
            </span>
          </dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            Atomic assertions and committed choices extracted from documents
            and conversations, each independently embedded for granular
            retrieval. A single evidence section may yield 5&ndash;15 decisions.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Evidence records</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            Document sections stored with embeddings in the local SQLite
            corpus. The primary unit of storage and retrieval context.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Stance signal</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            A 0.0-1.0 score indicating how strongly a decision carries
            organizational dissent or constraint.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Tombstoning</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            Soft-deletion of outdated records. Tombstoned records are marked
            inactive but not hard-deleted, preserving historical context.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Cosine distance gate</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            Minimum embedding distance threshold (0.10) used to filter
            redundant decisions during extraction. Ensures each decision is
            semantically distinct.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Keyword search</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            Built on SQLite&apos;s full-text search module. Assay indexes every
            evidence record&apos;s title, summary, and body content so exact
            keyword matches complement semantic similarity search.
          </dd>
        </div>
        <div>
          <dt style={{ fontWeight: 500 }}>Disclosure depth</dt>
          <dd
            style={{
              margin: "4px 0 0",
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}
          >
            How much of a decision a retrieval call returns: summary (id,
            statement, status), full reasoning (the trail the decision was
            recorded with), or excerpts (citations + supporting evidence). A
            future tier returns the original source snapshot taken at the time
            the decision was recorded; that snapshot tier isn&apos;t built
            today.
          </dd>
        </div>
      </dl>

      <hr className="hair-soft" style={{ margin: "48px 0 24px" }} />
      <div className="mono-meta">
        VERSION · 2026-05-14 · 31/31 INTEGRATION TESTS
        PASS
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE — all sections rendered at once
   ════════════════════════════════════════════════════════ */

export default function DocsPage() {
  return (
    <>
      {/* Getting Started */}
      <OverviewSection />
      <InstallationSection />
      <QuickStartSection />

      {/* Core Concepts */}
      <HowItWorksSection />
      <EvidenceAndClaimsSection />
      <DecisionsSection />
      <RetrievalSection />

      {/* Tools Reference */}
      <RetrieveSection2 />
      <StressTestSection />
      <ScanSection />
      <ConfigureSection />

      {/* Configuration */}
      <FeatureTogglesSection />
      <PresetsSection />

      {/* Guides */}
      <NotionIngestionSection />
      <BackgroundHygieneSection />
      <TroubleshootingSection />

      {/* Reference */}
      <GlossarySection />
    </>
  );
}
