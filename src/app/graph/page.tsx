import type { Metadata } from "next";
import { DecisionGraphContainer } from "@/components/DecisionGraphContainer";

export const metadata: Metadata = {
  title: "Decision Graph — AssayLabs",
  description:
    "Visualization of the local decision corpus: 215 captured decisions plotted by semantic similarity, with supersession edges.",
};

export default function GraphPage() {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-[hsl(220,15%,18%)] bg-[hsl(220,15%,6%)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <a href="/" className="text-lg font-semibold tracking-tight">
            AssayLabs
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="/compare"
              className="text-[hsl(220,10%,55%)] transition-colors hover:text-[hsl(220,15%,93%)]"
            >
              Compare
            </a>
            <a
              href="/docs"
              className="text-[hsl(220,10%,55%)] transition-colors hover:text-[hsl(220,15%,93%)]"
            >
              Docs
            </a>
            <a
              href="/graph"
              className="text-[hsl(220,15%,93%)] transition-colors"
            >
              Graph
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[hsl(234,100%,71%)]">
            Local corpus
          </p>
          <h1 className="text-4xl font-bold text-[hsl(220,15%,93%)] mb-3">
            Decision graph
          </h1>
          <p className="max-w-2xl text-[hsl(220,10%,55%)] leading-relaxed">
            What the system has remembered. Each dot is a decision captured
            from a working session — proposals you locked in, options you
            ruled out, defaults you set. Cluster reveals what topics
            consumed your thinking. Edges show where one decision replaced
            another.
          </p>
          <p className="mt-4 max-w-2xl text-xs text-[hsl(220,10%,50%)] leading-relaxed">
            <span className="font-mono text-[hsl(220,15%,75%)]">
              source evidence → claim → briefing → proposal → stress-test →
              decision → outcome → updated claim state
            </span>
            <br />
            That&rsquo;s the chain a decision graph preserves. A flat note
            store loses every arrow; a vector index loses every transition.
            This page renders only the{" "}
            <span className="text-[hsl(220,15%,75%)]">decision</span> nodes —
            the rest of the chain is inspectable per-decision via{" "}
            <code className="text-[hsl(220,15%,85%)]">assay_decision_expand</code>.
          </p>
        </header>

        <DecisionGraphContainer />

        <section className="mt-12 grid gap-6 text-sm md:grid-cols-2">
          <div className="rounded-xl border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-5">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(220,15%,75%)]">
              How to read this
            </h2>
            <ul className="space-y-2 text-[hsl(220,10%,70%)] leading-relaxed">
              <li>
                <span className="text-[hsl(220,15%,93%)]">Geography</span> —
                each decision is projected from its 1024-dim embedding to
                2D via UMAP. Decisions about the same topic land together,
                revealing what your brain has actually been thinking about.
              </li>
              <li>
                <span className="text-[hsl(220,15%,93%)]">Graph</span> —
                force-directed layout of supersession edges. Useful once
                the corpus accumulates enough revisions to form chains
                (~500+ decisions).
              </li>
              <li>
                Hover for the decision text. Click to pin a side panel.
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-[hsl(220,15%,18%)] bg-[hsl(220,15%,9%)] p-5">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(220,15%,75%)]">
              How this is built
            </h2>
            <ul className="space-y-2 text-[hsl(220,10%,70%)] leading-relaxed font-mono text-[12px]">
              <li>
                source: <span className="text-[hsl(220,15%,93%)]">~/.assay/assay.db</span>
              </li>
              <li>
                projection: UMAP via{" "}
                <span className="text-[hsl(220,15%,93%)]">umap-js</span>{" "}
                (n_neighbors=15, min_dist=0.15)
              </li>
              <li>
                rebuild:{" "}
                <span className="text-[hsl(220,15%,93%)]">
                  node scripts/export-graph.mjs
                </span>
              </li>
              <li>
                output:{" "}
                <span className="text-[hsl(220,15%,93%)]">
                  public/decision-graph.json
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
