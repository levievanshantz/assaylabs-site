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
            <span className="mono-meta">REV 2026.06.09</span>
          </div>
        </div>

        {/* Hero */}
        <div className="page hero">
          <div className="eyebrow">
            <span className="dot" />
            <span>ASSAY LABS · DECISION CONTEXT FOR AI-ACCELERATED TEAMS</span>
            <span style={{ marginLeft: "auto" }}>EST. 2026 · LOCAL-FIRST</span>
          </div>

          <h1>
            AI lets teams move faster than their{" "}
            <em>decision context</em> can keep up.
          </h1>

          <p className="lede">
            Assay is a decision-context layer for product teams working with AI. It keeps track of
            what was decided, why, what changed, and what still holds, so work that ships at AI
            speed stays coherent.
          </p>

          <p className="lede" style={{ marginTop: 18, fontWeight: 600 }}>
            Search retrieves artifacts. Assay resolves decision state.
          </p>

          <div className="hero-actions">
            <Link className="btn btn--lg" href="#why">
              See how it works <span className="arrow">→</span>
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
              <dt>Surface</dt>
              <dd>Claude Code · CLI</dd>
            </div>
            <div>
              <dt>Cloud</dt>
              <dd>None. No API key.</dd>
            </div>
            <div>
              <dt>Stage</dt>
              <dd>Early · single-user</dd>
            </div>
          </dl>
        </div>

        {/* §01 Why now */}
        <section className="s" id="why">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 01</div>
              <div>
                <h2 className="s-title">Why this exists now.</h2>
                <p className="s-deck">
                  AI did not just make teams faster. It changed where the bottleneck is.
                </p>
              </div>
            </div>

            <div className="pillars">
              <div className="pillar">
                <span className="num">01</span>
                <h3>
                  AI output compounds.
                  <br />
                  Human context does not.
                </h3>
                <p>
                  Agents produce specs, code, analysis, and options faster every cycle, and that
                  output is durable. The reasoning behind your decisions still lives in memory,
                  meetings, and docs that go stale.
                </p>
              </div>

              <div className="pillar">
                <span className="num">02</span>
                <h3>
                  When output outruns context,
                  <br />
                  teams drift.
                </h3>
                <p>
                  You can build more than you can keep coherent. Settled questions get reopened,
                  work ships against assumptions that already changed, and nobody is sure which
                  decision is the current one.
                </p>
              </div>

              <div className="pillar">
                <span className="num">03</span>
                <h3>
                  The new bottleneck is
                  <br />
                  keeping decisions current.
                </h3>
                <p>
                  The hard part stops being &ldquo;can we build it&rdquo; and becomes &ldquo;does
                  this still match what we decided.&rdquo; That gap is what Assay is built to close.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* §02 What it does */}
        <section className="s" id="what">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 02</div>
              <div>
                <h2 className="s-title">What Assay does.</h2>
                <p className="s-deck">
                  It sits on top of the memory you already use and adds the layer none of it has:
                  decision state. Not more stored text. A record of what holds.
                </p>
              </div>
            </div>

            <div className="pillars">
              <div className="pillar">
                <span className="num">PILLAR 01</span>
                <h3>
                  You found the doc.
                  <br />
                  You still don&rsquo;t know if the decision stands.
                </h3>
                <p>
                  Assay records the current answer, the reasoning behind it, and the decision that
                  replaced it.
                </p>
              </div>

              <div className="pillar">
                <span className="num">PILLAR 02</span>
                <h3>
                  Two months later, the team remembers
                  <br />
                  the argument, not the outcome.
                </h3>
                <p>
                  Decisions are captured as typed records with rationale, owners, and context, not
                  reconstructed from Slack archaeology.
                </p>
              </div>

              <div className="pillar">
                <span className="num">PILLAR 03</span>
                <h3>
                  Roadmaps drift when old calls
                  <br />
                  quietly get reopened.
                </h3>
                <p>
                  Assay keeps a clear trail of what was reversed and what replaced it, so stale
                  decisions stop resurfacing as live ones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* §03 Commands */}
        <section className="s" id="commands">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 03</div>
              <div>
                <h2 className="s-title">How you use it.</h2>
                <p className="s-deck">
                  Assay lives inside Claude Code as a small set of commands. Two carry most of the
                  day-to-day weight. The rest are there when you need them. Full surface in{" "}
                  <Link href="/docs">/docs</Link>.
                </p>
              </div>
            </div>

            <div className="agents">
              <div className="agent">
                <div className="grp">PRIMARY</div>
                <div className="nm">/assay-scan</div>
                <div className="blurb">
                  Check a direction before committing: clear, caution, or blocker.
                </div>
              </div>
              <div className="agent">
                <div className="grp">PRIMARY</div>
                <div className="nm">/assay-decision</div>
                <div className="blurb">
                  Recall what was decided, by whom, and what replaced it.
                </div>
              </div>
            </div>

            <h3
              className="mono"
              style={{
                marginTop: 48,
                marginBottom: 16,
                fontSize: 13,
                letterSpacing: "0.12em",
                opacity: 0.7,
              }}
            >
              ALSO INCLUDES
            </h3>

            <div className="agents">
              <div className="agent">
                <div className="grp">RETRIEVAL</div>
                <div className="nm">/assay-retrieve</div>
                <div className="blurb">
                  Pull source evidence and briefing-ready context from your indexed documents.
                </div>
              </div>
              <div className="agent">
                <div className="grp">JUDGMENT</div>
                <div className="nm">/assay-stress-test</div>
                <div className="blurb">
                  Expose downstream conflicts, edge cases, and reversal risk.
                </div>
              </div>
              <div className="agent">
                <div className="grp">SYSTEM</div>
                <div className="nm">/assay-config</div>
                <div className="blurb">
                  Set sources, modes, and capture behavior.
                </div>
              </div>
              <div className="agent">
                <div className="grp">SYSTEM</div>
                <div className="nm">/assay-sync-status</div>
                <div className="blurb">
                  Check that your documents are up to date and that capture is working.
                </div>
              </div>
            </div>

            <p className="mono-meta" style={{ marginTop: 32, textAlign: "center" }}>
              Decisions get captured as you work &mdash; no save command. Local-first, on your
              machine. No cloud. No API key.
            </p>
          </div>
        </section>

        {/* §04 FAQ */}
        <section className="s" id="faq">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 04</div>
              <div>
                <h2 className="s-title">The questions worth answering first.</h2>
                <p className="s-deck">
                  If you&rsquo;re reading this cold, start here.
                </p>
              </div>
            </div>

            <div className="faq">
              <div className="faq-item">
                <h3>How is this different from Notion, search, or ChatGPT memory?</h3>
                <p>
                  Those tools store and retrieve text. Assay tracks decisions: what was decided,
                  why, and what superseded it. It sits on top of whatever memory you already use and
                  adds the decision layer none of them have. You don&rsquo;t just find notes; you
                  resolve the current state.
                </p>
              </div>

              <div className="faq-item">
                <h3>Why does AI make this matter more?</h3>
                <p>
                  Because AI raises the volume of specs, code, and options a team produces, but the
                  context behind your decisions still decays at human speed. The faster you ship,
                  the faster settled decisions go stale without anyone noticing.
                </p>
              </div>

              <div className="faq-item">
                <h3>What do I actually use day to day?</h3>
                <p>
                  Start with two commands. <strong>/assay-scan</strong> tells you, before you
                  commit, whether prior decisions support, caution, or block a direction.{" "}
                  <strong>/assay-decision</strong> tells you what was decided about a topic, when, by
                  whom, and what has been superseded since. If you need source evidence, use{" "}
                  <strong>/assay-retrieve</strong>. To pressure-test a proposal, use{" "}
                  <strong>/assay-stress-test</strong>.{" "}
                  <strong>
                    Decisions get captured as you work &mdash; you don&rsquo;t run a save command.
                  </strong>
                </p>
              </div>

              <div className="faq-item">
                <h3>What stage is this at?</h3>
                <p>
                  Early and honest about it. Assay is a working local-first prototype inside Claude
                  Code, single-user. Everything lives in one file on your laptop, so your decisions
                  never leave your machine. We&rsquo;re explaining it openly while we
                  learn where it&rsquo;s most useful.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* §05 Try it */}
        <section className="s" id="try">
          <div className="page">
            <div className="s-head">
              <div className="s-num">§ 05</div>
              <div>
                <h2 className="s-title">Try the prototype.</h2>
                <p className="s-deck">
                  For people who want to run it inside Claude Code today. Local-first and
                  single-user.
                </p>
              </div>
            </div>

            <div id="install">
              <div className="mono" style={{ marginBottom: 12 }}>
                CLI · TESTER INSTALL
              </div>
              <pre className="terminal">
                <span className="dim"># clone and install</span>
                {"\n"}
                <span className="prompt">$</span> git clone https://github.com/levievanshantz/assaylabs.git
                {"\n"}
                <span className="prompt">$</span> cd assaylabs
                {"\n"}
                <span className="prompt">$</span> bash scripts/install-tester.sh
                {"\n\n"}
                <span className="dim"># then, inside Claude Code</span>
                {"\n"}
                <span className="prompt">&gt;</span> /assay-scan should we ship the new onboarding flow this sprint
                {"\n"}
                <span className="prompt">&gt;</span> /assay-decision what did we settle on for activation metric
                {"\n\n"}
                <span className="ok">✓</span> local decision memory, ready inside Claude
              </pre>
              <p className="mono-meta" style={{ marginTop: 16 }}>
                Issues and setup notes live on{" "}
                <a href="https://github.com/levievanshantz/assaylabs">GitHub</a>.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
