import { KnowledgeGraphSection } from "@/components/KnowledgeGraphSection";

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
              href="/docs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Docs
            </a>
            <a
              href="https://github.com/levievanshantz/assay"
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
            Give your product team a memory that doesn&rsquo;t forget.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Assay turns PRDs, strategy docs, research, and decisions into cited
            claims your AI tools can actually check against. Local-first,
            inspectable, built for PMs who ship.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="https://github.com/levievanshantz/assay"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Get the repo
            </a>
            <a
              href="#how-it-works"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
            >
              See how it works
            </a>
          </div>
        </section>

        {/* ──────────────────────────── KNOWLEDGE GRAPH ──────────────────────── */}
        <section id="knowledge-graph" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Higher-dimensional retrieval
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              RAG embeds whole documents and finds neighbors in one vector
              space. Assay decomposes each document into atomic claims &mdash;
              each one a focused vector that creates a different search path
              into the same source. The result: connections between documents
              that cosine similarity alone would never surface, regardless of
              how many results you retrieve.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The{" "}
              <span className="text-[hsl(32,90%,65%)] font-medium">
                orange edges
              </span>{" "}
              below are real connections from a production corpus &mdash;
              documents linked through extracted claims that RAG missed even
              at K=80. Toggle the claims layer off to see the gap.
            </p>
            <div className="mt-10">
              <KnowledgeGraphSection />
            </div>

            {/* Concrete example */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
                Example from production data
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground font-medium">Query:</span>{" "}
                &ldquo;How do we detect version drift?&rdquo;
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border/50 bg-background p-4">
                  <p className="text-xs font-semibold text-muted-foreground/60 mb-2">RAG alone</p>
                  <p className="text-sm text-muted-foreground">
                    Returns PRDs and specs that mention &ldquo;drift&rdquo; directly.
                    The Daily Change Log &mdash; which documents hash-based
                    re-chunking triggers &mdash; scores{" "}
                    <span className="font-mono text-foreground">0.36</span> similarity.
                    <span className="block mt-1 text-xs text-muted-foreground/50">Invisible at any practical K value.</span>
                  </p>
                </div>
                <div className="rounded-lg border border-[hsl(32,50%,25%)] bg-[hsl(32,90%,55%)]/5 p-4">
                  <p className="text-xs font-semibold text-[hsl(32,80%,65%)] mb-2">RAG + Claims</p>
                  <p className="text-sm text-muted-foreground">
                    A claim extracted from that log &mdash; &ldquo;hash mismatch
                    triggers re-chunking&rdquo; &mdash; matches the query at{" "}
                    <span className="font-mono text-[hsl(32,85%,60%)]">0.69</span> similarity.
                    <span className="block mt-1 text-xs text-[hsl(32,70%,55%)]">+33% lift. The document surfaces because the claim created a different search path into it.</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Production data &mdash; 36 documents, 40 RAG edges, 18
              claims-only bridges. Hover nodes to see the specific claims
              that create each connection.
            </p>
          </div>
        </section>

        {/* ──────────────────────────── DEMO VIDEO ──────────────────────── */}
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-[hsl(220,10%,50%)]">
              See it in action
            </p>
            <div className="overflow-hidden rounded-xl border border-border bg-black">
              <video
                controls
                preload="metadata"
                className="w-full"
                poster=""
              >
                <source src="/assay-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
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
                  desc: "Notion connector today, Confluence and more coming.",
                },
                {
                  step: "2",
                  title: "Extract atomic claims with provenance",
                  desc: "Constraints, commitments, deferrals, assumptions, findings, recommendations, metrics.",
                },
                {
                  step: "3",
                  title: "Retrieve through 4-layer hybrid search",
                  desc: "Evidence vector, claims vector, evidence FTS (tsvector/ts_rank), and claims FTS — merged via reciprocal rank fusion.",
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

        {/* ──────────────────────────── TOOLS ──────────────────────────── */}
        <section id="tools" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What you can do
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                {
                  name: "retrieve",
                  desc: "Query the corpus across four modes: raw (direct results), guided (eval instructions for the calling LLM), evaluate (server-side synthesis), and brief (structured organizational briefing).",
                },
                {
                  name: "scan",
                  desc: "Quick pre-flight check — validates the corpus is healthy, checks sync freshness, and surfaces any drift before you start working.",
                },
                {
                  name: "stress_test",
                  desc: "Pressure-test a proposal against everything the org has decided. Verdict, contradictions, assumption weaknesses, evidence gaps.",
                },
                {
                  name: "configure",
                  desc: "View and update extraction mode, retrieval depth, feature toggles, and presets.",
                },
              ].map(({ name, desc }) => (
                <div
                  key={name}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <code className="text-sm text-accent">{name}</code>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
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
              href="https://github.com/levievanshantz/assay"
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
