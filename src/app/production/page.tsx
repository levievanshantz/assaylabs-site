import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Production deployment (Postgres + cloud embeddings) — Assay",
  description:
    "Cloud-hosted Assay: Postgres + pgvector + OpenAI embeddings + Phi-4 / Anthropic claim extraction. For teams that need multi-machine sharing or have already adopted a cloud database.",
};

const linkCls =
  "text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110";

export default function ProductionPage() {
  return (
    <main className="min-h-screen bg-[hsl(220,15%,6%)] text-[hsl(220,15%,93%)]">
      {/* Top nav — consistent with landing + compare pages */}
      <nav className="sticky top-0 z-50 border-b border-[hsl(220,15%,18%)] bg-[hsl(220,15%,6%)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[hsl(220,15%,93%)]"
          >
            AssayLabs
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/compare"
              className="text-[hsl(220,10%,55%)] transition-colors hover:text-[hsl(220,15%,93%)]"
            >
              Compare
            </Link>
            <Link
              href="/docs"
              className="text-[hsl(220,10%,55%)] transition-colors hover:text-[hsl(220,15%,93%)]"
            >
              Docs
            </Link>
            <a
              href="https://github.com/levievanshantz/assay"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[hsl(234,100%,71%)] px-3.5 py-1.5 text-sm font-medium text-[hsl(220,15%,6%)] transition-opacity hover:opacity-90"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-[hsl(220,10%,55%)]">
            Production deployment
          </p>
          <h1 className="mb-4 text-4xl font-bold text-[hsl(220,15%,93%)] md:text-5xl">
            Assay on Postgres + OpenAI
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-[hsl(220,10%,60%)]">
            The cloud-hosted deployment. Postgres with pgvector for the vector
            store, OpenAI embeddings by default, and claim extraction via
            Phi-4 (Ollama) or Anthropic. Choose this path only when your
            workflow specifically requires a shared cloud database or existing
            Postgres infrastructure.
          </p>
        </div>

        {/* Prefer local? */}
        <div className="mb-10 rounded-lg border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-5">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong>Just want to try Assay?</strong> Start with the local
            version — no database setup, no API key.{" "}
            <Link href="/docs" className={linkCls}>
              Go to the local version →
            </Link>
          </p>
        </div>

        {/* When to choose this */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[hsl(220,15%,93%)]">
            When to choose this
          </h2>
          <ul className="space-y-2 text-[hsl(220,15%,93%)]">
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                Multiple people need to query the same corpus from different
                machines without each maintaining a local copy.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                You already run Postgres in production and want Assay to share
                that infrastructure.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                You need the claim-extraction pipeline that runs post-ingestion
                (Phi-4 or Anthropic). The local version ships with evidence-
                level retrieval; the claim-extraction layer on the local path
                is a separate work item.
              </span>
            </li>
          </ul>
        </section>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[hsl(220,15%,93%)]">
            Prerequisites
          </h2>
          <ul className="space-y-2 text-[hsl(220,15%,93%)]">
            <li className="flex items-start gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                <strong>PostgreSQL 15+</strong> with the <code>pgvector</code>{" "}
                extension installed and enabled. Self-hosted or managed
                (Supabase, Neon, RDS) both fine.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                <strong>Node.js 18+</strong>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                <strong>OpenAI API key</strong> — used to generate embeddings
                (<code>text-embedding-3-small</code>, 1536 dimensions). Cost
                is approximately $0.02 per million tokens; a 130-page Notion
                workspace costs about $0.08 to embed fully.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                <strong>Claude Code</strong> — the MCP client surfacing the
                slash commands.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 shrink-0 text-[hsl(234,100%,71%)]">
                &#x2022;
              </span>
              <span>
                <strong>Optional:</strong> an <code>ANTHROPIC_API_KEY</code>{" "}
                (required only if you select the Anthropic claim extractor),
                Ollama + Phi-4 locally (for the offline claim extractor), a
                Notion API key (only if you plan to ingest Notion pages).
              </span>
            </li>
          </ul>

          <div className="mt-5 rounded-lg border-l-4 border-[hsl(234,100%,71%)] bg-[hsl(220,15%,9%)] px-5 py-4">
            <p className="text-sm text-[hsl(220,15%,93%)]">
              <strong className="text-[hsl(234,100%,71%)]">
                Managed-Postgres note:
              </strong>{" "}
              If you use a managed provider, pgvector is usually pre-installed.
              Run <code>CREATE EXTENSION IF NOT EXISTS vector;</code> once in a
              SQL console and you&#39;re done.
            </p>
          </div>
        </section>

        {/* Install */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[hsl(220,15%,93%)]">
            Install
          </h2>
          <ol className="space-y-6 text-[hsl(220,15%,93%)]">
            <li>
              <h3 className="mb-2 text-lg font-medium">1. Clone &amp; install</h3>
              <pre className="font-[family-name:var(--font-jetbrains)]">
                <code className="text-sm text-[hsl(220,15%,93%)]">{`git clone https://github.com/levievanshantz/assaylabs.git
cd assaylabs
npm install
cp .env.local.example .env.local`}</code>
              </pre>
            </li>
            <li>
              <h3 className="mb-2 text-lg font-medium">
                2. Configure environment variables
              </h3>
              <p className="mb-3 text-[hsl(220,15%,93%)]">
                Open <code>.env.local</code> and fill in:
              </p>
              <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)]">
                      <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                        Variable
                      </th>
                      <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                        Required
                      </th>
                      <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-[hsl(220,15%,93%)]">
                    <tr className="border-b border-[hsl(220,15%,18%)]">
                      <td className="px-4 py-3"><code>DATABASE_URL</code></td>
                      <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                      <td className="px-4 py-3">
                        Postgres connection string.{" "}
                        <code>postgresql://user:pass@host:5432/assay</code>
                      </td>
                    </tr>
                    <tr className="border-b border-[hsl(220,15%,18%)]">
                      <td className="px-4 py-3"><code>OPENAI_API_KEY</code></td>
                      <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                      <td className="px-4 py-3">Embedding generation.</td>
                    </tr>
                    <tr className="border-b border-[hsl(220,15%,18%)]">
                      <td className="px-4 py-3">
                        <code>ANTHROPIC_API_KEY</code>
                      </td>
                      <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                      <td className="px-4 py-3">
                        Only needed when <code>EXTRACTION_MODE=anthropic</code>.
                      </td>
                    </tr>
                    <tr className="border-b border-[hsl(220,15%,18%)]">
                      <td className="px-4 py-3"><code>NOTION_API_KEY</code></td>
                      <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                      <td className="px-4 py-3">
                        Only needed for Notion ingestion.
                      </td>
                    </tr>
                    <tr className="border-b border-[hsl(220,15%,18%)]">
                      <td className="px-4 py-3"><code>EXTRACTION_MODE</code></td>
                      <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                      <td className="px-4 py-3">
                        <code>ollama</code>, <code>anthropic</code>, or{" "}
                        <code>subagent</code>. Defaults to{" "}
                        <code>subagent</code>.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3"><code>PRODUCT_ID</code></td>
                      <td className="px-4 py-3 text-[hsl(220,10%,55%)]">Optional</td>
                      <td className="px-4 py-3">
                        UUID scoping all evidence to one product. Auto-generated
                        on first run.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <h3 className="mb-2 text-lg font-medium">3. Initialize the database</h3>
              <p className="mb-3 text-[hsl(220,15%,93%)]">
                Creates tables, enables pgvector, sets up indexes, runs any
                pending migrations.
              </p>
              <pre className="font-[family-name:var(--font-jetbrains)]">
                <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run setup-db`}</code>
              </pre>
            </li>
            <li>
              <h3 className="mb-2 text-lg font-medium">4. Build</h3>
              <pre className="font-[family-name:var(--font-jetbrains)]">
                <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run build`}</code>
              </pre>
            </li>
            <li>
              <h3 className="mb-2 text-lg font-medium">5. Verify</h3>
              <pre className="font-[family-name:var(--font-jetbrains)]">
                <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run verify`}</code>
              </pre>
              <p className="mt-3 text-[hsl(220,15%,93%)]">
                Expected: green checks for database connectivity, pgvector,
                embedding generation, and table schema.
              </p>
            </li>
            <li>
              <h3 className="mb-2 text-lg font-medium">
                6. Wire up the MCP server
              </h3>
              <p className="mb-3 text-[hsl(220,15%,93%)]">
                In{" "}
                <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>
                :
              </p>
              <pre className="font-[family-name:var(--font-jetbrains)]">
                <code className="text-sm text-[hsl(220,15%,93%)]">{`"assay": {
  "command": "/opt/anaconda3/bin/node",
  "args": ["/absolute/path/to/assaylabs/mcp-server/dist/index.js"],
  "env": {
    "DATABASE_URL": "postgresql://...",
    "OPENAI_API_KEY": "sk-...",
    "PRODUCT_ID": "..."
  }
}`}</code>
              </pre>
              <p className="mt-3 text-[hsl(220,15%,93%)]">
                Restart Claude Desktop. The slash commands{" "}
                <code>/assay-retrieve</code>, <code>/assay-scan</code>,{" "}
                <code>/assay-stress-test</code>, <code>/assay-config</code>{" "}
                become available.
              </p>
            </li>
          </ol>
        </section>

        {/* Extraction modes */}
        <section className="mb-12">
          <h2 className="mb-3 text-2xl font-semibold text-[hsl(220,15%,93%)]">
            Claim extraction modes
          </h2>
          <p className="mb-5 max-w-3xl text-[hsl(220,10%,60%)]">
            After ingestion, Assay optionally runs a claim extraction pass that
            breaks each section into atomic assertions. These claims power
            contradiction detection and the stress-test verdict engine. Three
            backends are supported, controlled by the{" "}
            <code>EXTRACTION_MODE</code> environment variable.
          </p>
          <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)]">
                  <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                    Mode
                  </th>
                  <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                    Where it runs
                  </th>
                  <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                    Tradeoff
                  </th>
                </tr>
              </thead>
              <tbody className="text-[hsl(220,15%,93%)]">
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3"><code>subagent</code> (default)</td>
                  <td className="px-4 py-3">
                    Claude Code subagent at ingestion time
                  </td>
                  <td className="px-4 py-3">
                    Highest quality, no extra keys, uses your current
                    subscription.
                  </td>
                </tr>
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3"><code>ollama</code></td>
                  <td className="px-4 py-3">
                    Local Ollama serving <code>phi-4</code> (or any model you
                    configure)
                  </td>
                  <td className="px-4 py-3">
                    Offline, privacy-preserving, free per-token; needs ~14 GB
                    RAM for Phi-4.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><code>anthropic</code></td>
                  <td className="px-4 py-3">
                    Anthropic API directly (Haiku)
                  </td>
                  <td className="px-4 py-3">
                    Fast, consistent, requires{" "}
                    <code>ANTHROPIC_API_KEY</code> and per-token cost.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Operational differences from the local version */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[hsl(220,15%,93%)]">
            Differences from the local version
          </h2>
          <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)]">
                  <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                    Axis
                  </th>
                  <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                    Local version
                  </th>
                  <th className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                    Production (this page)
                  </th>
                </tr>
              </thead>
              <tbody className="text-[hsl(220,15%,93%)]">
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3">Store</td>
                  <td className="px-4 py-3">
                    SQLite + sqlite-vec + FTS5 (single file)
                  </td>
                  <td className="px-4 py-3">Postgres + pgvector + tsvector</td>
                </tr>
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3">Embeddings</td>
                  <td className="px-4 py-3">
                    Local <code>bge-large-en-v1.5</code>, 1024d (no API key)
                  </td>
                  <td className="px-4 py-3">
                    OpenAI <code>text-embedding-3-small</code>, 1536d
                  </td>
                </tr>
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3">Claim extraction</td>
                  <td className="px-4 py-3">Not included in the local path today</td>
                  <td className="px-4 py-3">
                    Included — subagent / Ollama / Anthropic
                  </td>
                </tr>
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3">Offline</td>
                  <td className="px-4 py-3">
                    Yes after the one-time model download
                  </td>
                  <td className="px-4 py-3">
                    No — requires OpenAI at ingest/query time
                  </td>
                </tr>
                <tr className="border-b border-[hsl(220,15%,18%)]">
                  <td className="px-4 py-3">Multi-machine sharing</td>
                  <td className="px-4 py-3">
                    Copy the single DB file (<code>cp</code>)
                  </td>
                  <td className="px-4 py-3">
                    Native — multiple clients to one Postgres
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Install complexity</td>
                  <td className="px-4 py-3">Clone → index. ~5 min.</td>
                  <td className="px-4 py-3">
                    Provision Postgres, set 3+ env vars, run migrations, verify
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="mt-12 flex gap-4 border-t border-[hsl(220,15%,18%)] pt-10">
          <Link href="/docs" className={linkCls}>
            ← Back to the local version
          </Link>
          <Link href="/compare" className={linkCls}>
            Feature-map comparison →
          </Link>
        </div>
      </div>
    </main>
  );
}
