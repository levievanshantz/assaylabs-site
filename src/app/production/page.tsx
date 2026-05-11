import type { Metadata } from "next";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Production deployment (Postgres + cloud embeddings) — Assay",
  description:
    "Cloud-hosted Assay: Postgres + pgvector + OpenAI embeddings + Phi-4 / Anthropic claim extraction. For teams that need multi-machine sharing.",
};

export default function ProductionPage() {
  return (
    <>
      <Topbar active="production" />

      <main className="route" id="production">
        <div className="route-tag">
          <div className="route-tag-inner">
            <span className="mono">/production&nbsp;&nbsp;·&nbsp;&nbsp;CLOUD TIER · PHASE 3</span>
            <span className="mono-meta">DRAFT · NOT YET SHIPPED</span>
          </div>
        </div>

        <div className="page prod-hero">
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
            <span>PRODUCTION INSTALL · POSTGRES + PGVECTOR</span>
          </div>
          <h1>
            Run Assay <em>as a team.</em>
          </h1>
          <p className="lede">
            The Phase 3 path: a shared corpus on Postgres + pgvector. Same schema as the SQLite
            build, identical retrieval semantics, multi-user writes. Hosted or self-hosted.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap" }}>
            <span className="badge badge--ignition">
              <span className="dot" />
              Self-hosted
            </span>
            <span className="badge">
              <span className="dot" />
              Postgres ≥ 16
            </span>
            <span className="badge">
              <span className="dot" />
              pgvector ≥ 0.7
            </span>
            <span className="badge">
              <span className="dot" />
              Node ≥ 20
            </span>
          </div>
        </div>

        <div className="page" style={{ padding: "64px 0 96px" }}>
          <div className="install-step">
            <div className="num">01</div>
            <div>
              <h3>Clone &amp; install</h3>
              <p>
                Pull the production branch and install dependencies. Same repo as the local
                build; the production tier is selected by environment.
              </p>
              <pre className="terminal">
                <span className="prompt">$</span> git clone https://github.com/levievanshantz/assaylabs.git
                {"\n"}
                <span className="prompt">$</span> cd assaylabs
                {"\n"}
                <span className="prompt">$</span> git checkout main
                {"\n"}
                <span className="prompt">$</span> npm install
              </pre>
            </div>
          </div>

          <div className="install-step">
            <div className="num">02</div>
            <div>
              <h3>Provision Postgres + pgvector</h3>
              <p>
                Any Postgres ≥ 16 with the <code>pgvector</code> extension. Supabase, Neon, RDS,
                or self-hosted. Assay needs a single database; no schema-per-tenant.
              </p>
              <pre className="terminal">
                <span className="prompt">$</span> psql $DATABASE_URL -c &quot;CREATE EXTENSION IF NOT EXISTS vector;&quot;
                {"\n"}
                <span className="prompt">$</span> psql $DATABASE_URL -c &quot;CREATE EXTENSION IF NOT EXISTS pg_trgm;&quot;
              </pre>
            </div>
          </div>

          <div className="install-step">
            <div className="num">03</div>
            <div>
              <h3>Initialize the database</h3>
              <p>
                Creates tables, enables pgvector, sets up indexes, runs any pending migrations.
                Idempotent &mdash; safe to re-run.
              </p>
              <pre className="terminal">
                <span className="prompt">$</span> ASSAY_DB=postgres ASSAY_DB_URL=$DATABASE_URL \
                {"\n"}
                {"    "}./node_modules/.bin/tsx bin/assay.ts migrate
              </pre>
            </div>
          </div>

          <div className="install-step">
            <div className="num">04</div>
            <div>
              <h3>Build</h3>
              <p>
                Compile the MCP server and CLI. Output lands in <code>mcp-server/dist</code> and{" "}
                <code>bin/dist</code>.
              </p>
              <pre className="terminal">
                <span className="prompt">$</span> npm run build
              </pre>
            </div>
          </div>

          <div className="install-step">
            <div className="num">05</div>
            <div>
              <h3>Verify</h3>
              <p>Runs the integration suite against the production database. 31 tests, ≤30s.</p>
              <pre className="terminal">
                <span className="prompt">$</span> npm run verify
                {"\n"}
                <span className="ok">✓</span> 31/31 tests pass · 18.4s
              </pre>
            </div>
          </div>

          <div
            style={{
              marginTop: 48,
              padding: 32,
              border: "1px solid var(--rule)",
              background: "var(--paper)",
              borderRadius: 2,
            }}
          >
            <div className="mono" style={{ marginBottom: 12 }}>
              PHASE 3 GATES
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              <div>
                <div className="num" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  ≥3
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-3)" }}>
                  paying teams committed
                </p>
              </div>
              <div>
                <div className="num" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  100k
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-3)" }}>
                  claims indexed across teams
                </p>
              </div>
              <div>
                <div className="num" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  p95
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-3)" }}>
                  retrieve &lt; 250ms
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
