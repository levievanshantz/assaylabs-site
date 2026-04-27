export default function Home() {
  return (
    <>
      {/* ──────────────────────────── NAV ──────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-lg font-semibold tracking-tight">
            AssayLabs
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/compare"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Compare
            </a>
            <a
              href="/docs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </a>
            <a
              href="/graph"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Graph
            </a>
            <a
              href="https://github.com/levievanshantz/assaylabs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-3.5 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        {/* ──────────────────────────── HERO ──────────────────────────── */}
        <section className="mx-auto max-w-3xl px-6 pb-24 pt-28 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Never lose the <em className="not-italic text-accent">why</em> behind product decisions.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Ask your AI assistant exactly what your team decided, why it
            changed, what evidence supported it, and who signed off &mdash;
            with the full predecessor chain and a record of every reversal.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
            Works great with Claude via MCP. Local-first. No API key required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="mailto:levishantz@gmail.com?subject=Assay%20design%20partner%20cohort"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Apply to the design-partner cohort
            </a>
            <a
              href="/docs#decisions"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              See the architecture
            </a>
          </div>
        </section>

        {/* ──────────────── CONCRETE EXAMPLE (lands the wedge) ──────────────── */}
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 text-center mb-4">
              What a real decision lookup looks like
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="text-sm leading-relaxed text-foreground">
                <strong>You ask Claude:</strong> &ldquo;What did we decide about
                pricing for the free tier?&rdquo;
              </p>
              <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  <span className="text-foreground font-medium">Current
                  decision (Apr 2026):</span> Free tier capped at 10 queries/day,
                  upgrade prompt at 8.
                </p>
                <p>
                  <span className="text-foreground font-medium">It superseded:</span>
                  {" "}50/day cap (Feb) → 25/day (Mar) → 10/day (Apr).
                </p>
                <p>
                  <span className="text-foreground font-medium">Why the March
                  change:</span> 80th-percentile usage hit 23 queries/day; A/B
                  test of a 10-cap with upgrade prompt converted 14% of heavy
                  users [evidence: <em>analyst-report-2026-03-12.md</em>].
                </p>
                <p>
                  <span className="text-foreground font-medium">Who signed off:</span>
                  {" "}Sarah proposed (Mar 14), Levi confirmed after the call
                  with the analyst (Mar 15).
                </p>
                <p className="text-xs text-muted-foreground/60 pt-2 border-t border-border/30">
                  Notion AI returns documents that mention pricing. Glean
                  ranks search results. Linear AI lists tickets. Assay
                  reconstructs the actual decision graph.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ──────────────────────── 3-PILLAR STORY ─────────────────────── */}
        <section className="border-t border-border py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How decisions accumulate without anyone writing them down
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Three orthogonal capture paths feed the same decision graph. Recall
              ranks them with semantic + recency + frequency, and expansion walks
              the full provenance.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Pillar 1 &mdash; Capture
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">Three paths, all idempotent</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <strong>Ambient.</strong> Claude tags decisions inline as it
                  commits to them in conversation. <code>assay drain</code>{" "}
                  pulls them into the ledger.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong>Structural.</strong> Briefs deposit decisions as
                  candidate rows via the analyzer JSON path.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <strong>Historical.</strong> Phi-4 14B backfills your existing
                  PRDs and research docs once.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Pillar 2 &mdash; Recall
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">Time-aware, provenance-aware</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Hybrid scoring blends 0.7 cosine + 0.2 recency (90-day
                  half-life) + 0.1 citation frequency. Cosine stays the floor
                  and tiebreaker.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Filter by epistemic layer (observation / interpretation /
                  decision). Opt into surfacing recently-superseded decisions
                  with their replacement pointers.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                  Pillar 3 &mdash; Decision graph over time
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">Every state change recorded</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Every initial deposit, promotion, supersession, or rejection
                  appends a row to <code>decision_transitions</code>. Captures
                  the actor agent, the model id, the transition reason, and any
                  evidence that triggered it.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Expand any decision and walk its full predecessor chain
                  (depth-N, cycle-guarded). See exactly how a call evolved
                  across a quarter and which model touched it at every step.
                </p>
              </div>
            </div>
            <p className="mt-8 text-xs text-muted-foreground/60 text-center">
              No other RAG tool ships this shape. Notion AI summarizes
              documents. Glean searches them. Linear AI tracks tickets. None
              treat decisions as first-class structured artifacts with audit
              trails.
            </p>
          </div>
        </section>

        {/* ──────────────────────────── PROBLEM ──────────────────────────── */}
        <section id="problem" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Every execution decision requires context your tools don&rsquo;t have.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                {
                  heading: "Scattered context",
                  body: "Product context scattered across Notion, Confluence, Slack, Google Docs.",
                },
                {
                  heading: "Retrieval gaps",
                  body: "Vector search alone misses important evidence \u2014 we measured: claims retrieval surfaces 10.7 additional records per query.",
                },
                {
                  heading: "Lossy compression",
                  body: "Summarization tools compress meaning \u2014 and every compression risks losing what matters.",
                },
                {
                  heading: "Stateless agents",
                  body: "Agents crawling docs fresh every time is expensive, slow, and produces different answers to the same question.",
                },
              ].map(({ heading, body }, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="font-semibold text-foreground">{heading}</span>
                  <span className="mx-1.5">&mdash;</span>
                  {body}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────── HOW IT WORKS ──────────────────────────── */}
        <section id="how-it-works" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How Assay works
            </h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-5">
              {[
                {
                  step: "1",
                  title: "Ingest your docs",
                  desc: "Notion connector + local markdown folders today. Two-pass smart chunking with heading context preserved into every embedding.",
                },
                {
                  step: "2",
                  title: "Extract atomic claims with provenance",
                  desc: "Constraints, commitments, deferrals, assumptions, findings, recommendations, metrics.",
                },
                {
                  step: "3",
                  title: "Retrieve through 4-layer hybrid search",
                  desc: "Evidence vector, claims vector, evidence FTS, and claims FTS — merged via reciprocal rank fusion.",
                },
                {
                  step: "4",
                  title: "Query with comprehensive breadth",
                  desc: "Briefs, stress tests, and raw retrieval — all with cited sources and contradiction detection.",
                },
                {
                  step: "5",
                  title: "Each use deposits synthesis back",
                  desc: "The system compounds.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold leading-snug">
                    <span className="text-lg text-accent mr-2">{step}.</span>
                    {title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              ))}
            </ol>
          </div>
        </section>

        {/* ──────────────────────────── WHY BETTER ──────────────────────────── */}
        <section id="approach" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The difference is in what survives
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Most tools compress meaning to make it portable. Assay preserves
              it &mdash; atomic, cited, searchable from multiple angles.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Standard RAG",
                  nature: "Embeds documents whole. Returns chunks by proximity. One angle of retrieval.",
                  assay: "Four retrieval paths &mdash; evidence vector, claims vector, evidence full-text, claims full-text &mdash; merged by reciprocal rank fusion. The same document surfaces for different reasons.",
                },
                {
                  label: "Agent crawling",
                  nature: "Reads fresh each time. No memory between runs. Aggregation loses the details that connect across documents.",
                  assay: "Indexes once. Retrieves instantly. Each use deposits synthesis back. The connections between disparate observations compound &mdash; they\u2019re never discarded.",
                },
                {
                  label: "Summarization",
                  nature: "Contracts information to make it fit. Every compression risks losing what mattered.",
                  assay: "Preserves source text with stance, type, and provenance. The original meaning survives because it\u2019s never contracted.",
                },
              ].map(({ label, nature, assay }) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="text-sm font-semibold text-foreground/60">{label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {nature}
                  </p>
                  <div className="mt-4 border-t border-border/50 pt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-accent/80">Assay</h3>
                    <p
                      className="mt-2 text-sm leading-relaxed text-foreground/80"
                      dangerouslySetInnerHTML={{ __html: assay }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────── AGENTS ──────────────────────────── */}
        <section id="tools" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The MCP surface — five named agents
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Each MCP tool inside Claude Desktop or Cursor answers one
              question. Same shape (one call, one structured response); the
              question is what differs. Two of them speak to the decision
              graph; one speaks to the corpus; two speak across both. Plus a
              cascade tool that picks for you when you don&rsquo;t know which
              tier holds the answer.
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                {
                  agent: "Decision",
                  tool: "assay_decision_recall",
                  question: "What did we decide about X — and what&rsquo;s the current state?",
                  layer: "Decision graph",
                },
                {
                  agent: "Provenance",
                  tool: "assay_decision_expand",
                  question: "Walk me through how decision Y evolved — predecessors, transitions, evidence, who signed off.",
                  layer: "Decision graph",
                },
                {
                  agent: "Evidence",
                  tool: "retrieve (raw / guided / evaluate / brief)",
                  question: "What does our corpus say about X — pull me the citable chunks.",
                  layer: "Corpus",
                },
                {
                  agent: "Pre-flight",
                  tool: "scan",
                  question: "Is this proposal a green light, a caution, or a blocker?",
                  layer: "Both tiers",
                },
                {
                  agent: "Adversary",
                  tool: "stress_test",
                  question: "Find every reason this proposal will fail. Surface dissent.",
                  layer: "Both tiers",
                },
                {
                  agent: "Cascade",
                  tool: "assay_recall",
                  question: "I don&rsquo;t know which tier holds this — try them in order and breadcrumb where the answer came from.",
                  layer: "Decision → Corpus → insufficient",
                },
              ].map(({ agent, tool, question, layer }) => (
                <div
                  key={tool}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                        {agent}
                      </p>
                      <code className="mt-1 block text-sm text-accent">{tool}</code>
                    </div>
                    <span className="shrink-0 rounded-full border border-border/50 bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
                      {layer}
                    </span>
                  </div>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: question }}
                  />
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-muted-foreground/60 text-center">
              Same MCP surface today on a single-user SQLite file
              (<code>~/.assay/assay.db</code>); the schema is portable to
              Postgres + pgvector when a team wants a shared institutional
              graph. Individual decision history stays local; team graphs are
              hosted, post-beta.
            </p>
          </div>
        </section>

        {/* ──────────────────────────── BENCHMARKS ──────────────────────────── */}
        <section id="benchmarks" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Pick your extraction model
            </h2>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pr-6 font-medium">Model</th>
                    <th className="pb-3 pr-6 font-medium">Coverage</th>
                    <th className="pb-3 pr-6 font-medium">Cost</th>
                    <th className="pb-3 pr-6 font-medium">Speed</th>
                    <th className="pb-3 font-medium">Hardware</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3.5 pr-6 font-medium text-foreground">
                      Phi-4 14B{" "}
                      <span className="text-xs text-muted-foreground">(Ollama)</span>
                    </td>
                    <td className="py-3.5 pr-6">83.1%</td>
                    <td className="py-3.5 pr-6">Free</td>
                    <td className="py-3.5 pr-6">~45-60 min / 100 sections</td>
                    <td className="py-3.5">M1 Pro 16GB+</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 pr-6 font-medium text-foreground">
                      Claude Sonnet
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        API key or Claude Code subagent
                      </span>
                    </td>
                    <td className="py-3.5 pr-6">93.8%</td>
                    <td className="py-3.5 pr-6">
                      ~$0.003 / section
                      <span className="block text-xs text-muted-foreground">
                        or included in Claude Code plan
                      </span>
                    </td>
                    <td className="py-3.5 pr-6">~5-10 min / 100 sections</td>
                    <td className="py-3.5">Any machine</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Coverage measured via LLM-as-judge with human-in-the-loop validation on control group test sessions. A section is approximately 3,200 characters of source content.
            </p>
          </div>
        </section>
      </main>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-muted-foreground">
          <span>AssayLabs &copy; 2026</span>
          <div className="flex gap-6">
            <a
              href="https://github.com/levievanshantz/assaylabs"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="/docs"
              className="transition-colors hover:text-foreground"
            >
              Docs
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
