import Link from "next/link";

export default function InstallationPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Installation
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Get Assay running on your machine in under 10 minutes.
      </p>

      {/* Prerequisites */}
      <section className="mb-10">
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
      </section>

      {/* Clone and install */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          1. Clone and Install
        </h2>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`git clone https://github.com/levievanshantz/assay.git
cd assay
npm install
cp .env.local.example .env.local`}</code>
        </pre>
      </section>

      {/* Environment variables */}
      <section className="mb-10">
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
      </section>

      {/* Database setup */}
      <section className="mb-10">
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
      </section>

      {/* Build */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          4. Build
        </h2>
        <p className="text-[hsl(220,15%,93%)] mb-4">
          Compile the MCP server and all supporting scripts.
        </p>
        <pre className="font-[family-name:var(--font-jetbrains)]">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`npm run build`}</code>
        </pre>
      </section>

      {/* Verify */}
      <section className="mb-10">
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
      </section>

      {/* Next step */}
      <section>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Next Step
        </h2>
        <p className="text-[hsl(220,15%,93%)]">
          Your Assay instance is ready.{" "}
          <Link
            href="/docs/quickstart"
            className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
          >
            Continue to the Quick Start guide &rarr;
          </Link>
        </p>
      </section>
    </article>
  );
}
