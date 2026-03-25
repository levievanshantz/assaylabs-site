export default function Home() {
  return (
    <>
      {/* ──────────────────────────── NAV ──────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-lg font-semibold tracking-tight">
            Assaylabs
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
                  desc: "Not just vector similarity.",
                },
                {
                  step: "4",
                  title: "Stress-test proposals or query comprehensive evidence",
                  desc: "With cited sources and contradiction detection.",
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
        <section id="why-better" className="border-t border-border py-24">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Why this approach works
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                {
                  versus: "vs Standard RAG",
                  body: "RAG embeds docs and returns chunks. Assay extracts structured claims, indexes them separately, retrieves through claims FTS + claims vector + evidence vector + full-text search via RRF.",
                },
                {
                  versus: "vs Agents crawling data",
                  body: "Agents crawl fresh every time. No memory. Different answers to same question. And in aggregating results, they lose the nuance that matters most \u2014 disparate observations that connect across documents, the unexpected relevance that inductive product reasoning depends on. Assay pre-indexes once, retrieves instantly, compounds per use.",
                },
                {
                  versus: "vs Summarization tools",
                  body: "Summarization contracts information \u2014 every compression risks hallucination and loss of meaning. Assay pulls source documentation that hasn\u2019t been aggregated, preserving atomic claims with stance, type, and provenance. The original meaning survives because it\u2019s never contracted.",
                },
              ].map(({ versus, body }) => (
                <div
                  key={versus}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <h3 className="text-sm font-semibold text-accent">{versus}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {body}
                  </p>
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
                  name: "brief",
                  desc: "What does the org know about X?",
                },
                {
                  name: "stress_test",
                  desc: "Pressure-test this proposal against everything the org has decided.",
                },
                {
                  name: "retrieve_evidence",
                  desc: "Search the corpus directly.",
                },
                {
                  name: "sync",
                  desc: "Keep your knowledge base current.",
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
          <span>Assaylabs &copy; 2026</span>
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
