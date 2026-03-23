import Link from "next/link";

export default function QuickStartPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Quick Start
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        See value in 5 minutes.
      </p>

      {/* Step 1: Seed */}
      <section className="mb-10">
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
      </section>

      {/* Step 2: Configure Claude Code */}
      <section className="mb-10">
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
    "intelligence-ledger": {
      "command": "node",
      "args": ["/absolute/path/to/assay/dist/mcp-server.js"],
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
      </section>

      {/* Step 3: Test it */}
      <section className="mb-10">
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
      </section>

      {/* Expected output */}
      <section className="mb-10">
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
      </section>

      {/* Next steps */}
      <section>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Next Steps
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/how-it-works"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Learn how the pipeline works end-to-end
            </Link>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/guides/notion"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Ingest your own Notion pages
            </Link>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/tools/stress-test"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Stress-test a proposal against your evidence
            </Link>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/extraction-modes"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Choose an extraction mode
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
