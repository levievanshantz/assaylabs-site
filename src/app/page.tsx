import Link from "next/link";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Topbar active="home" />

      <main className="route" id="home">
        <div className="route-tag">
          <div className="route-tag-inner">
            <span className="mono">/&nbsp;&nbsp;·&nbsp;&nbsp;HOME</span>
            <span className="mono-meta">REV 2026.05.10</span>
          </div>
        </div>

        {/* Hero */}
        <div className="page hero">
          <div className="eyebrow">
            <span className="dot" />
            <span>ASSAY LABS · DECISION PROVENANCE FOR PRODUCT TEAMS</span>
            <span style={{ marginLeft: "auto" }}>EST. 2026 · LOCAL-FIRST</span>
          </div>

          <h1>
            Give your product team a memory <em>that doesn&rsquo;t forget.</em>
          </h1>

          <p className="lede">
            Assay turns PRDs, strategy docs, research, and decisions into cited claims your AI tools
            can check against. Local-first, inspectable, built for PMs who ship.
          </p>

          <div className="hero-actions">
            <Link className="btn btn--lg" href="#install">
              Install the beta <span className="arrow">→</span>
            </Link>
            <Link className="btn btn--ghost btn--lg" href="/docs">
              Read the docs
            </Link>
          </div>

          <dl className="hero-meta">
            <div>
              <dt>Runs</dt>
              <dd>On your machine</dd>
            </div>
            <div>
              <dt>Backend</dt>
              <dd>SQLite + sqlite-vec</dd>
            </div>
            <div>
              <dt>Surface</dt>
              <dd>CLI · MCP · Claude Code</dd>
            </div>
            <div>
              <dt>Phase</dt>
              <dd>1 · Closed beta</dd>
            </div>
          </dl>
        </div>

        {/* §01 Pillars */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 01</div>
              <div>
                <h2 className="s-title">Three pillars.</h2>
                <p className="s-deck">
                  Capture, recall, audit. Every decision your team makes lands in one of these
                  three states. Everything Assay does is in service of moving evidence through
                  them &mdash; without losing the receipts.
                </p>
              </div>
            </div>

            <div className="pillars">
              <div className="pillar">
                <span className="num">PILLAR 01 — CAPTURE</span>
                <h3>
                  Three paths,
                  <br />
                  all idempotent.
                </h3>
                <p>
                  <strong>Ambient.</strong> Claude tags decisions inline as it works.{" "}
                  <strong>Manual.</strong> One CLI call against any markdown folder.{" "}
                  <strong>Watch.</strong> Re-index on save. Same dedupe rules, same hash gating,
                  same outcome.
                </p>
                <ul>
                  <li>
                    <span className="lbl">FORMATS</span>
                    <span className="desc">Markdown, Notion, soon Drive + Confluence</span>
                  </li>
                  <li>
                    <span className="lbl">DEDUPE</span>
                    <span className="desc">Content hash per chunk; re-index is a delta</span>
                  </li>
                  <li>
                    <span className="lbl">SPEED</span>
                    <span className="desc">≤60s for 50 docs on M2</span>
                  </li>
                </ul>
              </div>

              <div className="pillar">
                <span className="num">PILLAR 02 — RECALL</span>
                <h3>
                  Time-aware,
                  <br />
                  provenance-aware.
                </h3>
                <p>
                  Hybrid scoring blends 0.7 cosine + 0.2 recency (90-day half-life) + 0.1 source
                  weight. Four retrieval paths merged via reciprocal rank fusion: evidence
                  vector, claims vector, evidence FTS, claims FTS.
                </p>
                <ul>
                  <li>
                    <span className="lbl">SCORING</span>
                    <span className="desc">cos · 0.7 + recency · 0.2 + source · 0.1</span>
                  </li>
                  <li>
                    <span className="lbl">FUSION</span>
                    <span className="desc">RRF across 4 retrievers</span>
                  </li>
                  <li>
                    <span className="lbl">CITES</span>
                    <span className="desc">Returns paragraph + sha + line range</span>
                  </li>
                </ul>
              </div>

              <div className="pillar">
                <span className="num">PILLAR 03 — AUDIT</span>
                <h3>
                  Every state change
                  <br />
                  recorded.
                </h3>
                <p>
                  Initial deposit, promotion, supersession, rejection &mdash; every transition is
                  a row. A claim that was true on Tuesday and superseded on Thursday tells you
                  both. Decisions never lose their footnotes.
                </p>
                <ul>
                  <li>
                    <span className="lbl">LOG</span>
                    <span className="desc">Append-only state-change ledger</span>
                  </li>
                  <li>
                    <span className="lbl">DRIFT</span>
                    <span className="desc">Source-edit alerts on dependent claims</span>
                  </li>
                  <li>
                    <span className="lbl">EXPORT</span>
                    <span className="desc">JSONL · stable hashes · diff-friendly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* §02 How it works */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 02</div>
              <div>
                <h2 className="s-title">How it works.</h2>
                <p className="s-deck">
                  Most tools compress meaning to make it portable. Assay preserves it &mdash;
                  atomic, cited, searchable from multiple angles.
                </p>
              </div>
            </div>

            <div className="steps">
              <div className="step">
                <span className="step-num">01</span>
                <h4>Index a folder</h4>
                <p>
                  Point Assay at a path. Files are chunked at 512 tokens, hashed, embedded with
                  bge-large or OpenAI 3-small.
                </p>
              </div>
              <div className="step">
                <span className="step-num">02</span>
                <h4>Extract atomic claims</h4>
                <p>
                  Constraints, commitments, deferrals, assumptions, findings, recommendations,
                  metrics &mdash; typed and cited.
                </p>
              </div>
              <div className="step">
                <span className="step-num">03</span>
                <h4>Retrieve through 4 layers</h4>
                <p>
                  Evidence vector + claims vector + evidence FTS + claims FTS, merged via
                  reciprocal rank fusion.
                </p>
              </div>
              <div className="step">
                <span className="step-num">04</span>
                <h4>Query with breadth</h4>
                <p>
                  Briefs, stress tests, raw retrieval &mdash; all with cited sources and
                  contradiction detection.
                </p>
              </div>
            </div>

            {/* Terminal demo */}
            <div style={{ marginTop: 48 }}>
              <div className="mono" style={{ marginBottom: 12 }}>
                CLI · LIVE INDEX
              </div>
              <pre className="terminal">
                <span className="dim">
                  {"┌──────────────────────────────────────────────────────────────────────────────┐"}
                </span>
                {"\n"}
                <span className="dim">│ </span>
                <span className="prompt">$</span>
                {" assay add ~/work/prds --name prds                                          "}
                <span className="dim">│</span>
                {"\n"}
                <span className="dim">│ </span>
                <span className="prompt">$</span>
                {" assay index                                                                "}
                <span className="dim">│</span>
                {"\n"}
                <span className="dim">
                  {"└──────────────────────────────────────────────────────────────────────────────┘"}
                </span>
                {"\n\n"}
                <span className="dim">[1/3]</span>
                {" scanning  ./prds              "}
                <span className="ok">✓ 64 documents · 4,184 paragraphs · 3.8s</span>
                {"\n"}
                <span className="dim">[2/3]</span>
                {" embedding bge-large-1024d    "}
                <span className="ok">✓ on-device · 11.4s</span>
                {"\n"}
                <span className="dim">[3/3]</span>
                {" extracting claims            "}
                <span className="ok">✓ 1,184 found · 914 cited</span>
                {"\n\n"}
                <span className="dim">
                  ─── claims ──────────────────────────────────────────────────────────────────
                </span>
                {"\n"}
                <span className="key">CLM-0421</span>
                {"  Onboarding within 24h yields "}
                <span className="ok">2.4×</span>
                {" retention.\n          "}
                <span className="dim">→ PRD-184 §2.3 · sha:8f1e..</span>
                {"\n"}
                <span className="key">CLM-0422</span>
                {'  "Local-first" recurred in 9/12 customer interviews.\n          '}
                <span className="dim">→ interviews/2026-Q1 · sha:c2a4..</span>
                {"\n\n"}
                <span className="ok">✓</span>
                {" wrote ~/.assay/assay.db · 24 KB · ready for Claude Code"}
              </pre>
            </div>
          </div>
        </section>

        {/* §03 vs */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 03</div>
              <div>
                <h2 className="s-title">Why not just RAG?</h2>
                <p className="s-deck">
                  Standard tools embed documents whole and return chunks by proximity. Assay
                  treats the <span className="serif-it">claim</span> as the unit of value,
                  indexes both, and merges results across four retrievers.
                </p>
              </div>
            </div>

            <div className="vs">
              <div className="vs-card">
                <div className="lbl">Standard RAG</div>
                <div className="nature">
                  Embeds documents whole. Returns chunks by proximity. One angle of retrieval.
                </div>
                <div className="assay-lbl">Assay</div>
                <div className="assay">
                  Four retrieval paths merged by RRF. The same document surfaces for different
                  reasons depending on what you ask.
                </div>
              </div>
              <div className="vs-card">
                <div className="lbl">Agent crawling</div>
                <div className="nature">
                  Reads fresh each time. No memory between runs. Aggregation loses the
                  connections across documents.
                </div>
                <div className="assay-lbl">Assay</div>
                <div className="assay">
                  Indexes once. Retrieves instantly. Each use deposits synthesis back.
                  Connections compound &mdash; they&rsquo;re never discarded.
                </div>
              </div>
              <div className="vs-card">
                <div className="lbl">Notion AI / built-in search</div>
                <div className="nature">
                  Tied to one tool. Cited results are paragraph-level, no provenance graph, no
                  claim layer.
                </div>
                <div className="assay-lbl">Assay</div>
                <div className="assay">
                  Source-agnostic. Markdown, Notion, more coming. Provenance graph, typed
                  claims, contradiction detection on top.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* §04 MCP surface */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 04</div>
              <div>
                <h2 className="s-title">The MCP surface.</h2>
                <p className="s-deck">
                  Six named agents inside Claude Desktop or Claude Code. Each MCP tool answers
                  one question &mdash; same shape, one call, one structured response. Two speak
                  to the decision graph, one to evidence, three to retrieval.
                </p>
              </div>
            </div>

            <div className="agents">
              <div className="agent">
                <div className="grp">DECISIONS</div>
                <div className="nm">/assay-decide</div>
                <div className="blurb">
                  Returns the cited briefing for an open decision: claims for, against, and
                  adjacent context.
                </div>
              </div>
              <div className="agent">
                <div className="grp">DECISIONS</div>
                <div className="nm">/assay-trace</div>
                <div className="blurb">
                  Walks a decision back to its sources. Surfaces every claim and source-edit
                  that led here.
                </div>
              </div>
              <div className="agent">
                <div className="grp">EVIDENCE</div>
                <div className="nm">/assay-cite</div>
                <div className="blurb">
                  Inline-cite a sentence against the corpus. Paragraph + sha + range, returned
                  as text.
                </div>
              </div>
              <div className="agent">
                <div className="grp">RETRIEVAL</div>
                <div className="nm">/assay-retrieve</div>
                <div className="blurb">
                  Hybrid retrieval over evidence and claims. Returns ranked records with
                  provenance.
                </div>
              </div>
              <div className="agent">
                <div className="grp">RETRIEVAL</div>
                <div className="nm">/assay-scan</div>
                <div className="blurb">
                  Fast pass over the corpus for a topic. Returns counts and top sources, not
                  full claims.
                </div>
              </div>
              <div className="agent">
                <div className="grp">RETRIEVAL</div>
                <div className="nm">/assay-stress</div>
                <div className="blurb">
                  Stress-test a draft against the corpus. Returns contradictions and weak
                  claims.
                </div>
              </div>
            </div>

            <p className="mono-meta" style={{ marginTop: 24, textAlign: "center" }}>
              Phase 1 is local-first: single-user SQLite at{" "}
              <code
                style={{
                  fontFamily: "var(--mono)",
                  background: "var(--paper-2)",
                  padding: "2px 6px",
                  borderRadius: 2,
                }}
              >
                ~/.assay/assay.db
              </code>
              . No Postgres. No cloud. No API key.
            </p>
          </div>
        </section>

        {/* §05 Knowledge graph */}
        <section className="s">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 05</div>
              <div>
                <h2 className="s-title">
                  A graph
                  <br />
                  of receipts.
                </h2>
                <p className="s-deck">
                  Every claim points to its evidence. Every decision points to the claims that
                  justified it. The graph is the audit trail.
                </p>
              </div>
            </div>

            <div className="graph">
              <div className="grid-bg" />
              <div className="legend">
                <div className="row">
                  <span className="dot" style={{ background: "var(--ignition)" }} /> Decision
                </div>
                <div className="row">
                  <span className="dot" style={{ background: "var(--reagent)" }} /> Claim
                </div>
                <div className="row">
                  <span className="dot" style={{ background: "var(--bone-3)" }} /> Evidence
                </div>
                <div className="row">
                  <span className="dot" style={{ background: "var(--signal)" }} /> Validated
                </div>
              </div>
              <div className="meta">
                CORPUS · 64 DOCS
                <br />
                1,184 CLAIMS · 42 DECISIONS
              </div>
              <svg viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid meet">
                {/* edges */}
                <g stroke="rgba(233,229,218,0.18)" strokeWidth="1" fill="none">
                  <line x1="600" y1="240" x2="320" y2="120" />
                  <line x1="600" y1="240" x2="380" y2="380" />
                  <line x1="600" y1="240" x2="900" y2="120" />
                  <line x1="600" y1="240" x2="860" y2="380" />
                  <line x1="600" y1="240" x2="220" y2="260" />
                  <line x1="600" y1="240" x2="980" y2="260" />
                  <line x1="320" y1="120" x2="180" y2="80" />
                  <line x1="320" y1="120" x2="200" y2="180" />
                  <line x1="900" y1="120" x2="1040" y2="60" />
                  <line x1="900" y1="120" x2="1060" y2="180" />
                  <line x1="380" y1="380" x2="240" y2="420" />
                  <line x1="380" y1="380" x2="440" y2="440" />
                  <line x1="860" y1="380" x2="1000" y2="430" />
                  <line x1="860" y1="380" x2="780" y2="440" />
                  <line x1="220" y1="260" x2="100" y2="300" />
                  <line x1="980" y1="260" x2="1120" y2="300" />
                  <line x1="320" y1="120" x2="900" y2="120" />
                </g>
                {/* evidence dots */}
                <g fill="#8A867E">
                  <circle cx="180" cy="80" r="3" />
                  <circle cx="200" cy="180" r="3" />
                  <circle cx="1040" cy="60" r="3" />
                  <circle cx="1060" cy="180" r="3" />
                  <circle cx="240" cy="420" r="3" />
                  <circle cx="440" cy="440" r="3" />
                  <circle cx="1000" cy="430" r="3" />
                  <circle cx="780" cy="440" r="3" />
                  <circle cx="100" cy="300" r="3" />
                  <circle cx="1120" cy="300" r="3" />
                  <circle cx="60" cy="160" r="2.5" />
                  <circle cx="80" cy="380" r="2.5" />
                  <circle cx="1140" cy="160" r="2.5" />
                  <circle cx="1140" cy="380" r="2.5" />
                </g>
                {/* claim nodes (reagent) */}
                <g fill="oklch(0.66 0.10 220)">
                  <circle cx="320" cy="120" r="6" />
                  <circle cx="380" cy="380" r="6" />
                  <circle cx="900" cy="120" r="6" />
                  <circle cx="860" cy="380" r="6" />
                  <circle cx="220" cy="260" r="5" />
                  <circle cx="980" cy="260" r="5" />
                </g>
                {/* validated claim (signal) */}
                <g fill="oklch(0.72 0.14 145)">
                  <circle cx="380" cy="380" r="6" />
                </g>
                {/* decision (ignition) */}
                <g>
                  <circle cx="600" cy="240" r="14" fill="oklch(0.66 0.18 38)" />
                  <circle
                    cx="600"
                    cy="240"
                    r="22"
                    fill="none"
                    stroke="oklch(0.66 0.18 38)"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <circle
                    cx="600"
                    cy="240"
                    r="34"
                    fill="none"
                    stroke="oklch(0.66 0.18 38)"
                    strokeWidth="1"
                    opacity="0.18"
                  />
                </g>
                {/* annotations */}
                <g fontFamily="Geist Mono" fontSize="10" fill="#BDB8AC" letterSpacing="1">
                  <text x="616" y="244">DEC-007</text>
                  <text x="336" y="116">CLM-0421</text>
                  <text x="396" y="384">CLM-0422</text>
                  <text x="916" y="116">CLM-0425</text>
                  <text x="876" y="384">CLM-0426</text>
                </g>
              </svg>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", marginTop: 24 }}>
              <div style={{ padding: "16px 0" }}>
                <div className="mono">CORPUS</div>
                <div className="num" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  64
                </div>
              </div>
              <div style={{ padding: "16px 0" }}>
                <div className="mono">CLAIMS</div>
                <div className="num" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  1,184
                </div>
              </div>
              <div style={{ padding: "16px 0" }}>
                <div className="mono">DECISIONS</div>
                <div className="num" style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
                  42
                </div>
              </div>
              <div style={{ padding: "16px 0" }}>
                <div className="mono">DRIFT</div>
                <div
                  className="num"
                  style={{ fontSize: 32, letterSpacing: "-0.02em", color: "var(--ignition-ink)" }}
                >
                  3
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* §06 Install / CTA */}
        <section className="s" id="install">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 06</div>
              <div>
                <h2 className="s-title">
                  Install in five
                  <br />
                  minutes.
                </h2>
                <p className="s-deck">
                  Closed beta. Levi walks each user through this live. macOS or Linux, Node 18+,
                  Claude Code installed. No API key required.
                </p>
              </div>
            </div>

            <pre className="terminal">
              <span className="dim"># clone</span>
              {"\n"}
              <span className="prompt">$</span> git clone https://github.com/levievanshantz/assaylabs.git
              {"\n"}
              <span className="prompt">$</span> cd assaylabs
              {"\n"}
              <span className="prompt">$</span> git checkout phase-1-sqlite-local-first
              {"\n"}
              <span className="prompt">$</span> npm install
              {"\n\n"}
              <span className="dim"># index your docs</span>
              {"\n"}
              <span className="prompt">$</span> ./node_modules/.bin/tsx bin/assay.ts add ~/my-prds --name prds
              {"\n"}
              <span className="prompt">$</span> ./node_modules/.bin/tsx bin/assay.ts index
              {"\n"}
              <span className="prompt">$</span> ./node_modules/.bin/tsx bin/assay.ts status
              {"\n\n"}
              <span className="ok">✓</span> assay.db ready · indexed 64 docs in 11.4s
            </pre>

            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--lg" href="/docs">
                Read the install guide <span className="arrow">→</span>
              </Link>
              <a
                className="btn btn--ghost btn--lg"
                href="https://github.com/levievanshantz/assaylabs"
              >
                Star on GitHub
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
