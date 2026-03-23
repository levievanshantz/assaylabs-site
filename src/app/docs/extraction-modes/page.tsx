import Link from "next/link";

export default function ExtractionModesPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold text-[hsl(220,15%,93%)] mb-2">
        Extraction Modes
      </h1>
      <p className="text-[hsl(220,10%,55%)] mb-8 text-lg">
        Choose how Assay decomposes document sections into atomic claims.
      </p>

      {/* Intro */}
      <section className="mb-10">
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          After a document is chunked and embedded, Assay optionally runs a
          claim extraction pass that breaks each section into standalone,
          cited assertions. These claims power contradiction detection,
          granular retrieval, and the stress-test verdict engine. The
          extraction backend is controlled by the{" "}
          <code>EXTRACTION_MODE</code> environment variable.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Three modes are available. Each trades off cost, speed, quality,
          and infrastructure requirements differently.
        </p>
      </section>

      {/* Comparison table */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Comparison
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(220,15%,18%)]">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-[hsl(220,15%,9%)] border-b border-[hsl(220,15%,18%)]">
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  &nbsp;
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Ollama
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Anthropic
                </th>
                <th className="px-4 py-3 text-[hsl(220,10%,55%)] font-medium">
                  Subagent
                </th>
              </tr>
            </thead>
            <tbody className="text-[hsl(220,15%,93%)]">
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Environment variable
                </td>
                <td className="px-4 py-3">
                  <code>ollama</code>
                </td>
                <td className="px-4 py-3">
                  <code>anthropic</code>
                </td>
                <td className="px-4 py-3">
                  <code>subagent</code>
                </td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Requires API key
                </td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">
                  Yes (<code>ANTHROPIC_API_KEY</code>)
                </td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Requires Claude Code
                </td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">No</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Runs locally
                </td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">Yes</td>
                <td className="px-4 py-3">No (API call)</td>
                <td className="px-4 py-3">Hybrid</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Claim quality (F1)
                </td>
                <td className="px-4 py-3">83.1%</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">93.8%</td>
                <td className="px-4 py-3 text-[hsl(152,60%,52%)]">93.8%</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Cost per 1K sections
                </td>
                <td className="px-4 py-3">$0 (electricity only)</td>
                <td className="px-4 py-3">~$2.40</td>
                <td className="px-4 py-3">Included in Claude Code plan</td>
              </tr>
              <tr className="border-b border-[hsl(220,15%,18%)]">
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Speed (100 sections)
                </td>
                <td className="px-4 py-3">~8 min (M2 Max)</td>
                <td className="px-4 py-3">~45 sec</td>
                <td className="px-4 py-3">~90 sec</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-[hsl(220,10%,55%)]">
                  Parallelism
                </td>
                <td className="px-4 py-3">1 (sequential)</td>
                <td className="px-4 py-3">Up to 10 concurrent</td>
                <td className="px-4 py-3">Up to 10 concurrent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ollama */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Ollama (Local)
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The Ollama mode runs extraction entirely on your machine using a
          locally hosted model. No API keys are needed beyond the OpenAI key
          used for embeddings. This is the best choice when data sensitivity
          rules out sending content to third-party APIs.
        </p>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Setup
        </h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-4">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# Install Ollama (macOS)
brew install ollama

# Pull the recommended model
ollama pull llama3.1:8b

# Set the extraction mode
# In .env.local:
EXTRACTION_MODE=ollama`}</code>
        </pre>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Hardware Requirements
        </h3>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Minimum:</strong> 16 GB RAM, Apple M1 or equivalent. The
              8B parameter model requires roughly 6 GB of VRAM.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              <strong>Recommended:</strong> 32 GB RAM, Apple M2 Pro/Max or NVIDIA
              GPU with 12+ GB VRAM for comfortable throughput.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&#x2022;</span>
            <span>
              Extraction runs sequentially (one section at a time) to avoid
              saturating local compute.
            </span>
          </li>
        </ul>

        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(38,92%,50%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(38,92%,50%)]">Quality note:</strong>{" "}
            Ollama extraction achieves 83.1% F1 on our internal eval suite.
            The 8B model occasionally misses implicit claims and can
            hallucinate provenance on ambiguous passages. For production
            corpora where accuracy matters, consider Anthropic or Subagent
            mode.
          </p>
        </div>
      </section>

      {/* Anthropic */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Anthropic (API)
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The Anthropic mode calls the Claude API directly using your
          Anthropic API key. It produces the highest quality extractions and
          runs with up to 10 concurrent requests for fast throughput on large
          corpora.
        </p>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Setup
        </h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-4">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# In .env.local:
EXTRACTION_MODE=anthropic
ANTHROPIC_API_KEY=sk-ant-...`}</code>
        </pre>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Cost Estimate
        </h3>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed">
          Each section extraction prompt is roughly 800 input tokens and 400
          output tokens. At current Claude Sonnet pricing, processing 1,000
          sections costs approximately $2.40. A typical 30-page Notion
          workspace generates around 150 sections, costing about $0.36 per
          full ingestion pass.
        </p>
      </section>

      {/* Subagent */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Subagent (Claude Code)
        </h2>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          The subagent mode delegates extraction to Claude Code itself by
          spawning stateless sub-agents via the Agent tool. Each section gets
          its own fresh agent with only the extraction prompt and section text —
          no accumulated context, no cross-contamination between sections.
        </p>
        <p className="text-[hsl(220,15%,93%)] leading-relaxed mb-4">
          This is the default mode. It requires no additional API keys because
          it runs under your existing Claude Code session. Quality matches the
          Anthropic mode (93.8% F1) since the same model family is used.
        </p>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          Setup
        </h3>
        <pre className="font-[family-name:var(--font-jetbrains)] mb-4">
          <code className="text-sm text-[hsl(220,15%,93%)]">{`# In .env.local (this is the default, so you can omit it):
EXTRACTION_MODE=subagent`}</code>
        </pre>

        <h3 className="text-lg font-medium text-[hsl(220,15%,93%)] mb-3">
          How It Works
        </h3>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">1.</span>
            <span>
              The ingestion pipeline identifies sections that need claim
              extraction.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">2.</span>
            <span>
              For each section, Assay spawns a Claude Code subagent with a
              structured prompt and the raw section text.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">3.</span>
            <span>
              The subagent returns an array of atomic claims with confidence
              scores and source references.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">4.</span>
            <span>
              Up to 10 subagents run concurrently. Each is stateless — no
              context leaks between sections.
            </span>
          </li>
        </ul>

        <div className="mt-4 rounded-lg bg-[hsl(220,15%,9%)] border-l-4 border-[hsl(234,100%,71%)] px-5 py-4">
          <p className="text-sm text-[hsl(220,15%,93%)]">
            <strong className="text-[hsl(234,100%,71%)]">
              Context isolation:
            </strong>{" "}
            Each subagent receives only the extraction prompt and the section
            text. It does not see other sections, previous extraction results,
            or any accumulated state. This is a deliberate design constraint
            that prevents context bleed and ensures reproducible extractions.
          </p>
        </div>
      </section>

      {/* Choosing a mode */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Choosing a Mode
        </h2>
        <div className="space-y-4 text-[hsl(220,15%,93%)] leading-relaxed">
          <p>
            <strong>Use Ollama</strong> if you need fully local processing, are
            working with sensitive data that cannot leave your machine, or want
            zero marginal cost. Accept the quality trade-off (83.1% vs 93.8%).
          </p>
          <p>
            <strong>Use Anthropic</strong> if you want the fastest throughput
            on large corpora, are running extraction in a CI/CD pipeline or
            automated workflow where Claude Code is not available, or need
            direct API access for scripting.
          </p>
          <p>
            <strong>Use Subagent</strong> (default) if you are running Assay
            interactively through Claude Code and want high quality extraction
            without managing a separate API key. This is the recommended mode
            for most teams.
          </p>
        </div>
      </section>

      {/* Next steps */}
      <section>
        <h2 className="text-xl font-semibold text-[hsl(220,15%,93%)] mb-4">
          Related
        </h2>
        <ul className="space-y-2 text-[hsl(220,15%,93%)]">
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/evidence-and-claims"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Evidence and Claims — understand what gets extracted
            </Link>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/feature-toggles"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Feature Toggles — fine-tune extraction behavior
            </Link>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[hsl(234,100%,71%)] mt-1 shrink-0">&rarr;</span>
            <Link
              href="/docs/guides/notion"
              className="text-[hsl(234,100%,71%)] underline underline-offset-4 hover:brightness-110"
            >
              Notion Ingestion guide — put extraction to work
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}
